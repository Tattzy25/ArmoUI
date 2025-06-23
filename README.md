# ArmoUI Chatbot

A Next.js AI chatbot UI with Groq LLM integration, Tavily search tool, and Supabase authentication.

---

## Features
- Multi-model LLM chat (Groq, OpenAI, etc.)
- Tool calling (Tavily search, custom tools)
- Supabase authentication and storage
- Modern, extensible UI

---

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/Tattzy25/ArmoUI.git
cd ArmoUI/chatbot-ui
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Copy the example file and fill in your real keys:
```bash
cp .env.example .env.development.local
```

#### Required variables:
- `NEXT_PUBLIC_SUPABASE_URL` — from your Supabase project
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from your Supabase project
- `SUPABASE_SERVICE_ROLE_KEY` — from your Supabase project (for server-side/admin actions)
- `GROQ_API_KEY` — from https://console.groq.com/keys
- `TAVILY_API_KEY` — from https://app.tavily.com/

**You must use real Supabase credentials for authentication to work!**

### 4. Start the dev server
```bash
npm run dev
```

---

## Supabase Setup
1. Go to [Supabase](https://app.supabase.com/), create a new project.
2. Get your Project URL and anon/public keys from Project Settings > API.
3. Enable email authentication in Authentication > Providers.
4. (Optional) Run the SQL migrations in `supabase/migrations/` to set up tables.

---

## Groq Setup
- Get your API key from https://console.groq.com/keys
- Add it to your `.env.development.local` as `GROQ_API_KEY`

---

## Tavily Setup
- Get your API key from https://app.tavily.com/
- Add it to your `.env.development.local` as `TAVILY_API_KEY`

---

## Deployment
- Deploy to [Vercel](https://vercel.com/) or your preferred platform.
- Set all environment variables in your deployment dashboard.

---

## Troubleshooting
### Can't sign up or log in?
- Make sure `.env.development.local` has **real** Supabase credentials.
- The error `getaddrinfo ENOTFOUND dummy.supabase.co` means you are using placeholder values.
- Go to [Supabase](https://app.supabase.com/), create a project, and use the real values.

### UI not loading?
- Check the browser console for errors.
- Make sure the dev server is running (`npm run dev`).

---

## Contributing
Pull requests welcome!

---

## License
MIT 