![StudySqueeze Logo](frontend/images/logo1.png)

## Overview

**StudySqueeze** is an advanced AI-powered study assistant that transforms your study materials into concise, exam-ready resources. Upload your notes (PDF, DOCX, PPTX), select a study mode, and receive tailored outputs such as summaries, mnemonics, analogies, cheat sheets, and more—all in a sleek, chat-like interface.

---

## Key Features

- **Multi-Mode Study Assistant:**  
  Choose from Quick Recap, Analogy, Exam Cram, Challenge, or Mnemonics modes for personalized learning.

- **Retrieval-Augmented Generation (RAG) Pipeline:**  
  Combines semantic search (ChromaDB + Sentence Transformers) with LLM-powered responses (OpenRouter/Gemini) for context-aware answers.

- **Robust File Upload:**  
  Supports PDF, DOCX, and PPTX formats for instant content extraction.

- **Modern Chat Interface:**  
  Responsive UI with chat bubbles, green spinner loader, and copy-to-clipboard functionality.

- **Smart Input:**  
  Auto-expanding, character-limited prompt box with live feedback.

- **Flexible Mode Selection:**  
  Intuitive cards for switching between study modes, allowing students to study in the way that suits them best.

---

## Technical Highlights

- **Frontend:**  
  - Built with HTML5, CSS3 (custom chat bubbles, responsive design, Poppins font)
  - JavaScript (Vite for fast development, Marked.js for Markdown rendering)

- **Backend:**  
  - FastAPI (Python) for high-performance APIs
  - ChromaDB for vector storage and semantic retrieval
  - Sentence Transformers for efficient text embeddings
  - OpenRouter API for LLM integration (supports Gemini, Llama, etc.)
  - PyMuPDF, python-docx, python-pptx for robust file parsing

- **RAG Pipeline:**  
  - Document parsing → Chunking → Embedding → Semantic retrieval → Prompt construction → LLM response

- **Security & Best Practices:**  
  - Environment variable management for API keys
  - CORS configuration
  - Modular, production-ready Python code structure

---

## Interface Examples

**File Upload:**  
`[ Drop your file here or browse ]`  
_Supports PDF, DOCX, PPTX_

**Mode Selection:**  
`[ Quick Recap ] [ Analogy ] [ Exam Cram ] [ Challenge ] [ Mnemonics ]`

**Chat Interface:**  
- User prompt box (auto-expanding, character-limited)
- Chat bubbles for Q&A
- Green spinner while loading
- Copy button for answers

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/agamyaaa14/StudySqueeze.git
cd StudySqueeze
```

### 2. Backend Setup

```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file in the `backend` directory and add your OpenRouter API key:

```
OPENROUTER_API_KEY=your_openrouter_key_here
```

Start the backend server:

```bash
uvicorn main:app --reload
```

### 3. Frontend Setup
Start a new terminal along with the backend.

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at [http://localhost:5173](http://localhost:5173).

---

## License

MIT License © 2025 Agamya David
