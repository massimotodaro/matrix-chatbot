# Matrix Chatbot (nit-chatbot)

A Matrix-themed AI chatbot with a retro terminal aesthetic. Built with React + TypeScript and powered by n8n workflow automation.

**Live Demo:** https://nit-chatbot.vercel.app

## Features

- **Matrix-inspired UI** - Green-on-black terminal interface with CRT screen effects
- **Matrix Rain Animation** - Falling characters background effect
- **Typewriter Text** - Animated text output for bot responses
- **AI-Powered Responses** - Connected to n8n workflow with OpenAI integration
- **Responsive Design** - Works on desktop and mobile devices

## Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  React Frontend │────▶│  Vercel Python   │────▶│   n8n Webhook   │
│   (Vite + TS)   │     │   Serverless     │     │   (Cloud/Local) │
└─────────────────┘     └──────────────────┘     └────────┬────────┘
                                                          │
                                                          ▼
                                                 ┌─────────────────┐
                                                 │  OpenAI API     │
                                                 │  (GPT Model)    │
                                                 └─────────────────┘
```

### Components

| Component | Description |
|-----------|-------------|
| **Frontend** | React 19 + TypeScript + Vite |
| **Backend** | Vercel Python Serverless Function |
| **Workflow** | n8n with Webhook trigger + LLM Chain |
| **AI Model** | OpenAI GPT via n8n |

## Project Structure

```
nit-chatbot/
├── api/
│   └── chat.py              # Vercel serverless function
├── src/
│   ├── components/
│   │   ├── ChatWindow/      # Message display area
│   │   ├── InputField/      # User input with terminal prompt
│   │   ├── Terminal/        # Terminal window wrapper
│   │   ├── MatrixRain/      # Falling characters animation
│   │   ├── CRTOverlay/      # CRT screen effect
│   │   ├── TypewriterText/  # Animated text output
│   │   └── LoadingIndicator/# Loading animation
│   ├── hooks/
│   │   ├── useChat.ts       # Chat state management
│   │   ├── useAutoScroll.ts # Auto-scroll on new messages
│   │   └── useTypewriter.ts # Typewriter animation logic
│   ├── services/
│   │   ├── api.ts           # API communication
│   │   └── mockApi.ts       # Mock responses for testing
│   ├── App.tsx              # Main application component
│   └── main.tsx             # React entry point
├── server.py                # Local Flask dev server
├── vercel.json              # Vercel configuration
└── package.json             # Node dependencies
```

## How It Works

1. **User sends a message** via the terminal input
2. **Frontend calls `/api/chat`** endpoint with the message
3. **Vercel serverless function** receives the request
4. **Function calls n8n webhook** with the message as a parameter
5. **n8n workflow processes the message**:
   - Webhook receives the request
   - Basic LLM Chain sends message to OpenAI
   - Response is returned via Respond to Webhook node
6. **Response flows back** through the chain to the frontend
7. **Typewriter effect** displays the bot's response

## Setup

### Prerequisites

- Node.js 18+
- Python 3.12+
- n8n account (cloud or self-hosted)
- OpenAI API key (configured in n8n)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/massimotodaro/matrix-chatbot.git
   cd matrix-chatbot
   ```

2. **Install dependencies**
   ```bash
   npm install
   pip install flask flask-cors requests
   ```

3. **Configure local environment**

   Create `.env.local`:
   ```
   VITE_API_URL=http://localhost:8000
   ```

4. **Update `server.py`** with your n8n webhook URL:
   ```python
   N8N_WEBHOOK = "http://localhost:5678/webhook/your-webhook-id"
   ```

5. **Start the servers**
   ```bash
   # Terminal 1: Flask backend
   python server.py

   # Terminal 2: React frontend
   npm run dev
   ```

6. Open http://localhost:5173

### Production Deployment (Vercel)

1. **Push to GitHub**

2. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

3. **Set environment variable** in Vercel dashboard:
   ```
   N8N_WEBHOOK_URL=https://your-n8n.app.n8n.cloud/webhook/your-webhook-id
   ```

## n8n Workflow Setup

1. Create a new workflow in n8n
2. Add nodes:
   - **Webhook** (GET method) - Trigger
   - **Basic LLM Chain** - Process message
   - **OpenAI Chat Model** - AI model (connected to LLM Chain)
   - **Respond to Webhook** - Return response
3. Configure OpenAI credentials
4. **Publish** the workflow (important!)
5. Copy the **Production URL** from the Webhook node

## Environment Variables

| Variable | Environment | Description |
|----------|-------------|-------------|
| `N8N_WEBHOOK_URL` | Vercel (Production) | n8n webhook URL |
| `VITE_API_URL` | Local Development | Backend URL (default: empty for relative) |

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite 7
- **Backend:** Python, Vercel Serverless Functions
- **Styling:** CSS with custom Matrix theme
- **Automation:** n8n workflow
- **AI:** OpenAI GPT via n8n
- **Hosting:** Vercel

## API Reference

### POST /api/chat

Send a message to the chatbot.

**Request:**
```json
{
  "message": "Hello, how are you?"
}
```

**Response:**
```json
{
  "reply": "Hello! I'm doing well. How can I assist you today?"
}
```

## Local vs Production

| Aspect | Local | Production |
|--------|-------|------------|
| Frontend | `npm run dev` (Vite) | Vercel CDN |
| Backend | `server.py` (Flask) | `api/chat.py` (Serverless) |
| n8n | localhost:5678 (Docker) | n8n Cloud |
| URL | localhost:5173 | nit-chatbot.vercel.app |

## License

MIT

---

Built with React + TypeScript + n8n
