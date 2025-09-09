from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import traceback

from utils import (
    extract_text_from_file,
    build_vector_store,
    query_openrouter_with_rag,
)

app = FastAPI(title="StudySqueeze Backend")

# CORS – allow your local dev + deployed frontends
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],           # tighten in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Welcome to StudySqueeze backend"}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...), prompt: str = Form(...), mode: str = Form("default")):
    try:
        file_bytes = await file.read()
        extracted_text = extract_text_from_file(file.filename, file_bytes)

        if "Unsupported file format" in extracted_text:
            return JSONResponse(content={"error": extracted_text}, status_code=400)

        vector_store = build_vector_store(extracted_text)
        result = query_openrouter_with_rag(prompt, vector_store, mode)

        # ✅ Always return JSON with "result"
        return JSONResponse(content={"result": result})

    except Exception as e:
        print("❌ Backend error:", str(e))
        return JSONResponse(content={"error": f"Server failed: {str(e)}"}, status_code=500)


"""
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging
from typing import Any

from utils import (
    extract_text_from_file,
    build_vector_store,
    query_openrouter_with_rag,
)

app = FastAPI(title="StudySqueeze Backend")

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("studysqueeze")

# CORS – allow your local dev + deployed frontends
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],           # tighten in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root() -> dict[str, str]:
    return {"message": "Welcome to StudySqueeze backend"}

@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}

def format_error_response(error: Exception) -> JSONResponse:
    logger.error("❌ Backend error: %s", str(error), exc_info=True)
    return JSONResponse(content={"error": f"Server failed: {str(error)}"}, status_code=500)

@app.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    prompt: str = Form(...),
    mode: str = Form("default")
) -> JSONResponse:
    try:
        file_bytes = await file.read()
        extracted_text = extract_text_from_file(file.filename, file_bytes)

        if "Unsupported file format" in extracted_text:
            return JSONResponse(content={"error": extracted_text}, status_code=400)

        vector_store = build_vector_store(extracted_text)
        result = query_openrouter_with_rag(prompt, vector_store, mode)

        return JSONResponse(content={"result": result})

    except Exception as e:
        return
"""