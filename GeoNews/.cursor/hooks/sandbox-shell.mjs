import { readFileSync } from "node:fs";

const ALLOWED_HOSTS = [
  "api.gdeltproject.org",
  "data.police.uk",
  "nominatim.openstreetmap.org",
  "content.guardianapis.com",
  "news.google.com",
  "openrouter.ai",
  "earthquake.usgs.gov",
  "eonet.gsfc.nasa.gov",
  "localhost",
  "127.0.0.1",
  "registry.npmjs.org",
  "pypi.org",
  "files.pythonhosted.org",
  "github.com",
  "raw.githubusercontent.com",
];

const DENY_PATTERNS = [
  /\brm\s+(-[a-zA-Z]*f[a-zA-Z]*\s+-[a-zA-Z]*r|[a-zA-Z]*r[a-zA-Z]*\s+-[a-zA-Z]*f)/i,
  /\brm\s+-rf\b/i,
  /\bgit\s+push\b[^\n]*\s(--force|-f)\b/i,
  /\bgit\s+push\s+--force\b/i,
  /\bkubectl\b[^\n]*\b(prod|production)\b/i,
  /\bterraform\s+apply\b/i,
  /\bhelm\s+upgrade\b[^\n]*\b(prod|production)\b/i,
  /Remove-Item\b[^\n]*-Recurse[^\n]*-Force/i,
];

function readInput() {
  try {
    return JSON.parse(readFileSync(0, "utf8") || "{}");
  } catch {
    return {};
  }
}

function hostnameFromUrl(raw) {
  try {
    const url = new URL(raw);
    return url.hostname.toLowerCase();
  } catch {
    return null;
  }
}

function extractUrls(command) {
  const matches = command.match(/https?:\/\/[^\s"'`]+/gi) || [];
  return matches.map((u) => u.replace(/[),.;]+$/, ""));
}

function isNetworkCommand(command) {
  return /\b(curl|wget|Invoke-WebRequest|Invoke-RestMethod|iwr)\b/i.test(command);
}

function hostAllowed(host) {
  if (!host) return false;
  return ALLOWED_HOSTS.some((allowed) => host === allowed || host.endsWith(`.${allowed}`));
}

const input = readInput();
const command = String(input.command || "");

for (const pattern of DENY_PATTERNS) {
  if (pattern.test(command)) {
    const message =
      "Blocked by GeoNews sandbox-shell: destructive or production-deploy command.";
    console.log(
      JSON.stringify({
        permission: "deny",
        user_message: message,
        agent_message: message,
      }),
    );
    process.exit(0);
  }
}

if (isNetworkCommand(command)) {
  const urls = extractUrls(command);
  const blocked = urls
    .map((u) => ({ u, host: hostnameFromUrl(u) }))
    .filter(({ host }) => !hostAllowed(host));

  if (urls.length === 0 || blocked.length > 0) {
    const hosts = blocked.map((b) => b.host || b.u).join(", ") || "missing URL";
    const message = `Blocked by GeoNews sandbox-shell: outbound HTTP host not allowlisted (${hosts}).`;
    console.log(
      JSON.stringify({
        permission: "deny",
        user_message: message,
        agent_message: `${message} Allowed: ${ALLOWED_HOSTS.join(", ")}`,
      }),
    );
    process.exit(0);
  }
}

console.log(JSON.stringify({ permission: "allow" }));
