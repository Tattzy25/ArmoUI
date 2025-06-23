import { openapiToFunctions } from "@/lib/openapi-conversion"
import { checkApiKey, getServerProfile } from "@/lib/server/server-chat-helpers"
import { Tables } from "@/supabase/types"
import { ChatSettings } from "@/types"
import {
  ChatCompletionCreateParams,
  ChatCompletionMessage
} from "openai/resources/chat/completions"
import { ChatOpenAI } from "@langchain/openai"
import {
  RunnableToolFunction,
  JsonOutputFunctionsParser
} from "@langchain/core/output_parsers"
import { TavilySearchResults } from "@langchain/community/tools/tavily_search"
import {
  ChatPromptTemplate,
  MessagesPlaceholder
} from "@langchain/core/prompts"
import { AIMessage, HumanMessage } from "@langchain/core/messages"
import { RunnableSequence } from "@langchain/core/runnables"
import { AgentExecutor, type AgentStep } from "langchain/agents"
import { formatToOpenAIToolMessages } from "langchain/agents/format_scratchpad/openai_tools"

// IMPORTANT! Set the runtime to edge
export const runtime = "edge"

export async function POST(request: Request) {
  const json = await request.json()
  const { chatSettings, messages, customModelId } = json as {
    chatSettings: ChatSettings
    messages: any[]
    customModelId: string
  }

  try {
    const profile = await getServerProfile()

    checkApiKey(profile.openai_api_key, "OpenAI")

    const openai = new OpenAI({
      apiKey: profile.openai_api_key || "",
      organization: profile.openai_organization_id
    })

    const CHAT_HISTORY = messages.slice(0, -1)
    const CURRENT_MESSAGE = messages[messages.length - 1]

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", "You are a helpful assistant."],
      new MessagesPlaceholder("chat_history"),
      ["human", "{input}"],
      new MessagesPlaceholder("agent_scratchpad")
    ])

    const model = new ChatOpenAI({
      temperature: chatSettings.temperature,
      modelName: customModelId
    })

    const tools = [new TavilySearchResults({ maxResults: 1 })]

    const agent = await createOpenAIToolsAgent({
      llm: model,
      tools,
      prompt
    })

    const agentExecutor = new AgentExecutor({
      agent,
      tools,
      verbose: true
    })

    const history = CHAT_HISTORY.map(msg => {
      if (msg.role === "user") {
        return new HumanMessage(msg.content)
      } else {
        return new AIMessage(msg.content)
      }
    })

    const result = await agentExecutor.invoke({
      input: CURRENT_MESSAGE.content,
      chat_history: history
    })

    return new Response(result.output)
  } catch (error: any) {
    console.error(error)
    const errorMessage = error.message || "An unexpected error occurred"
    const errorCode = error.status || 500
    return new Response(JSON.stringify({ message: errorMessage }), {
      status: errorCode
    })
  }
}

async function createOpenAIToolsAgent({
  llm,
  tools,
  prompt
}: {
  llm: ChatOpenAI
  tools: any[]
  prompt: ChatPromptTemplate
}) {
  const agent = RunnableSequence.from([
    {
      input: (i: { input: string; steps: AgentStep[] }) => i.input,
      agent_scratchpad: (i: { input: string; steps: AgentStep[] }) =>
        formatToOpenAIToolMessages(i.steps),
      chat_history: (i: {
        input: string
        steps: AgentStep[]
        chat_history: (HumanMessage | AIMessage)[]
      }) => i.chat_history
    },
    prompt,
    llm.bind({
      tools: tools.map(tool => ({
        type: "function",
        function: {
          name: tool.name,
          description: tool.description,
          parameters: tool.schema
        }
      }))
    }),
    new JsonOutputFunctionsParser()
  ])
  return agent
}
