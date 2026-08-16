import { readFileSync } from "node:fs";

const ALLOWED_SERVERS = ["geonews", "context7", "playwright"];
const GEONEWS_TOOLS = [
  "search_news",
  "geocode_place",
  "reverse_geocode",
  "lookup_crime",
  "list_hotspots",
  "classify_text",
  "health_sources",
];

function readInput() {
  try {
    return JSON.parse(readFileSync(0, "utf8") || "{}");
  } catch {
    return {};
  }
}

function identifyServer(input) {
  const tool = String(input.tool_name || "").toLowerCase();
  const url = String(input.url || "").toLowerCase();
  const command = String(input.command || "").toLowerCase();
  const server = String(input.server || input.server_name || input.mcp_server || "").toLowerCase();
  const blob = `${tool} ${url} ${command} ${server}`;

  if (ALLOWED_SERVERS.includes(server)) return server;
  if (url.includes("context7") || blob.includes("context7")) return "context7";
  if (command.includes("playwright") || blob.includes("@playwright/mcp") || tool.startsWith("browser_")) {
    return "playwright";
  }
  if (command.includes("geonews") || GEONEWS_TOOLS.includes(tool) || tool.startsWith("geonews")) {
    return "geonews";
  }
  return null;
}

const input = readInput();
const server = identifyServer(input);

if (!server) {
  const message =
    "Blocked by GeoNews sandbox-mcp: only geonews, context7, and playwright MCP servers are allowed.";
  console.log(
    JSON.stringify({
      permission: "deny",
      user_message: message,
      agent_message: `${message} tool=${input.tool_name || "unknown"}`,
    }),
  );
  process.exit(0);
}

console.log(JSON.stringify({ permission: "allow" }));
