"use client";

import { mastraClient } from "@/lib/mastra";

export function SimpleWeather() {
  async function handleSubmit(formData: FormData) {
    const city = formData.get("city");
    const agent = mastraClient.getAgent("weatherAgent");

    try {
      const response = await agent.generate({
        messages: [
          { role: "user", content: `What's the weather like in ${city}?` },
        ],
      });
      // Handle the response
      console.log(response.text);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <form action={handleSubmit}>
      <input name="city" placeholder="Enter city name" />
      <button type="submit">Get Weather</button>
    </form>
  );
}
