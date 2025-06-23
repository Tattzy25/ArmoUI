import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const {
      query,
      search_depth = "basic",
      max_results = 5,
      include_images = false,
      include_image_descriptions = false,
      include_answer = false,
      include_raw_content = false,
      chunks_per_source = 3,
      time_range = null,
      days = null,
      country = "united states",
      topic = "general",
      include_domains = [],
      exclude_domains = []
    } = await req.json()

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 })
    }

    const apiKey = process.env.TAVILY_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: "Tavily API key not configured" },
        { status: 500 }
      )
    }

    const response = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        query,
        search_depth,
        max_results,
        include_images,
        include_image_descriptions,
        include_answer,
        include_raw_content,
        chunks_per_source,
        time_range,
        days,
        country,
        topic,
        include_domains,
        exclude_domains
      })
    })

    if (!response.ok) {
      throw new Error(`Tavily API error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Tavily search error:", error)
    return NextResponse.json(
      { error: "Failed to perform search" },
      { status: 500 }
    )
  }
}
