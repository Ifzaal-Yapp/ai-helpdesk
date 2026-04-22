from fastapi import APIRouter

router = APIRouter()

conversation_history = []

@router.post("/chat")
def chat(message: dict):
    user_message = message.get("message", "")
    
    conversation_history.append({
        "role": "user",
        "content": user_message
    })
    
    # Placeholder response - Claude API will replace this later
    ai_response = f"Thank you for your message. Our AI assistant will be connected soon. You asked: {user_message}"
    
    conversation_history.append({
        "role": "assistant", 
        "content": ai_response
    })
    
    return {
        "response": ai_response,
        "history_length": len(conversation_history)
    }

@router.get("/history")
def get_history():
    return {"history": conversation_history}