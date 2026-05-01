# Test Plan — AI Help Desk Chatbot

**Project:** AI Help Desk Chatbot  
**Developer:** Ifzaal Yapp  
**Version:** 1.0.0  
**Test date:** 29 April 2026  
**Tester:** Ifzaal Yapp  
**GitHub:** https://github.com/Ifzaal-Yapp/ai-helpdesk  
**Environment:** Local development — http://127.0.0.1:5500/frontend/index.html

---

## Overview

This document records the results of manual testing carried out on the AI Help Desk Chatbot prior to deployment. The purpose of testing is to verify that all features work correctly, responses are appropriate for non-technical users, and the application handles errors gracefully.

---

## Test environment

| Item | Details |
|------|---------|
| Operating system | Windows 11 |
| Browser | Microsoft Edge |
| Frontend URL | http://127.0.0.1:5500/frontend/index.html |
| Backend URL | http://127.0.0.1:8000 |
| AI model | claude-sonnet-4-20250514 |
| Test date | 29 April 2026 |

---

## Test 1 — Starter question buttons

**Objective:** Verify all six suggested starter questions send correctly and receive a relevant AI response.

| # | Starter question | Result | Response quality | Notes |
|---|-----------------|--------|-----------------|-------|
| 1.1 | 💻 Computer won't turn on |🟩 Pass / ⬜ Fail | ⬜ Good / ⬜ Fair / ⬜ Poor | |
| 1.2 | 📶 Can't connect to WiFi | 🟩 Pass / ⬜ Fail | ⬜ Good / ⬜ Fair / ⬜ Poor | |
| 1.3 | 🖨️ Printer not working | 🟩 Pass / ⬜ Fail | ⬜ Good / ⬜ Fair / ⬜ Poor | |
| 1.4 | 🔑 Forgotten my password | 🟩 Pass / ⬜ Fail | ⬜ Good / ⬜ Fair / ⬜ Poor | |
| 1.5 | 🖥️ Screen has gone black | ⬜ Pass / ⬜ Fail | ⬜ Good / ⬜ Fair / ⬜ Poor | |
| 1.6 | 🐢 Computer running slowly | ⬜ Pass / ⬜ Fail | ⬜ Good / ⬜ Fair / ⬜ Poor | |

**Overall Test 1 result:** ⬜ Pass / ⬜ Fail  
**Notes:**

---

## Test 2 — Manual message input

**Objective:** Verify that a user can type a custom IT question and receive a relevant response.

| # | Test message | Result | Response quality | Notes |
|---|-------------|--------|-----------------|-------|
| 2.1 | "My keyboard is typing the wrong characters" | ⬜ Pass / ⬜ Fail | ⬜ Good / ⬜ Fair / ⬜ Poor | |
| 2.2 | "I can't open my emails" | ⬜ Pass / ⬜ Fail | ⬜ Good / ⬜ Fair / ⬜ Poor | |
| 2.3 | "My mouse has stopped working" | ⬜ Pass / ⬜ Fail | ⬜ Good / ⬜ Fair / ⬜ Poor | |
| 2.4 | "I keep getting a blue screen error" | ⬜ Pass / ⬜ Fail | ⬜ Good / ⬜ Fair / ⬜ Poor | |
| 2.5 | "My computer is making a loud noise" | ⬜ Pass / ⬜ Fail | ⬜ Good / ⬜ Fair / ⬜ Poor | |

**Overall Test 2 result:** ⬜ Pass / ⬜ Fail  
**Notes:**

---

## Test 3 — Conversation history and follow up questions

**Objective:** Verify that the AI remembers context from earlier in the conversation and can handle follow up questions naturally.

| # | Action | Expected result | Result | Notes |
|---|--------|----------------|--------|-------|
| 3.1 | Send "My printer isn't working" | AI gives troubleshooting steps | ⬜ Pass / ⬜ Fail | |
| 3.2 | Follow up with "I tried that but it still won't print" | AI acknowledges previous steps and suggests alternatives | ⬜ Pass / ⬜ Fail | |
| 3.3 | Follow up with "Which cable do I need to check?" | AI gives specific cable advice in context of printer issue | ⬜ Pass / ⬜ Fail | |
| 3.4 | Send "My WiFi isn't working" then follow up with "What do I do next?" | AI continues WiFi troubleshooting not printer | ⬜ Pass / ⬜ Fail | |

**Overall Test 3 result:** ⬜ Pass / ⬜ Fail  
**Notes:**

---

## Test 4 — "That didn't work" button

**Objective:** Verify that the retry button sends a follow up message and Claude suggests an alternative solution.

| # | Action | Expected result | Result | Notes |
|---|--------|----------------|--------|-------|
| 4.1 | Send any message and click "That didn't work — try something else" | AI acknowledges and suggests a different approach | ⬜ Pass / ⬜ Fail | |
| 4.2 | Click "That didn't work" a second time | AI suggests a further alternative | ⬜ Pass / ⬜ Fail | |
| 4.3 | Verify button appears after every AI response | Button visible below each response | ⬜ Pass / ⬜ Fail | |

**Overall Test 4 result:** ⬜ Pass / ⬜ Fail  
**Notes:**

---

## Test 5 — New chat button

**Objective:** Verify that starting a new chat clears the conversation and restores the starter questions.

| # | Action | Expected result | Result | Notes |
|---|--------|----------------|--------|-------|
| 5.1 | Have a conversation then click "New chat" | All messages cleared from screen | ⬜ Pass / ⬜ Fail | |
| 5.2 | After new chat, verify welcome message appears | Welcome message visible | ⬜ Pass / ⬜ Fail | |
| 5.3 | After new chat, verify starter questions reappear | All six suggestion buttons visible | ⬜ Pass / ⬜ Fail | |
| 5.4 | After new chat, send a follow up like "What about the cable?" | AI has no memory of previous conversation | ⬜ Pass / ⬜ Fail | |

