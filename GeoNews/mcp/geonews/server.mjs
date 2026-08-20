#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import http from "node:http";
import https from "node:https";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BACKEND_URL = process.env.GEONEWS_BACKEND_URL || "http://127.0.0.1:8000";

const server = new Server(
  {
    name: "geonews-mcp",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Utility to make HTTP requests
function fetchJson(url, options = {}) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith("https://");
    const client = isHttps ? https : http;

    const req = client.request(url, options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(JSON.parse(data));
          } else {
            resolve({
              error: `HTTP ${res.statusCode}: ${data || res.statusMessage}`,
              statusCode: res.statusCode,
            });
          }
        } catch (e) {
          resolve({ raw: data, statusCode: res.statusCode });
        }
      });
    });

    req.on("error", (err) => {
      resolve({ error: err.message, connected: false });
    });

    if (options.body) {
      req.write(typeof options.body === "string" ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

// 1. List Tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "geonews_search_events",
        description:
          "Query geolocated news and intelligence events by bounding box, category, or time window.",
        inputSchema: {
          type: "object",
          properties: {
            min_lat: { type: "number", description: "Minimum latitude (south)" },
            min_lon: { type: "number", description: "Minimum longitude (west)" },
            max_lat: { type: "number", description: "Maximum latitude (north)" },
            max_lon: { type: "number", description: "Maximum longitude (east)" },
            category: {
              type: "string",
              description:
                "Filter category: crime, conflict, disaster, politics, health, economy, other",
            },
            hours: { type: "number", description: "Time window in hours (default 72)" },
            limit: { type: "number", description: "Max events to return (default 50)" },
          },
        },
      },
      {
        name: "geonews_geocode_place",
        description:
          "Forward or reverse geocode a place name using Nominatim with caching and rate limiting.",
        inputSchema: {
          type: "object",
          properties: {
            query: { type: "string", description: "Place name or query (e.g. 'Dhaka', 'London')" },
            lat: { type: "number", description: "Latitude for reverse geocode" },
            lon: { type: "number", description: "Longitude for reverse geocode" },
          },
        },
      },
      {
        name: "geonews_get_ai_brief",
        description:
          "Generate or fetch an AI situation briefing for a specific place or bounding box.",
        inputSchema: {
          type: "object",
          properties: {
            place: { type: "string", description: "Place name (e.g. 'Dhaka', 'Kyiv')" },
            lat: { type: "number", description: "Center latitude" },
            lon: { type: "number", description: "Center longitude" },
          },
          required: ["place"],
        },
      },
      {
        name: "geonews_get_incidents",
        description:
          "Retrieve crime or incident reports near coordinates (e.g. UK Police data or fallback).",
        inputSchema: {
          type: "object",
          properties: {
            lat: { type: "number", description: "Latitude" },
            lon: { type: "number", description: "Longitude" },
            radius_km: { type: "number", description: "Radius in kilometers (default 5)" },
          },
          required: ["lat", "lon"],
        },
      },
      {
        name: "geonews_check_health",
        description: "Check the operational health of GeoNews backend and LLM provider status.",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
    ],
  };
});

// 2. Handle Tool Calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === "geonews_search_events") {
      const params = new URLSearchParams();
      if (args?.min_lat !== undefined) params.append("min_lat", String(args.min_lat));
      if (args?.min_lon !== undefined) params.append("min_lon", String(args.min_lon));
      if (args?.max_lat !== undefined) params.append("max_lat", String(args.max_lat));
      if (args?.max_lon !== undefined) params.append("max_lon", String(args.max_lon));
      if (args?.category) params.append("category", String(args.category));
      if (args?.hours) params.append("hours", String(args.hours));
      if (args?.limit) params.append("limit", String(args.limit));

      const res = await fetchJson(`${BACKEND_URL}/api/events?${params.toString()}`);
      return {
        content: [{ type: "text", text: JSON.stringify(res, null, 2) }],
      };
    }

    if (name === "geonews_geocode_place") {
      const params = new URLSearchParams();
      if (args?.query) params.append("q", String(args.query));
      if (args?.lat !== undefined) params.append("lat", String(args.lat));
      if (args?.lon !== undefined) params.append("lon", String(args.lon));

      const res = await fetchJson(`${BACKEND_URL}/api/places/geocode?${params.toString()}`);
      return {
        content: [{ type: "text", text: JSON.stringify(res, null, 2) }],
      };
    }

    if (name === "geonews_get_ai_brief") {
      const params = new URLSearchParams();
      if (args?.place) params.append("place", String(args.place));
      if (args?.lat !== undefined) params.append("lat", String(args.lat));
      if (args?.lon !== undefined) params.append("lon", String(args.lon));

      const res = await fetchJson(`${BACKEND_URL}/api/brief?${params.toString()}`);
      return {
        content: [{ type: "text", text: JSON.stringify(res, null, 2) }],
      };
    }

    if (name === "geonews_get_incidents") {
      const params = new URLSearchParams();
      params.append("lat", String(args?.lat));
      params.append("lon", String(args?.lon));
      if (args?.radius_km) params.append("radius_km", String(args.radius_km));

      const res = await fetchJson(`${BACKEND_URL}/api/incidents?${params.toString()}`);
      return {
        content: [{ type: "text", text: JSON.stringify(res, null, 2) }],
      };
    }

    if (name === "geonews_check_health") {
      const res = await fetchJson(`${BACKEND_URL}/api/health`);
      return {
        content: [{ type: "text", text: JSON.stringify(res, null, 2) }],
      };
    }

    return {
      content: [{ type: "text", text: `Unknown tool: ${name}` }],
      isError: true,
    };
  } catch (error) {
    return {
      content: [{ type: "text", text: `Error executing ${name}: ${error.message}` }],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error("GeoNews MCP Fatal Error:", err);
  process.exit(1);
});
