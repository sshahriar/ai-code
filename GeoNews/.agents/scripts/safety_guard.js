#!/usr/bin/env node
/**
 * Antigravity Safety Guard Hook (PreToolUse)
 * Inspects tool commands to prevent catastrophic data loss or secret leaks.
 */

let input = "";
process.stdin.setEncoding("utf-8");

process.stdin.on("data", (chunk) => {
  input += chunk;
});

process.stdin.on("end", () => {
  try {
    const payload = JSON.parse(input || "{}");
    const toolCall = payload.toolCall || {};
    const args = toolCall.args || {};

    if (toolCall.name === "run_command") {
      const cmd = (args.CommandLine || "").toLowerCase();

      // Block destructive filesystem commands
      if (cmd.includes("rm -rf /") || cmd.includes("rmdir /s /q c:\\")) {
        console.log(
          JSON.stringify({
            decision: "deny",
            reason: "Blocked potentially destructive root deletion command.",
          })
        );
        return;
      }

      // Warn on deleting or overwriting .env directly via shell
      if (cmd.includes("rm .env") || cmd.includes("del .env") || cmd.includes("remove-item .env")) {
        console.log(
          JSON.stringify({
            decision: "ask",
            reason: "Attempting to delete .env file. Please confirm this action.",
          })
        );
        return;
      }
    }

    // Default allow
    console.log(JSON.stringify({ decision: "allow" }));
  } catch (err) {
    // If parsing fails, default to allow so we don't break the agent loop
    console.log(JSON.stringify({ decision: "allow" }));
  }
});
