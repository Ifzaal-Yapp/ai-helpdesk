# Architecture

**Project:** AI Help Desk Chatbot  
**Developer:** Ifzaal Yapp  
**Last updated:** 26 April 2026

---

## Overview

The AI Help Desk Chatbot is a full-stack web application consisting of three layers — a JavaScript frontend, a Python backend API, and the Anthropic Claude AI service. The three layers communicate via HTTP requests using JSON data.

```
User → Frontend (HTML/CSS/JS) → Backend (FastAPI/Python) → Claude AI (Anthropic API)
```

---

## System architecture

### Layer 1 — Frontend
**Location:** `frontend/`  
**Technology:** HTML, CSS, vanilla JavaScript  
**Served by:** VS Code Live Server (development) / static hosting (production)  
**Responsibility:** Renders the chat interface, captures user input, sends requests to the backend, and displays responses.

### Layer 2 — Backend API
**Location:** `src/`  
**Technology:** Python, FastAPI, Uvicorn  
**Port:** 8000  
**Responsibility:** Receives messages from the frontend, manages conversation history, calls the Claude API, and returns responses.

### Layer 3 — AI service
**Provider:** Anthropic  
**Model:** claude-sonnet-4-20250514  
**Responsibility:** Receives conversation history and a system prompt, generates contextual IT support responses, and returns them to the backend.

---

## Request lifecycle

When a user sends a message, the following sequence occurs:

1. User types a message and clicks Send in the browser
2. JavaScript `sendMessage()` function fires
3. Frontend sends `POST /api/chat` request to backend with the message as JSON
4. FastAPI receives the request and appends the message to conversation history
5. Backend calls Anthropic Claude API with full conversation history and system prompt
6. Claude generates a contextual IT support response
7. Backend appends the response to conversation history and returns it as JSON
8. Frontend receives the response and renders it in the chat window
9. "That didn't work" button is appended below the AI response

---

## Key design decisions

### Why FastAPI?
FastAPI was chosen over Flask or Django because it auto-generates interactive API documentation, has excellent performance, uses modern Python type hints, and has a gentle learning curve suitable for a first professional project.

### Why vanilla JavaScript?
The frontend uses no JavaScript framework deliberately. React or Vue would add unnecessary complexity for this stage of the project. Vanilla JavaScript keeps the codebase simple, fast, and easy to understand, and can be upgraded to a framework in a future version.

### Why a separate frontend folder?
Keeping frontend and backend code in separate folders mirrors professional project conventions, makes deployment simpler (each layer can be hosted independently), and keeps responsibilities clearly separated.

### Why conversation history in memory?
Conversation history is currently stored in a Python list in memory rather than a database. This is appropriate for an MVP — it keeps the architecture simple, requires no database setup, and is sufficient for single-user sessions. A database will be introduced in a future version for multi-user support.

### Why CORS middleware?
The frontend (port 5500) and backend (port 8000) run on different ports, which browsers treat as different origins. CORS middleware on the backend allows these cross-origin requests during development.

---

## Security considerations

- API keys are stored in `.env` files and never committed to version control
- `.env` is listed in `.gitignore`
- `.env.example` provides a safe template for collaborators
- CORS is currently set to allow all origins (`*`) — this will be restricted to specific domains before production deployment
- No user authentication is implemented in the current version — planned for a future release

---

## Folder structure

```
ai-helpdesk/
├── frontend/               # Layer 1 — UI
│   ├── css/style.css       # Visual styling
│   ├── js/app.js           # Application logic and API calls
│   └── index.html          # Entry point
│
├── src/                    # Layer 2 — Backend API
│   ├── routes/
│   │   └── chat.py         # Chat route — POST, GET, DELETE
│   └── main.py             # FastAPI app, CORS, router registration
│
├── docs/                   # Technical documentation
├── tests/                  # Automated tests (Phase 5)
├── .env                    # Secrets — never committed
├── .env.example            # Safe template
├── .gitignore              # Git exclusions
└── requirements.txt        # Python dependencies
```

---

## Future architecture plans

| Feature | Architectural change required |
|---------|------------------------------|
| Multi-user support | Add database (PostgreSQL or SQLite) for conversation persistence |
| User authentication | Add JWT token authentication layer |
| Business customisation | Add per-business configuration stored in database |
| Scalability | Move to containerised deployment with Docker |
| Offline fallback | Integrate Ollama for local model hosting |

---

*Document created: 26 April 2026*
