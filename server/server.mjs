import http from "node:http";

// Local development only. A public deployment requires authentication and abuse controls.
const host = "127.0.0.1";
const port = Number(process.env.PORT || 8787);
const apiKey = process.env.OPENAI_API_KEY;
const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";
const allowedOrigins = new Set((process.env.ALLOWED_ORIGINS || "http://localhost:5173").split(",").map((s) => s.trim()));

function send(res, status, data, origin) {
  const headers = { "Content-Type": "application/json", "Cache-Control": "no-store", "Vary": "Origin" };
  if (allowedOrigins.has(origin)) headers["Access-Control-Allow-Origin"] = origin;
  res.writeHead(status, headers);
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  const origin = req.headers.origin;
  if (!origin || !allowedOrigins.has(origin)) return send(res, 403, { error: "Origin not allowed" }, origin);
  if (req.method === "OPTIONS" && req.url === "/chat") {
    res.writeHead(204, { "Access-Control-Allow-Origin": origin, "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Vary": "Origin" });
    return res.end();
  }
  if (req.method !== "POST" || req.url !== "/chat") return send(res, 404, { error: "Not found" }, origin);
  if (!apiKey) return send(res, 503, { error: "Server is not configured" }, origin);
  let body = "";
  try {
    for await (const chunk of req) {
      body += chunk;
      if (Buffer.byteLength(body) > 8192) return send(res, 413, { error: "Request too large" }, origin);
    }
    const { message } = JSON.parse(body);
    if (typeof message !== "string" || !message.trim() || message.length > 2000) return send(res, 400, { error: "Invalid message" }, origin);
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model, instructions: "You are Voyage Plus's helpful travel assistant. Reply in the user's language. Be concise. Do not invent prices, availability, bookings, or visa rules. Direct users to official sources for entry requirements.", input: message.trim(), max_output_tokens: 400 }),
      signal: AbortSignal.timeout(30000),
    });
    if (!response.ok) return send(res, 502, { error: "Assistant service unavailable" }, origin);
    const result = await response.json();
    const reply = (result.output || []).flatMap((item) => item.content || []).filter((item) => item.type === "output_text").map((item) => item.text).join("\n").trim();
    if (!reply) return send(res, 502, { error: "Assistant returned no text" }, origin);
    return send(res, 200, { reply }, origin);
  } catch {
    return send(res, 502, { error: "Unable to process request" }, origin);
  }
});
server.listen(port, host, () => console.log(`Local assistant server listening on http://${host}:${port}`));
