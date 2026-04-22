from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv("ANTHROPIC_API_KEY")

if api_key:
    print("API key loaded successfully!")
    print(f"Key starts with: {api_key[:10]}...")
else:
    print("ERROR: API key not found. Check your .env file.")