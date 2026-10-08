import { FALLBACK_MESSAGE } from "./knowledge";

/**
 * Rule-based pre-filter for the assistant.
 * Runs BEFORE any LLM call — blocked questions never reach the model.
 *
 * 1. Hard blocks  → fixed refusal text (code requests, jailbreak, trivia…)
 * 2. Anchor check → the question must be about Bilawal (or a greeting)
 * 3. Everything else → exact fallback (no model call, no guessing)
 */

export const CODE_REFUSAL =
  "I'm Bilawal's portfolio assistant — I don't write, share, or generate code. I can tell you about his development experience, projects, and skills instead, or you can discuss real development work with him at its.bilawal33@gmail.com.";

export const JAILBREAK_REFUSAL =
  "I'm Bilawal's portfolio assistant, so I only know about his work and experience. If you'd like to discuss a project or role, reach him at its.bilawal33@gmail.com or through the contact form.";

type RuleResult = { blocked: true; response: string } | { blocked: false };

/* ── 1. Hard blocks ─────────────────────────────────────────── */

const CODE_REQUESTS: RegExp[] = [
  // "give/send/write/show me ... code|script|form|function|query"
  /\b(give|send|write|show|generate|create|share|paste|make|provide|need|want)\b[\s\S]{0,40}\b(code|script|snippet|program|function|class|component|query|regex|html|css|javascript|typescript|python|php|sql|bash|shell|json|yaml|xml|api code|login form|signup form|registration form|contact form|calculator|todo app|crud|database schema|dockerfile|yaml file|config file|homework|assignment)\b/i,
  /\b(code|script|snippet|program|function|class|component|query|regex|html|css|javascript|typescript|python|php|sql|bash|shell|dockerfile)\b[\s\S]{0,30}\b(for me|for my|example|sample|template|snippet)\b/i,
  // bare asks that always mean code generation
  /^\s*(how (do|can|would) i (write|build|create|make)|write me|code for|program for|function that|class that|script (that|to|for))/i,
  /\b(login|sign\s?up|registration|contact|checkout|payment)\s?(form|page|system|flow)\s?(code|html|in|with|using)?\b/i,
  /\b(diagram|flowchart|wireframe|ui design|logo)\b/i,
];

const OFF_TOPIC: RegExp[] = [
  // celebrity / wealth trivia
  /\b(richest|poorest|billionaire|celebrity|net worth|forbes|who('s| is)? the (number|#)? ?1|top 10|rank(ed|ing)? )/i,
  // general knowledge & facts
  /\b(weather|temperature|forecast|stock (price|market)|bitcoin price|currency (rate|conversion)|population of|capital of|president|prime minister|football (match|score)|cricket (match|score)|world cup|movie (review|to watch)|song lyrics?)\b/i,
  // homework / utility
  /\b(solve|calculate|convert|translate|definition of|meaning of|essay|poem|joke|riddle|recipe|cook|pancake|diet|workout)\b/i,
  /\b\d+\s*[+\-*/×÷]\s*\d+\s*[=?]?/,
  // instructions aimed at the model
  /\b(ignore|forget|override|disregard|bypass)\b[\s\S]{0,30}\b(previous|prior|above|instructions?|rules?|prompt)\b/i,
  /\b(system prompt|hidden instructions?|developer message|your rules|jailbreak|dan mode)\b/i,
  /\b(you are (now|a|an)\b(?!\s*bilawal))/i,
  /\bpretend (you('re| are)|to be)\b/i,
  // other tools / people
  /\b(chatgpt|openai|claude|gemini|copilot|siri|alexa)\b/i,
];

/* ── 2. Anchors — topics that ARE about Bilawal ─────────────── */

const ANCHORS: RegExp[] = [
  // identity
  /\b(bilawal|muhammad|malik)\b/i,
  /\b(who|what) (is|are) (you|he|him|this guy|this person|the developer|the founder)\b/i,
  /\byour(self|s)?\b/i,
  /\b(his|he|him|his work|his experience|his projects?)\b/i,
  // greeting — pass through, the model introduces itself
  /^\s*(hi|hello|hey|yo|salam|assalam|assalamualaikum|aoa|good (morning|afternoon|evening))\b/i,
  /\b(what do you (do|think|offer)|who are you|what can you (do|help|answer|tell))\b/i,
  // work & hiring
  /\b(experience|skill|tech stack|technology|technologies|stack|project|portfolio|work|worked|working|job|role|hiring|hire|available|availability|freelance|remote|onboarding|notice period|salary|rate|charge|pricing|budget|cost|cv|resume|summary|background|education|degree|diploma|university|college|school|internship|company|employer|timeline|achievement)\b/i,
  // stack keywords (a question containing one is almost certainly about his stack)
  /\b(laravel|php|node\.?js|express|react|next\.?js|typescript|javascript|alpine|mysql|postgres|mongodb|redis|docker|git|tailwind|api|rest|graphql|wordpress|linux|vs ?code|postman)\b/i,
  // his actual projects / employers
  /\b(luxorix|lums|campus coin|budget bee|shahid insaf|helplex|the helpex|sybrid|multi-?vendor|e-?commerce)\b/i,
  // contact
  /\b(email|phone|contact|reach (him|you)|github|linkedin|address|location|karachi|pakistan)\b/i,
];

const GREETING_ONLY = /^\s*(hi|hello|hey|yo|salam|assalamualaikum|aoa|good (morning|afternoon|evening)|thanks?|thank you|bye|ok(ay)?)\s*[!.\-]*\s*$/i;

export function analyzeMessage(message: string): RuleResult {
  const text = message.trim();
  if (!text) return { blocked: true, response: FALLBACK_MESSAGE };

  // Greetings and thanks always get through (harmless, model handles tone)
  if (GREETING_ONLY.test(text)) return { blocked: false };

  for (const re of CODE_REQUESTS) {
    if (re.test(text)) return { blocked: true, response: CODE_REFUSAL };
  }

  for (const re of OFF_TOPIC) {
    if (re.test(text)) return { blocked: true, response: JAILBREAK_REFUSAL };
  }

  // Off-topic but no explicit pattern: require a Bilawal anchor
  // before spending an LLM call.
  for (const re of ANCHORS) {
    if (re.test(text)) return { blocked: false };
  }

  return { blocked: true, response: FALLBACK_MESSAGE };
}
