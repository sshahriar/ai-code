import { extractPrompt, readStdin } from "./lib/state.mjs";

const PLACEHOLDER = /^(your-|changeme|xxx|todo|replace|example|dummy|local|sk-or-your)/i;

const PATTERNS = [
  { name: "OpenRouter key", re: /\bsk-or-v1-[A-Za-z0-9_-]{20,}\b/ },
  { name: "OpenAI-like key", re: /\bsk-[A-Za-z0-9]{24,}\b/ },
  { name: "GitHub token", re: /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/ },
  { name: "AWS access key", re: /\bAKIA[0-9A-Z]{16}\b/ },
  {
    name: "OPENROUTER_API_KEY assignment",
    re: /\bOPENROUTER_API_KEY\s*[=:]\s*['"]?([^\s'"]+)/i,
  },
  {
    name: "GUARDIAN_API_KEY assignment",
    re: /\bGUARDIAN_API_KEY\s*[=:]\s*['"]?([^\s'"]+)/i,
  },
];

function assignedValue(text, re) {
  const match = text.match(re);
  return match ? match[1] : null;
}

const input = readStdin();
const prompt = extractPrompt(input) || JSON.stringify(input);
const hits = [];

for (const { name, re } of PATTERNS) {
  if (!re.test(prompt)) continue;
  if (name.includes("assignment")) {
    const value = assignedValue(prompt, re);
    if (!value || PLACEHOLDER.test(value) || value.length < 8) continue;
  }
  hits.push(name);
}

if (hits.length > 0) {
  const message = `Blocked by GeoNews no-secrets hook: prompt looks like it pastes secrets (${hits.join(", ")}). Use .env instead.`;
  console.log(JSON.stringify({ continue: false, user_message: message }));
  process.exit(0);
}

console.log(JSON.stringify({ continue: true }));
