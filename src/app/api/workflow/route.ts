import { mastra } from "@/mastra";

export async function POST(req: Request) {
  const { city } = await req.json();
  const agent = mastra.getAgent("weatherAgent");

  const result = await agent.stream(`What's the weather like in ${city}?`);

  return result.toDataStreamResponse();
}
