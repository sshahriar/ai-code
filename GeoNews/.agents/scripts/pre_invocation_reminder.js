#!/usr/bin/env node
/**
 * Antigravity Pre-Invocation Context Injector (PreInvocation)
 * Injects project-specific operational reminders.
 */

let input = "";
process.stdin.setEncoding("utf-8");

process.stdin.on("data", (chunk) => {
  input += chunk;
});

process.stdin.on("end", () => {
  try {
    const payload = JSON.parse(input || "{}");
    const invocationNum = payload.invocationNum || 1;

    // Inject reminder on initial turn or periodically
    const response = {
      injectSteps: [
        {
          ephemeralMessage:
            "[GeoNews System Reminder]: 1) Keep all data-testid attributes (ai-panel, ai-input, ai-brief, ai-mock-badge, ai-error, ai-error-retry, ai-fab). 2) Always use CSS variables (--bg, --panel, --border, --accent, etc.) for full dark/light theme fidelity. 3) Preserve free tier and LLM_MOCK=true fallback contracts.",
        },
      ],
    };

    console.log(JSON.stringify(response));
  } catch (err) {
    console.log(JSON.stringify({}));
  }
});
