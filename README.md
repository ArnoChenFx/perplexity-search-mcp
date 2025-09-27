# Perplexity Search MCP

This is a tool based on the [Model Context Protocol (MCP)](https://mcp.dev) that wraps the search functionality of [Perplexity AI](https://www.perplexity.ai/) into a standardized tool that can be called via MCP.

This project is built with TypeScript and runs on the [Bun](https://bun.sh/) runtime.

## ✨ Features

-   Provides the `perplexity_search` tool via MCP.
-   Supports various parameters for Perplexity search, such as:
    -   `query`: A single or multiple search queries.
    -   `max_results`: Specifies the maximum number of results to return.
    -   `country`: Filters search results by geographic location.
    -   `search_mode`: Supports `web`, `academic`, and `sec` search modes.
-   Communicates with the host environment via standard input/output (Stdio).

## 🚀 Getting Started

### 1. Prerequisites

-   Ensure you have [Bun](https://bun.sh/docs/installation) installed.
-   You will need an API key from Perplexity AI.

### 2. Installation

After cloning the project, run the following command in the root directory to install the required dependencies:

```bash
bun install
```

### 3. Configuration

This server requires the `PERPLEXITY_API_KEY` environment variable to be set.

### 4. Running the Server

Execute the following command to start the MCP server:

```bash
bun run index.ts
```

The server will start and listen for MCP messages on standard I/O.

## 🛠️ Tool Definition

### `perplexity_search`

**Description**: Get ranked search results from Perplexity’s continuously refreshed index with advanced filtering and customization options.

**Input Parameters**:

| Parameter             | Type                 | Description                                                                                                     | Default  |
| --------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------- | -------- |
| `query`               | `string` or `string[]` | The search query or queries to execute.                                                                         | Required |
| `max_results`         | `number`             | The maximum number of search results to return (max 20).                                                        | `10`     |
| `country`             | `string`             | Country code to filter results by geographic location (e.g., 'US', 'GB', 'DE').                                 | Optional |
| `max_tokens_per_page` | `number`             | Controls the maximum number of tokens retrieved from each webpage. Higher values provide more comprehensive content but may increase processing time. | `2048`   |
| `search_mode`         | `string`             | The search mode. Can be `web`, `academic`, or `sec`.                                                            | `web`    |

**Output**:

The tool returns a JSON string containing an array of search results from the Perplexity API.
