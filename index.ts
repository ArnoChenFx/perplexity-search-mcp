import Perplexity from "@perplexity-ai/perplexity_ai";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import process from "node:process";

// Read api key from environment variables
const apiKey = process.env.PERPLEXITY_API_KEY;

// Create a Perplexity client
const client = new Perplexity({ apiKey });

// Create an MCP server
const server = new McpServer({
  name: "perplexity-search-mcp",
  version: "1.0.0",
});

// Add an addition tool
const PerplexitySearchSchema = {
  query: z
    .union([
      z.string().min(1, "query cannot be empty"),
      z
        .array(z.string().min(1))
        .min(1, "query array must contain at least one item"),
    ])
    .describe(
      "The search query or queries to execute. A search query. Can be a single query or a list of queries for multi-query search.",
    ),
  max_results: z
    .number()
    .int()
    .positive()
    .max(20)
    .default(10)
    .describe("The maximum number of search results to return."),
  country: z
    .string()
    .optional()
    .describe(
      "Country code to filter search results by geographic location (e.g., 'US', 'GB', 'DE').",
    ),
  max_tokens_per_page: z
    .number()
    .int()
    .positive()
    .default(2048)
    .describe(
      "Controls the maximum number of tokens retrieved from each webpage during search processing. Higher values provide more comprehensive content extraction but may increase processing time.",
    ),
  // search_mode: z
  //   .enum(["web", "academic", "sec"])
  //   .optional()
  //   .describe("Search mode：web or academic or sec"),
};

server.registerTool(
  "perplexity-search",
  {
    title: "Perplexity Search",
    description:
      "Get ranked search results from Perplexity’s continuously refreshed index with advanced filtering and customization options.",
    inputSchema: PerplexitySearchSchema,
  },
  async (params) => {
    const search = await client.search.create(params);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(search.results),
        },
      ],
    };
  },
);

// Start receiving messages on stdin and sending messages on stdout
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("MCP server is running...");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
