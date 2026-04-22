from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.chat import router as chat_router

app = FastAPI(
    title="AI Help Desk",
    description="An AI-powered IT support chatbot",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(chat_router, prefix="/api")

@app.get("/")
def root():
    return {"message": "AI Help Desk API is running!"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}