import { MastraClient } from "@mastra/client-js";

// Initialize the client
export const mastraClient = new MastraClient({
  baseUrl: process.env.NEXT_PUBLIC_MASTRA_API_URL || "http://localhost:4111",
});
