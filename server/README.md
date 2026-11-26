# Voyage Plus assistant backend

This server is for local development only. It binds to 127.0.0.1 and must not be exposed directly to the internet. Before public deployment, add user authentication, per-user rate and spending limits, monitoring, HTTPS, and appropriate privacy controls at a trusted backend or gateway. CORS is not authentication. Do not place the OpenAI key in the app or share it in chat.

Requires Node.js 20 or newer and an OpenAI API key with API billing configured.

In Windows Environment Variables, add `OPENAI_API_KEY` as a user variable with your key as its value. Open a new terminal, then start the server:

```powershell
node server/server.mjs
```

For hosting, use the provider's secret manager instead. Optionally set `OPENAI_MODEL` and `PORT`.

For browser development, set `VITE_CHAT_API_URL=http://localhost:8787/chat` in your local environment before starting Vite. `ALLOWED_ORIGINS` is a comma-separated list and defaults to `http://localhost:5173`. The app uses its existing FAQ if no URL is configured. If a configured service fails, it shows an error and does not silently substitute an AI answer.

An Android device cannot reach the developer computer through its own localhost. For a production app, deploy a protected HTTPS backend, configure its allowed app origins and set `VITE_CHAT_API_URL` to its `/chat` endpoint when building the app. The URL is public; never put a secret in a `VITE_` variable. This local server is not production-ready.