**Overall Test 5 result:** ⬜ Pass / ⬜ Fail  
**Notes:**

---

## Test 6 — Clear history button

**Objective:** Verify that the clear history button resets the conversation correctly.

| # | Action | Expected result | Result | Notes |
|---|--------|----------------|--------|-------|
| 6.1 | Click "Clear history" during a conversation | Chat resets to welcome state | ⬜ Pass / ⬜ Fail | |
| 6.2 | Verify backend history also cleared | New messages get no context from old conversation | ⬜ Pass / ⬜ Fail | |

**Overall Test 6 result:** ⬜ Pass / ⬜ Fail  
**Notes:**

---

## Test 7 — Typing indicator

**Objective:** Verify the typing indicator appears while waiting for a response and disappears when the response arrives.

| # | Action | Expected result | Result | Notes |
|---|--------|----------------|--------|-------|
| 7.1 | Send any message | Three dot typing indicator appears immediately | ⬜ Pass / ⬜ Fail | |
| 7.2 | Wait for response | Typing indicator disappears when response arrives | ⬜ Pass / ⬜ Fail | |
| 7.3 | Check send button while waiting | Button shows "Sending..." and is disabled | ⬜ Pass / ⬜ Fail | |

**Overall Test 7 result:** ⬜ Pass / ⬜ Fail  
**Notes:**

---

## Test 8 — Enter key to send

**Objective:** Verify that pressing Enter sends the message without needing to click the Send button.

| # | Action | Expected result | Result | Notes |
|---|--------|----------------|--------|-------|
| 8.1 | Type a message and press Enter | Message sends immediately | ⬜ Pass / ⬜ Fail | |
| 8.2 | Press Shift+Enter | New line added, message not sent | ⬜ Pass / ⬜ Fail | |

**Overall Test 8 result:** ⬜ Pass / ⬜ Fail  
**Notes:**

---

## Test 9 — Response quality assessment

**Objective:** Assess whether Claude's responses are appropriate for non-technical users.

| Criteria | Assessment | Notes |
|---------|-----------|-------|
| Plain English — no jargon | ⬜ Yes / ⬜ Sometimes / ⬜ No | |
| Clear numbered steps | ⬜ Yes / ⬜ Sometimes / ⬜ No | |
| Empathetic and encouraging tone | ⬜ Yes / ⬜ Sometimes / ⬜ No | |
| Responses are concise | ⬜ Yes / ⬜ Sometimes / ⬜ No | |
| Advice is accurate and safe | ⬜ Yes / ⬜ Sometimes / ⬜ No | |
| Suggests professional help when appropriate | ⬜ Yes / ⬜ Sometimes / ⬜ No | |

**Overall response quality:** ⬜ Excellent / ⬜ Good / ⬜ Needs improvement  
**Notes:**

---

## Test 10 — Edge cases

**Objective:** Verify the application handles unusual inputs gracefully.

| # | Test input | Expected result | Result | Notes |
|---|-----------|----------------|--------|-------|
| 10.1 | Send an empty message (just spaces) | No message sent or friendly error | ⬜ Pass / ⬜ Fail | |
| 10.2 | Send a very long message (100+ words) | Response received correctly | ⬜ Pass / ⬜ Fail | |
| 10.3 | Send a non-IT question e.g. "What is the weather?" | AI politely redirects to IT support | ⬜ Pass / ⬜ Fail | |
| 10.4 | Send special characters e.g. "!@£$%^&*()" | No crash, handled gracefully | ⬜ Pass / ⬜ Fail | |
| 10.5 | Send a question in a different language | Response returned without crashing | ⬜ Pass / ⬜ Fail | |

**Overall Test 10 result:** ⬜ Pass / ⬜ Fail  
**Notes:**

---

## Bugs found

| # | Description | Severity | Status |
|---|-------------|---------|--------|
| | | | |
| | | | |
| | | | |

**Severity guide:**
- 🔴 Critical — prevents core functionality
- 🟡 Medium — affects user experience but workaround exists
- 🟢 Minor — cosmetic or low impact issue

---

## Overall test summary

| Test | Description | Result |
|------|-------------|--------|
| Test 1 | Starter question buttons | ⬜ Pass / ⬜ Fail |
| Test 2 | Manual message input | ⬜ Pass / ⬜ Fail |
| Test 3 | Conversation history | ⬜ Pass / ⬜ Fail |
| Test 4 | That didn't work button | ⬜ Pass / ⬜ Fail |
| Test 5 | New chat button | ⬜ Pass / ⬜ Fail |
| Test 6 | Clear history button | ⬜ Pass / ⬜ Fail |
| Test 7 | Typing indicator | ⬜ Pass / ⬜ Fail |
| Test 8 | Enter key to send | ⬜ Pass / ⬜ Fail |
| Test 9 | Response quality | ⬜ Pass / ⬜ Fail |
| Test 10 | Edge cases | ⬜ Pass / ⬜ Fail |

**Total tests:** 10  
**Passed:** ___  
**Failed:** ___  
**Pass rate:** ___%

---

## Conclusions and recommendations

*(Fill in after testing is complete)*

---

## Sign off

**Tested by:** Ifzaal Yapp  
**Date:** 29 April 2026  
**Ready for deployment:** ⬜ Yes / ⬜ No — fixes required first

---

*Document created: 29 April 2026*  
*To be updated after each test session*