// App State
let uploadedFile = null;
let selectedMode = null;

// DOM Elements
const splashScreen = document.getElementById('splashScreen');
const mainApp = document.getElementById('mainApp');
const getStartedBtn = document.getElementById('getStartedBtn');
const fileUploadArea = document.getElementById('fileUploadArea');
const fileInput = document.getElementById('fileInput');
const selectedFile = document.getElementById('selectedFile');
const fileName = document.getElementById('fileName');
const removeFile = document.getElementById('removeFile');
const promptInput = document.getElementById('promptInput');
const submitBtn = document.getElementById('submitBtn');
const responseArea = document.getElementById('responseArea');
const spinner = document.getElementById('spinner');
const messageContent = document.getElementById('messageContent');
const copyBtn = document.getElementById('copyBtn');
const charCount = document.getElementById('charCount');
const MAX_PROMPT_LENGTH = 500;

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    updateSubmitButtonState();
});

function initializeEventListeners() {
    getStartedBtn.addEventListener('click', showMainApp);
    fileUploadArea.addEventListener('click', () => fileInput.click());
    fileUploadArea.addEventListener('dragover', handleDragOver);
    fileUploadArea.addEventListener('dragleave', handleDragLeave);
    fileUploadArea.addEventListener('drop', handleFileDrop);
    fileInput.addEventListener('change', handleFileSelect);
    removeFile.addEventListener('click', clearSelectedFile);
    submitBtn.addEventListener('click', handleSubmit);
    promptInput.addEventListener('input', updateSubmitButtonState);
    promptInput.addEventListener('keydown', handleKeyDown);
    copyBtn.addEventListener('click', copyToClipboard);

    // Mode selection
    document.querySelectorAll(".mode-card").forEach(card => {
        card.addEventListener("click", () => selectMode(card));
    });
    document.getElementById("change-mode").addEventListener("click", resetModeSelection);
}

function showMainApp() {
    splashScreen.style.display = 'none';
    mainApp.classList.remove('hidden');
    document.title = 'StudySqueeze - Upload & Ask';
}

// File Upload Handlers
function handleDragOver(e) {
    e.preventDefault();
    fileUploadArea.classList.add('drag-over');
}

function handleDragLeave(e) {
    e.preventDefault();
    fileUploadArea.classList.remove('drag-over');
}

function handleFileDrop(e) {
    e.preventDefault();
    fileUploadArea.classList.remove('drag-over');
    const files = e.dataTransfer.files;
    if (files.length > 0) handleFileSelection(files[0]);
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) handleFileSelection(file);
}

function handleFileSelection(file) {
    const allowedTypes = ['.pdf', '.docx', '.pptx'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(fileExtension)) {
        displayError('Please upload a PDF, DOCX, or PPTX file.');
        return;
    }
    if (file.size > maxSize) {
        displayError('File size must be less than 10MB.');
        return;
    }

    uploadedFile = file;
    fileName.textContent = file.name;
    selectedFile.style.display = 'flex';
    fileUploadArea.style.display = 'none';
    updateSubmitButtonState();
}

function clearSelectedFile() {
    uploadedFile = null;
    selectedFile.style.display = 'none';
    fileUploadArea.style.display = 'block';
    fileInput.value = '';
    updateSubmitButtonState();
}

function updateSubmitButtonState() {
    submitBtn.disabled = !(uploadedFile && promptInput.value.trim().length > 0);
}

function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey && !submitBtn.disabled) {
        e.preventDefault();
        handleSubmit();
    }
}

// Spinner Controls
function showSpinner() {
    spinner.classList.remove('hidden');
    responseArea.classList.remove('hidden');
}

function hideSpinner() {
    spinner.classList.add('hidden');
}

