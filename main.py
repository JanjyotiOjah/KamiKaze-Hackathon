from fastapi import FastAPI, UploadFile, Form
import json
import os
from PyPDF2 import PdfReader
import pytesseract
from pdf2image import convert_from_path
import ollama
from starlette.responses import JSONResponse

app = FastAPI()

def extract_text_from_pdf(pdf_path):
    text = ""
    reader = PdfReader(pdf_path)
    
    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text + "\n"
    
    if not text:
        images = convert_from_path(pdf_path)
        for img in images:
            text += pytesseract.image_to_string(img) + "\n"
    
    return text

def generate_qna(text, teacher_remark, iteration):
    prompt = f"""
    You are an AI that extracts **all possible** question-answer pairs from a given text.
    This is **Iteration {iteration}/3**, ensure that:
    - You focus on missed details from previous runs.
    - Questions cover every key aspect of the text.
    - Answers are **concise yet accurate**.
    - Output must be a **list of dictionaries** with 'question' and 'answer' keys.

    Text: {text}

    Additional Instructions from Teacher: {teacher_remark}

    Provide the output in JSON format like:
    [
        {{"question": "What is ...?", "answer": "It is ..."}},
        {{"question": "How does ... work?", "answer": "It works by ..."}}
    ]
    """
    try:
        response = ollama.chat(model='mistral', messages=[{"role": "user", "content": prompt}])
        qna_data = json.loads(response['message']['content'])
        return qna_data if isinstance(qna_data, list) else []
    except Exception as e:
        return {"error": f"Error generating Q&A: {e}"}

@app.post("/generate-qna/")
async def generate_qna_api(pdf: UploadFile, teacher_remark: str = Form("")):
    pdf_path = f"temp_{pdf.filename}"
    with open(pdf_path, "wb") as f:
        f.write(pdf.file.read())

    text = extract_text_from_pdf(pdf_path)
    if not text.strip():
        return JSONResponse(content={"error": "No text extracted from the PDF"}, status_code=400)

    all_qna = []
    for iteration in range(1, 4):
        qna_data = generate_qna(text, teacher_remark, iteration)
        all_qna.extend(qna_data)
    
    os.remove(pdf_path)  # Cleanup
    return {"qna_pairs": all_qna}
