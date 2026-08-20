#!/usr/bin/env node
/**
 * Antigravity Post-Tool Hook (PostToolUse)
 */

let input = "";
process.stdin.setEncoding("utf-8");

process.stdin.on("data", (chunk) => {
  input += chunk;
});

process.stdin.on("end", () => {
  // Return clean empty object to satisfy contract
  console.log(JSON.stringify({}));
});
