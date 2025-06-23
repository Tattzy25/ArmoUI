// Script to add Tavily search tool to the database
// Run this after setting up Supabase and authentication

const tavilyToolSchema = {
  "openapi": "3.1.0",
  "info": {
    "title": "Tavily Search API",
    "description": "Perform web searches using Tavily's AI-optimized search engine with both basic and advanced search capabilities",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "/api/chat/tools/tavily-search"
    }
  ],
  "paths": {
    "/": {
      "post": {
        "description": "Perform a web search using Tavily with basic or advanced search depth",
        "operationId": "tavilySearch",
        "parameters": [],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "query": {
                    "type": "string",
                    "description": "The search query to execute"
                  },
                  "search_depth": {
                    "type": "string",
                    "enum": ["basic", "advanced"],
                    "description": "Search depth - basic (1 credit) or advanced (2 credits)",
                    "default": "basic"
                  },
                  "max_results": {
                    "type": "integer",
                    "description": "Maximum number of results to return (default: 5)",
                    "default": 5
                  },
                  "include_images": {
                    "type": "boolean",
                    "description": "Whether to include images in search results (default: false)",
                    "default": false
                  },
                  "include_image_descriptions": {
                    "type": "boolean",
                    "description": "Whether to include image descriptions (default: false)",
                    "default": false
                  },
                  "include_answer": {
                    "type": "string",
                    "enum": ["basic", "advanced", false],
                    "description": "Include a short answer to the query (default: false)",
                    "default": false
                  },
                  "include_raw_content": {
                    "type": "boolean",
                    "description": "Include raw HTML content (default: false)",
                    "default": false
                  },
                  "chunks_per_source": {
                    "type": "integer",
                    "description": "Number of content chunks per source (default: 3)",
                    "default": 3
                  },
                  "time_range": {
                    "type": "string",
                    "description": "Time range for search results (e.g., '1d', '1w', '1m')",
                    "default": null
                  },
                  "days": {
                    "type": "integer",
                    "description": "Number of days to look back",
                    "default": null
                  },
                  "country": {
                    "type": "string",
                    "description": "Country to prioritize in search results (default: united states)",
                    "default": "united states"
                  },
                  "topic": {
                    "type": "string",
                    "description": "Search topic (e.g., 'general', 'news', 'academic')",
                    "default": "general"
                  },
                  "include_domains": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    },
                    "description": "List of domains to include in search results",
                    "default": []
                  },
                  "exclude_domains": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    },
                    "description": "List of domains to exclude from search results",
                    "default": []
                  }
                },
                "required": ["query"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Search results with optional AI-generated answer",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "query": {
                      "type": "string"
                    },
                    "answer": {
                      "type": "string",
                      "description": "AI-generated answer to the query (if include_answer is enabled)"
                    },
                    "follow_up_questions": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      },
                      "description": "Suggested follow-up questions"
                    },
                    "results": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "url": {
                            "type": "string"
                          },
                          "title": {
                            "type": "string"
                          },
                          "content": {
                            "type": "string"
                          },
                          "score": {
                            "type": "number"
                          },
                          "raw_content": {
                            "type": "string",
                            "description": "Raw HTML content (if include_raw_content is enabled)"
                          }
                        }
                      }
                    },
                    "images": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "url": {
                            "type": "string"
                          },
                          "description": {
                            "type": "string",
                            "description": "Image description (if include_image_descriptions is enabled)"
                          }
                        }
                      },
                      "description": "Image results (if include_images is enabled)"
                    },
                    "response_time": {
                      "type": "number"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {}
  }
}

console.log("Tavily Advanced Search Tool Schema:")
console.log(JSON.stringify(tavilyToolSchema, null, 2))

console.log("\nTo add this tool to your database:")
console.log("1. Go to your chatbot UI")
console.log("2. Navigate to Tools in the sidebar")
console.log("3. Click 'Create Tool'")
console.log("4. Use these values:")
console.log("   - Name: Tavily Advanced Search")
console.log("   - Description: Perform web searches using Tavily's AI-optimized search engine with both basic and advanced search capabilities")
console.log("   - URL: /api/chat/tools/tavily-search")
console.log("   - Schema: (paste the JSON above)")
console.log("\n5. Make sure to set TAVILY_API_KEY in your environment variables")
console.log("\n6. Usage examples:")
console.log("   - Basic search: { \"query\": \"latest AI news\", \"search_depth\": \"basic\" }")
console.log("   - Advanced search: { \"query\": \"how to configure tavily api\", \"search_depth\": \"advanced\", \"include_answer\": \"advanced\", \"max_results\": 4 }") 