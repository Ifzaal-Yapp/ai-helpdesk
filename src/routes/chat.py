from fastapi import APIRouter

router = APIRouter()

conversation_history = []

@router.post("/chat")
def chat(message: dict):
    user_message = message.get("message", "")
    
    if not user_message:
        return {"error": "No message provided"}
    
    conversation_history.append({
        "role": "user",
        "content": user_message
    })
    
    # Placeholder response
    # This will be replaced with Claude API call in Phase 2
    ai_response = (
        f"Thanks for your message. "
        f"You said: '{user_message}'. "
        f"Claude API will be connected soon!"
    )
    
    conversation_history.append({
        "role": "assistant",
        "content": ai_response
    })
    
    return {
        "response": ai_response,
        "message_count": len(conversation_history)
    }

@router.get("/history")
def get_history():
    return {"history": conversation_history}

@router.delete("/history")
def clear_history():
    conversation_history.clear()
    return {"message": "Conversation history cleared"}