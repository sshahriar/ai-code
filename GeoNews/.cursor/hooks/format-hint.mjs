import { readFileSync } from "node:fs";

function readInput() {
  try {
    return JSON.parse(readFileSync(0, "utf8") || "{}");
  } catch {
    return {};
  }
}

const input = readInput();
const filePath = String(input.file_path || "").replace(/\\/g, "/");

let hint = "";
if (filePath.includes("/backend/") && /\.(py)$/.test(filePath)) {
  hint = "Format backend Python with ruff (ruff check --fix && ruff format) before finishing.";
} else if (filePath.includes("/frontend/") && /\.(ts|tsx|js|jsx|css)$/.test(filePath)) {
  hint = "Format frontend with the project Prettier/ESLint script before finishing.";
} else if (filePath.includes("/mcp/geonews/") && /\.(mjs|js)$/.test(filePath)) {
  hint = "Keep the GeoNews MCP server free of secrets in tool output.";
}

if (hint) {
  console.log(JSON.stringify({ additional_context: hint }));
} else {
  console.log(JSON.stringify({}));
}
