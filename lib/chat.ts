export type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

/**
 * Sends messages to POST /api/chat and streams the response.
 *
 * @example
 * await streamChat(
 *   [{ role: "user", content: "Review my resume..." }],
 *   (chunk) => setResponse((prev) => prev + chunk),
 *   () => console.log("Done!")
 * );
 */
export async function streamChat(
  messages: ChatMessage[],
  onChunk: (content: string) => void,
  onDone?: () => void,
  options?: { temperature?: number; max_tokens?: number }
) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, ...options }),
  });

  if (!res.ok || !res.body) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const text = decoder.decode(value, { stream: true });

    // Parse SSE lines: "data: {...}\n\n"
    for (const line of text.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;

      const payload = trimmed.slice(5).trim();
      if (payload === "[DONE]") {
        onDone?.();
        return;
      }

      try {
        const parsed = JSON.parse(payload);
        if (parsed.content) onChunk(parsed.content);
        if (parsed.error) throw new Error(parsed.error);
      } catch {
        // ignore malformed lines
      }
    }
  }

  onDone?.();
}