// Output Formatting (Chat-like)
function displayResponse(response) {
    // Clear previous content
    messageContent.innerHTML = "";

    // Create chat bubble for AI response
    const aiBubble = document.createElement('div');
    aiBubble.className = 'chat-message';
    aiBubble.innerHTML = response.content;
    messageContent.appendChild(aiBubble);

    responseArea.classList.remove('hidden');
    responseArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function displayUserPrompt(prompt) {
    // Create chat bubble for user prompt
    const userBubble = document.createElement('div');
    userBubble.className = 'chat-message user';
    userBubble.innerHTML = marked.parse(prompt);
    messageContent.appendChild(userBubble);
}

const chatArea = document.getElementById('chatArea');
function displayResponse(response) {
    // Create chat bubble for AI response
    const aiBubble = document.createElement('div');
    aiBubble.className = 'chat-message';
    aiBubble.innerHTML = response.content;
    chatArea.appendChild(aiBubble);

    responseArea.classList.remove('hidden');
    responseArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function autoResizePrompt() {
    promptInput.style.height = 'auto';
    promptInput.style.height = promptInput.scrollHeight + 'px';
}

function updateCharCount() {
    const length = promptInput.value.length;
    charCount.textContent = `${length}/${MAX_PROMPT_LENGTH}`;
    if (length >= MAX_PROMPT_LENGTH) {
        charCount.classList.add('exceeded');
        charCount.textContent += " (Limit exceeded!)";
        displayError("Your question is too long. Please keep it under 300 characters.");
        submitBtn.disabled = true;
    } else {
        charCount.classList.remove('exceeded');
    }
}
promptInput.addEventListener('input', () => {
    updateSubmitButtonState();
    autoResizePrompt();
    updateCharCount();
});

function displayError(errorMessage) {
    messageContent.innerHTML = `
        <div style="color: #e74c3c; padding: 1rem; background: #ffeaea; border-radius: 8px; border-left: 4px solid #e74c3c;">
            <strong>Error:</strong> ${errorMessage}
        </div>
    `;
    responseArea.classList.remove('hidden');
    responseArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Form Submission
async function handleSubmit() {
    if (submitBtn.disabled) return;
    const prompt = promptInput.value.trim();
    if (!uploadedFile || !prompt) return;

    chatArea.innerHTML = "";

    showSpinner();
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
        const formData = new FormData();
        formData.append('file', uploadedFile);
        formData.append('prompt', prompt);
        formData.append('mode', selectedMode || 'default');

        const response = await fetch("/upload", {
            method: "POST",
            body: formData,
        });

        hideSpinner();

        if (!response.ok) throw new Error('Failed to process');
        const data = await response.json();

        if (data.error) {
            displayError(data.error);
        } else if (data.result) {
            displayResponse({ content: marked.parse(data.result) });
        } else {
            displayError("⚠️ Unexpected response format from server.");
        }
    } catch (error) {
        hideSpinner();
        displayError('Sorry, there was an error processing your request. Please try again.');
    } finally {
        submitBtn.classList.remove('loading');
        updateSubmitButtonState();
    }
}

// Copy to Clipboard
async function copyToClipboard() {
    try {
        await navigator.clipboard.writeText(messageContent.innerText);
        showCopyFeedback();
    } catch (error) {
        fallbackCopy();
        showCopyFeedback();
    }
}

function showCopyFeedback() {
    const originalText = copyBtn.textContent;
    copyBtn.textContent = 'Copied!';
    copyBtn.style.background = 'rgba(255, 255, 255, 0.4)';
    setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.background = 'rgba(255, 255, 255, 0.2)';
    }, 2000);
}

function fallbackCopy() {
    const textArea = document.createElement('textarea');
    textArea.value = messageContent.innerText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
}

// Mode Selection
function selectMode(card) {
    selectedMode = card.dataset.mode;
    document.getElementById("mode-selection").style.display = "none";
    const chosenCard = card.cloneNode(true);
    document.querySelector(".chosen-card").innerHTML = "";
    document.querySelector(".chosen-card").appendChild(chosenCard);
    document.getElementById("chosen-mode").style.display = "block";
}

function resetModeSelection() {
    document.getElementById("chosen-mode").style.display = "none";
    document.getElementById("mode-selection").style.display = "flex";
    selectedMode = null;
}

// Utility Functions
function getUploadedFile() { return uploadedFile; }
function getCurrentPrompt() { return promptInput.value.trim(); }
function clearForm() {
    clearSelectedFile();
    promptInput.value = '';
    responseArea.classList.add('hidden');
    updateSubmitButtonState();
}

// Export functions for external API integration
window.StudySqueeze = {
    getUploadedFile,
    getCurrentPrompt,
    clearForm,
    displayResponse,
    displayError
};

