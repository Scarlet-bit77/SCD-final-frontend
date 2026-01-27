

 // --- DOM Elements for AI Side Panel ---
const aiPanel = document.getElementById("ai-side-panel");

const aiOverlay = document.getElementById("ai-panel-overlay");
const mContainer = document.getElementById("ai-panel-messages");
const cInput = document.getElementById("ai-panel-input");
const sButton = document.getElementById("ai-panel-send-btn");
const CloseBtn = document.getElementById("ai-panel-close");

// --- Conversation history for AI side panel ---
let aiConversationHistory = [];

// --- Open/Close Panel ---
const aiBtns = document.querySelectorAll(".AI_Assistant");

aiBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        aiPanel.classList.toggle("open");
        aiOverlay.classList.toggle("active");
        cInput.focus();
    });
});
CloseBtn.addEventListener("click", closePanel);
aiOverlay.addEventListener("click", closePanel);

function closePanel() {
    aiPanel.classList.remove("open");
    aiOverlay.classList.remove("active");
}

// --- Add Message Function ---
function addMessage(text, isUser) {
    const welcomeMsg = mContainer.querySelector('.ai-welcome-message');
    if (welcomeMsg) welcomeMsg.remove();

    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-panel-message ${isUser ? 'user' : 'assistant'}`;
    messageDiv.textContent = text;
    mContainer.appendChild(messageDiv);

    const clearDiv = document.createElement('div');
    clearDiv.style.clear = 'both';
    mContainer.appendChild(clearDiv);

    mContainer.scrollTop = mContainer.scrollHeight;
}

// --- Typing Indicator ---
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'ai-typing-indicator';
    typingDiv.id = 'ai-typing';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    mContainer.appendChild(typingDiv);

    const clearDiv = document.createElement('div');
    clearDiv.style.clear = 'both';
    mContainer.appendChild(clearDiv);

    mContainer.scrollTop = mContainer.scrollHeight;
}

function removeTypingIndicator() {
    const typingIndicator = document.getElementById('ai-typing');
    if (typingIndicator) typingIndicator.remove();
}

// --- Send Message Function (calls Gemini AI backend) ---
async function sendMessage() {
    const message = cInput.value.trim();
    if (!message) return;

    // Display user message
    addMessage(message, true);
    cInput.value = '';

    // Add to history
    aiConversationHistory.push({ role: 'user', content: message });

    // Show typing
    showTypingIndicator();

    try {
        const response = await fetch('http://localhost:3000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: aiConversationHistory })
        });

        const data = await response.json();
        removeTypingIndicator();

        if (data.error) {
            addMessage(`Error: ${data.error}`, false);
            aiConversationHistory.pop();
            return;
        }

        const aiReply = data.reply;
        addMessage(aiReply, false);
        aiConversationHistory.push({ role: 'assistant', content: aiReply });

    } catch (err) {
        removeTypingIndicator();
        addMessage("Sorry, the server is unreachable.", false);
        aiConversationHistory.pop();
        console.error(err);
    }
}

// --- Quick Message Function ---
function sendQuickMessage(message) {
    cInput.value = message;
    sendMessage();
}

// --- Event Listeners ---
sButton.addEventListener("click", sendMessage);
cInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
    }
});

// --- Escape key closes panel ---
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && aiPanel.classList.contains('open')) {
        closePanel();
    }
});