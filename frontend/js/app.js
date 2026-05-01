/* ============================================
   HelpDesk AI — Application Logic
   Project: AI Help Desk Chatbot
   Developer: Ifzaal Yapp
   Phase: 4 — Frontend UI
   API endpoint: http://127.0.0.1:8000/api/chat
   ============================================ */

// Backend API URL — change this when deployed
const API_URL = 'http://127.0.0.1:8000/api/chat';

// Track conversation state
let isWaiting = false;
let lastAiMessage = null;

/* ============================================
   Send a message typed by the user
   ============================================ */
async function sendMessage() {
  const input = document.getElementById('user-input');
  const message = input.value.trim();

  if (!message || isWaiting) return;

  // Clear input and hide suggestions
  input.value = '';
  hideSuggestions();

  // Show user message in chat
  appendMessage(message, 'user');

  // Show typing indicator
  const typingId = showTyping();

  // Disable send button while waiting
  setWaiting(true);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: message })
    });

    if (!response.ok) {
      throw new Error('Server error — please try again');
    }

    const data = await response.json();

    // Remove typing indicator and show response
    removeTyping(typingId);
    appendMessage(data.response, 'ai');

  } catch (error) {
    removeTyping(typingId);
    appendMessage(
      "Sorry, I'm having trouble connecting right now. Please check your internet connection and try again.",
      'ai',
      true
    );
  }

  setWaiting(false);
}

/* ============================================
   Send a suggested starter question
   ============================================ */
function sendSuggestion(text) {
  document.getElementById('user-input').value = text;
  sendMessage();
}

/* ============================================
   Handle keyboard — Enter to send
   ============================================ */
function handleKey(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
}

/* ============================================
   Add a message to the chat window
   ============================================ */
function appendMessage(text, sender, isError = false) {
  const messages = document.getElementById('messages');

  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender);

  const avatar = document.createElement('div');
  avatar.classList.add('avatar');
  avatar.classList.add(sender === 'ai' ? 'ai-avatar' : 'user-avatar');
  avatar.textContent = sender === 'ai' ? 'AI' : 'IY';

  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  bubble.textContent = text;

  if (isError) {
    bubble.style.background = '#fff7ed';
    bubble.style.borderColor = '#fed7aa';
    bubble.style.color = '#9a3412';
  }

  messageDiv.appendChild(avatar);
  messageDiv.appendChild(bubble);

  // Add "That didn't work" button after AI messages
  if (sender === 'ai' && !isError) {
    const retryBtn = document.createElement('div');
    retryBtn.innerHTML = `
      <button class="retry-btn" onclick="sendSuggestion('That didn\\'t work, can you suggest something else?')">
        ⚠️ That didn't work — try something else
      </button>
    `;
    messageDiv.appendChild(retryBtn);
    lastAiMessage = messageDiv;
  }

  messages.appendChild(messageDiv);

  // Scroll to latest message
  messages.scrollTop = messages.scrollHeight;
  setTimeout(() => {
    messages.scrollTop = messages.scrollHeight;
  }, 100);
}

/* ============================================
   Show typing indicator while waiting
   ============================================ */
function showTyping() {
  const messages = document.getElementById('messages');
  const id = 'typing-' + Date.now();

  const typingDiv = document.createElement('div');
  typingDiv.classList.add('message', 'ai');
  typingDiv.id = id;

  const avatar = document.createElement('div');
  avatar.classList.add('avatar', 'ai-avatar');
  avatar.textContent = 'AI';

  const bubble = document.createElement('div');
  bubble.classList.add('typing-bubble');
  bubble.innerHTML = '<span></span><span></span><span></span>';

  typingDiv.appendChild(avatar);
  typingDiv.appendChild(bubble);
  messages.appendChild(typingDiv);
  messages.scrollTop = messages.scrollHeight;

  return id;
}

/* ============================================
   Remove typing indicator
   ============================================ */
function removeTyping(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

/* ============================================
   Hide suggested questions after first use
   ============================================ */
function hideSuggestions() {
  const suggestions = document.getElementById('suggestions');
  if (suggestions) {
    suggestions.style.transition = 'opacity 0.3s';
    suggestions.style.opacity = '0';
    setTimeout(() => suggestions.remove(), 300);
  }
}

/* ============================================
   Start a new chat session
   ============================================ */
async function newChat() {
  // Clear messages from screen
  const messages = document.getElementById('messages');
  messages.innerHTML = '';

  // Clear history on backend
  try {
    await fetch('http://127.0.0.1:8000/api/history', {
      method: 'DELETE'
    });
  } catch (error) {
    console.log('Could not clear backend history');
  }

  // Show welcome message again
  appendMessage(
    "Hello! I'm your IT support assistant. I can help you troubleshoot technical issues and answer IT questions. What can I help you with today?",
    'ai'
  );
  messages.scrollTop = messages.scrollHeight;

  // Restore suggestions
  const suggestionsHTML = `
    <div class="suggestions" id="suggestions">
      <p class="suggestions-label">Common issues — tap to get started:</p>
      <div class="suggestions-grid">
        <button class="suggestion-btn" onclick="sendSuggestion('My computer won\\'t turn on')">💻 Computer won't turn on</button>
        <button class="suggestion-btn" onclick="sendSuggestion('I can\\'t connect to WiFi')">📶 Can't connect to WiFi</button>
        <button class="suggestion-btn" onclick="sendSuggestion('My printer isn\\'t working')">🖨️ Printer not working</button>
        <button class="suggestion-btn" onclick="sendSuggestion('I\\'ve forgotten my password')">🔑 Forgotten my password</button>
        <button class="suggestion-btn" onclick="sendSuggestion('My screen has gone black')">🖥️ Screen has gone black</button>
        <button class="suggestion-btn" onclick="sendSuggestion('My computer is running very slowly')">🐢 Computer running slowly</button>
      </div>
    </div>
  `;

  messages.insertAdjacentHTML('beforeend', suggestionsHTML);
}

/* ============================================
   Clear chat history
   ============================================ */
async function clearHistory() {
  try {
    await fetch('http://127.0.0.1:8000/api/history', {
      method: 'DELETE'
    });
    newChat();
  } catch (error) {
    console.log('Could not clear history');
  }
}

/* ============================================
   Disable/enable send button while waiting
   ============================================ */
function setWaiting(waiting) {
  isWaiting = waiting;
  const btn = document.querySelector('.send-btn');
  const input = document.getElementById('user-input');
  btn.disabled = waiting;
  input.disabled = waiting;
  btn.textContent = waiting ? 'Sending...' : 'Send';
}