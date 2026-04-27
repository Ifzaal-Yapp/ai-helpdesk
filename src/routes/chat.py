from fastapi import APIRouter
from anthropic import Anthropic
from dotenv import load_dotenv
import os

load_dotenv()

router = APIRouter()
client = Anthropic()
conversation_history = []

SYSTEM_PROMPT = """You are a friendly IT support assistant helping 
non-technical users solve everyday computer problems. 

Always:
- Use plain English and avoid technical jargon
- Give clear numbered steps that are easy to follow
- Be patient and encouraging
- Ask one clarifying question if you need more information
- Keep responses concise and focused on solving the problem

If a problem is beyond basic troubleshooting, kindly suggest 
the user contacts a professional IT technician."""

@router.post("/chat")
def chat(message: dict):
    user_message = message.get("message", "")

    if not user_message:
        return {"error": "No message provided"}

    conversation_history.append({
        "role": "user",
        "content": user_message
    })

    try:
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1024,
            system=SYSTEM_PROMPT,
            messages=conversation_history
        )

        ai_response = response.content[0].text

        conversation_history.append({
            "role": "assistant",
            "content": ai_response
        })

        return {
            "response": ai_response,
            "message_count": len(conversation_history)
        }

    except Exception as e:
        return {
            "response": "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
            "error": str(e)
        }

@router.get("/history")
def get_history():
    return {"history": conversation_history}

@router.delete("/history")
def clear_history():
    conversation_history.clear()
    return {"message": "Conversation history cleared"}