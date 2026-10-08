import { systemPrompt } from "@/lib/knowledge";
import { analyzeMessage } from "@/lib/guard";

export const runtime = "edge";
export const maxDuration = 30;

const MAX_MESSAGES = 12;
const MAX_MESSAGE_CHARS = 400;

type ChatMessage = { role: "user" | "assistant"; content: string };

/** Health check — lets you verify env config without leaking the key. */
export async function GET() {
  return Response.json({
    ok: true,
    configured: Boolean(process.env.GROQ_API_KEY),
    model: process.env.GROQ_MODEL || "qwen/qwen3.8-27b",
  });
}

export async function POST(req: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  const model = process.env.GROQ_MODEL || "qwen/qwen3.8-27b";

  if (!apiKey) {
    return new Response(
      "Assistant is not configured. Please email its.bilawal33@gmail.com.",
      { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } }
    );
  }

  let messages: ChatMessage[];
  try {
    const body = await req.json();
    messages = body?.messages;
  } catch {
    return new Response("Invalid request", { status: 400 });
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response("Invalid request", { status: 400 });
  }

  const cleaned = messages.slice(-MAX_MESSAGES).map((m) => {
    const role = m?.role === "assistant" ? "assistant" : "user";
    const content =
      typeof m?.content === "string" ? m.content.slice(0, MAX_MESSAGE_CHARS) : "";
    return { role, content } as ChatMessage;
  });

  if (cleaned.some((m) => !m.content.trim())) {
    return new Response("Invalid request", { status: 400 });
  }

  // Rule-based layer: unexpected questions are handled here,
  // before any LLM call is made.
  const verdict = analyzeMessage(cleaned[cleaned.length - 1].content);
  if (verdict.blocked) {
    return new Response(verdict.response, {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  try {
    const groqRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          stream: true,
          max_tokens: 600,
          temperature: 0.4,
          messages: [
            { role: "system", content: systemPrompt },
            ...cleaned,
          ],
        }),
      }
    );

    if (groqRes.status === 429) {
      return new Response(
        "I'm receiving a lot of questions right now — please wait a few seconds and ask again.",
        { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8" } }
      );
    }

    if (!groqRes.ok || !groqRes.body) {
      console.error("Groq error:", groqRes.status, await groqRes.text());
      return new Response(
        "Couldn't reach the assistant — please email its.bilawal33@gmail.com.",
        { status: 502, headers: { "Content-Type": "text/plain; charset=utf-8" } }
      );
    }

    // Transform Groq's OpenAI SSE stream into plain text chunks
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const encoder = new TextEncoder();

    (async () => {
      const reader = groqRes.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const payload = trimmed.slice(5).trim();
            if (payload === "[DONE]") continue;
            try {
              const json = JSON.parse(payload);
              const token = json?.choices?.[0]?.delta?.content;
              if (token) await writer.write(encoder.encode(token));
            } catch {
              /* partial JSON — skip */
            }
          }
        }
      } catch (err) {
        console.error("Stream error:", err);
      } finally {
        await writer.close().catch(() => {});
      }
    })();

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    console.error("Assistant error:", err);
    return new Response(
      "Something went wrong — please email its.bilawal33@gmail.com.",
      { status: 500, headers: { "Content-Type": "text/plain; charset=utf-8" } }
    );
  }
}
