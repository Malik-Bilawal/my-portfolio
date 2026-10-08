"use client";

import { EASE_OUT } from "@/lib/motion";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, RotateCcw } from "lucide-react";
import ReactMarkdown from "react-markdown";
import {
  GREETING,
  SUGGESTED_PROMPTS,
  FALLBACK_MESSAGE,
} from "@/lib/knowledge";

type Message = {
  role: "user" | "assistant";
  content: string;
  error?: boolean;
};

const STORAGE_KEY = "bilawal-assistant-history";

function loadHistory(): Message[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Message[]) : [];
  } catch {
    return [];
  }
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => loadHistory());
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-20)));
    } catch {
      /* storage full or blocked */
    }
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    inputRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = useCallback(
    async (text: string) => {
      const question = text.trim();
      if (!question || streaming) return;

      const nextMessages: Message[] = [
        ...messages,
        { role: "user", content: question },
      ];
      setMessages(nextMessages);
      setInput("");
      setStreaming(true);

      try {
        const res = await fetch("/api/assistant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: nextMessages }),
        });

        if (!res.ok || !res.body) throw new Error("request failed");

        setMessages([...nextMessages, { role: "assistant", content: "" }]);

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let assistantText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          assistantText += decoder.decode(value, { stream: true });
          setMessages([
            ...nextMessages,
            { role: "assistant", content: assistantText },
          ]);
        }

        if (!assistantText.trim()) throw new Error("empty response");
      } catch {
        setMessages([
          ...nextMessages,
          {
            role: "assistant",
            content: FALLBACK_MESSAGE,
            error: true,
          },
        ]);
      } finally {
        setStreaming(false);
        inputRef.current?.focus();
      }
    },
    [messages, streaming]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const displayMessages: Message[] =
    messages.length === 0
      ? [{ role: "assistant", content: GREETING }]
      : messages;

  return (
    <>
      {/* Trigger */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-5 right-5 z-50 h-12 pl-4 pr-5 rounded-full bg-accent hover:bg-accent-hover text-white text-sm font-medium flex items-center gap-2 shadow-lg transition-colors"
            style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.25)" }}
            aria-label="Open AI assistant"
          >
            <MessageSquare size={17} />
            <span className="hidden sm:inline">Ask my AI</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            role="dialog"
            aria-label="AI assistant"
            className="fixed z-50 flex flex-col overflow-hidden rounded-xl border border-edge bg-background
              inset-x-3 bottom-3 h-[75vh]
              sm:inset-x-auto sm:right-5 sm:bottom-5 sm:w-[380px] sm:h-[560px]"
            style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-edge bg-surface shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-7 h-7 rounded-full bg-accent-soft text-accent flex items-center justify-center text-xs font-semibold shrink-0">
                  MB
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-tight truncate">
                    Bilawal&rsquo;s Assistant
                  </p>
                  <p className="text-[11px] text-faint leading-tight">
                    Answers from his portfolio data
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-foreground hover:bg-elevated transition-colors"
                aria-label="Close assistant"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
            >
              {displayMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-xl text-sm leading-relaxed break-words ${
                      msg.role === "user"
                        ? "bg-accent-soft text-foreground border border-accent/25"
                        : msg.error
                        ? "bg-danger-soft text-muted border border-danger/25"
                        : "bg-surface text-muted border border-edge"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <div className="[&>p]:my-0 [&>p+p]:mt-2 [&>ul]:my-1.5 [&>ul]:pl-4 [&>ul>li]:my-0.5 [&>ul>li]:list-disc [&>code]:text-[13px] [&>code]:bg-elevated [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {streaming && (
                <div className="flex justify-start">
                  <div className="bg-surface border border-edge rounded-xl px-4 py-3 flex items-center gap-1.5">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="w-1.5 h-1.5 rounded-full bg-faint"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: d * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Error retry */}
              {messages[messages.length - 1]?.error && !streaming && (
                <div className="flex justify-start">
                  <button
                    onClick={() => {
                      const withoutError = messages.slice(0, -1);
                      setMessages(withoutError);
                      const lastUser = [...withoutError]
                        .reverse()
                        .find((m) => m.role === "user");
                      if (lastUser) send(lastUser.content);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline"
                  >
                    <RotateCcw size={12} /> Retry
                  </button>
                </div>
              )}

              {/* Suggested prompts — only on fresh open */}
              {messages.length === 0 && !streaming && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {SUGGESTED_PROMPTS.map((p) => (
                    <button
                      key={p}
                      onClick={() => send(p)}
                      className="chip chip-accent hover:opacity-80 transition-opacity"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-edge p-3 bg-surface shrink-0">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Muhammad…"
                  maxLength={400}
                  className="flex-1 resize-none rounded-lg border border-edge bg-background px-3.5 py-2.5 text-sm placeholder:text-faint focus:border-accent transition-colors max-h-24"
                  aria-label="Message"
                />
                <button
                  onClick={() => send(input)}
                  disabled={!input.trim() || streaming}
                  className="w-10 h-10 rounded-lg bg-accent hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors shrink-0"
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="mt-2 text-[10px] text-faint text-center font-mono">
                AI answers from Bilawal&rsquo;s data · Verified info only
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
