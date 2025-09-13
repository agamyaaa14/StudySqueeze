![StudySqueeze Logo](frontend/images/logo1.png)

StudySqueeze is an advanced AI-powered study assistant that transforms bulky study materials into **exam-ready resources**. Simply upload your notes (PDF, DOCX, PPTX), select a study mode, and receive **tailored outputs** like summaries, mnemonics, analogies, and cheat sheets—all delivered in a sleek, chat-like interface.

---

## Key Features

-   **Multi-Format File Support** – Upload PDFs, DOCX, and PPTX files for instant parsing.
-   **Retrieval-Augmented Generation (RAG)** – Combines **ChromaDB semantic search** with **LLM-powered responses** for context-aware answers.
-   **Dynamic Study Modes** – Choose from various modes like Quick Recap, Analogy, Exam Cram, Challenge Me, and Mnemonics to match your learning style.
-   **Modern Chat Interface** – Features an auto-expanding input box, a clean loading spinner, and a one-click copy-to-clipboard button.
-   **Fast & Asynchronous** – Built with a FastAPI backend and a JS frontend for a lightweight and responsive user experience.

---

## Tech Stack

-   **Frontend**:
    -   HTML5, CSS3, Vanilla JavaScript
    -   **Vite** for a blazing-fast development environment.
    -   **Marked.js** for rendering rich Markdown in AI responses.

-   **Backend**:
    -   **FastAPI** (Python) for high-performance, asynchronous API endpoints.
    -   **ChromaDB** for efficient in-memory vector storage and retrieval.
    -   **Sentence Transformers** (`all-MiniLM-L6-v2`) for creating text embeddings.
    -   **OpenRouter API** to leverage powerful models like Llama 3 for generation.
    -   **Document Parsers**: `PyMuPDF`, `python-docx`, `python-pptx`.


---


## How It Works

StudySqueeze uses a **Retrieval-Augmented Generation (RAG)** pipeline to provide answers that are grounded in your uploaded document. This ensures accuracy and relevance.

1.  **File Upload & Parsing**: When you upload a document (`PDF`, `DOCX`, `PPTX`), the backend extracts the raw text content.

2.  **Text Chunking**: The extracted text is broken down into smaller, manageable chunks. This allows the system to find specific, relevant passages.

3.  **Embedding & Indexing**: Each chunk is converted into a numerical representation (an embedding) using the `all-MiniLM-L6-v2` model. These embeddings are then stored in a **ChromaDB** vector database, creating a searchable index of your document's content.

4.  **Semantic Search**: When you ask a question, your query is also converted into an embedding. The system then searches the ChromaDB database to find the text chunks with the most similar embeddings (i.e., the most semantically relevant context).

5.  **LLM Augmentation**: The most relevant text chunks are combined with your original question and a system prompt, then sent to a powerful Large Language Model (LLM) via **OpenRouter**.

6.  **Grounded Response**: The LLM generates a comprehensive answer based *only* on the context provided from your document, which is then streamed back to the user interface.


---

## Demo Video
See StudySqueeze in action. The video below provides a complete walkthrough of the interface, from uploading a document to generating an AI-powered response using different study modes.

[Watch the Project Demo](https://www.loom.com/share/79ff286b4f3d4973b10c95a8b08c424a?sid=1a467a43-ac39-4d4d-beb5-2c73c9dead1e)

![StudySqueeze Logo](frontend/images/logo4-nobg.png)

---

## Getting Started

Follow these steps to get StudySqueeze running on your local machine.

### 1\. Clone the Repository

```bash
git clone https://github.com/agamyaaa14/StudySqueeze.git
cd StudySqueeze
```

### 2\. Set Up the Backend

The backend server handles file processing and AI interaction.

Navigate to the backend directory
```bash
cd backend
```

Create and activate a virtual environment
```bash
python -m venv venv
venv\Scripts\activate
```

Install the required Python packages
```bash
pip install -r requirements.txt
```

Create a .env file for your API key
```bash
OPENROUTER_API_KEY="your_openrouter_api_key_here"
```

### 3\. Set Up the Frontend

The frontend is a lightweight client built with Vite.

```bash
# Navigate to the frontend directory from the project root
cd frontend

# Install the necessary npm packages
npm install
```

### 4\. Run the Application

You need to run both the backend and frontend servers in two separate terminals.

  - **Terminal 1: Start the Backend (FastAPI)**

    ```bash
    # From the 'backend' directory
    uvicorn main:app --reload
    ```

    The backend will be running at `http://127.0.0.1:8000`.

  - **Terminal 2: Start the Frontend (Vite)**

    ```bash
    # From the 'frontend' directory
    npm run dev
    ```

    The frontend will be available at `http://localhost:5173`. Open this URL in your browser to use the app.

-----

## Project Structure

```
StudySqueeze/
│
├── backend/
│   ├── main.py              # FastAPI application logic and endpoints
│   ├── utils.py             # File parsing, embeddings, and RAG logic
│   ├── requirements.txt     # Python dependencies
│   └── .env                 # API keys (ignored by git)
│
├── frontend/
│   ├── index.html           # Main HTML file
│   ├── script.js            # Frontend logic (API calls, DOM manipulation)
│   ├── style.css            # Styling and layout
│   ├── package.json         # Node.js dependencies
│   └── vite.config.js       # Vite configuration
│
└── README.md
```

-----

## License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.
© 2025 Agamya David

```
