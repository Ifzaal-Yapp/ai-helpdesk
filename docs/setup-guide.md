# Setup guide

**Project:** AI Help Desk Chatbot  
**Developer:** Ifzaal Yapp  
**GitHub:** https://github.com/Ifzaal-Yapp/ai-helpdesk  
**Last updated:** 26 April 2026

---

## Prerequisites

Before you begin, make sure you have the following installed:

- Python 3.11 or higher — python.org/downloads
- Git — git-scm.com
- VS Code — code.visualstudio.com
- A free Anthropic account — console.anthropic.com

---

## Quick start

### 1. Clone the repository

```bash
git clone https://github.com/Ifzaal-Yapp/ai-helpdesk.git
cd ai-helpdesk
```

### 2. Create and activate a virtual environment

```bash
# Create virtual environment
python -m venv venv

# Activate on Windows
venv\Scripts\activate

# Activate on Mac/Linux
source venv/bin/activate
```

You should see `(venv)` appear at the start of your terminal prompt.

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Set up your environment variables

Copy the example environment file:

```bash
copy .env.example .env
```

Open `.env` and add your Anthropic API key:

```
ANTHROPIC_API_KEY=your_api_key_here
```

Get your API key from console.anthropic.com. A free $5 credit is available on signup.

### 5. Verify your API key is loading correctly

```bash
python test_key.py
```

You should see:
```
API key loaded successfully!
Key starts with: sk-ant-api0...
```

### 6. Start the backend server

```bash
cd src
uvicorn main:app --reload
```

The server will start at `http://127.0.0.1:8000`

### 7. Open the frontend

Install the Live Server extension in VS Code, then:

1. Open `frontend/index.html` in VS Code
2. Right click inside the file
3. Select "Open with Live Server"

The frontend will open at `http://127.0.0.1:5500/frontend/index.html`

---

## Verifying everything works

Once both servers are running, open your browser and visit:

| URL | Expected result |
|-----|----------------|
| `http://127.0.0.1:8000` | `{"message": "AI Help Desk API is running!"}` |
| `http://127.0.0.1:8000/health` | `{"status": "healthy"}` |
| `http://127.0.0.1:8000/docs` | Interactive API documentation |
| `http://127.0.0.1:5500/frontend/index.html` | HelpDesk AI chat interface |

---

## Project structure

```
ai-helpdesk/
├── frontend/               # Frontend UI
│   ├── css/
│   │   └── style.css       # Stylesheet
│   ├── js/
│   │   └── app.js          # Application logic
│   └── index.html          # Main HTML file
├── src/                    # Backend API
│   ├── routes/
│   │   └── chat.py         # Chat endpoints
│   └── main.py             # FastAPI application
├── docs/                   # Documentation
├── tests/                  # Test files
├── venv/                   # Virtual environment (not tracked)
├── .env                    # API keys (not tracked)
├── .env.example            # Safe template for API keys
├── .gitignore              # Files excluded from Git
├── requirements.txt        # Python dependencies
└── test_key.py             # API key verification script
```

---

## Common issues

### "Command 'python' not found"
Use `python3` instead, or install Python from python.org ensuring you tick "Add Python to PATH" during installation.

### "ModuleNotFoundError: No module named 'dotenv'"
Your virtual environment is not active. Run `venv\Scripts\activate` first.

### "Cannot GET /index.html"
Live Server is serving the wrong folder. Make sure `index.html` is the active file in VS Code before opening with Live Server.

### API key not loading
Check your `.env` file exists in the project root and contains your key without any spaces or quotes around it.

---

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| fastapi | latest | REST API framework |
| uvicorn | latest | ASGI web server |
| anthropic | latest | Claude AI SDK |
| python-dotenv | latest | Environment variable management |

Full pinned versions available in `requirements.txt`.

---

## Contributing

This is a personal portfolio project. If you have suggestions or spot any issues, feel free to open an issue on GitHub.

---

*Document created: 26 April 2026*
