from PyPDF2 import PdfReader
import pytesseract
from pdf2image import convert_from_path
import time

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

if __name__ == "__main__":
    pdf_path = input("Enter the path of the PDF file: ")
    extracted_text = extract_text_from_pdf(pdf_path)
    with open(f"{pdf_path}_extracted.txt", "w", encoding="utf-8") as file:
        file.write(extracted_text)
    print("Extracted text saved to notes.txt")

time.sleep(10)

import ollama
import os
import json

def read_text_file(file_path):
    """Read the content of a text file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            return file.read()
    except FileNotFoundError:
        print(f"Error: File '{file_path}' not found.")
        return None

def generate_questions(text):
    """Generate structured question-answer pairs using Mistral-7B via Ollama."""
    teacher_ip = input("Additional Remarks: ")
    prompt = f"{teacher_ip} Read the following text and generate question-answer pairs in JSON format. The output must be a valid JSON array:\n\n{text}\n\nExample Output:\n[{{'question': 'What is AI?', 'answer': 'AI stands for Artificial Intelligence.'}}]"
    
    response = ollama.chat(model="mistral", messages=[{"role": "user", "content": prompt}])
    
    try:
        return json.loads(response["message"]["content"])  
    except json.JSONDecodeError:
        print("Error: Failed to parse JSON output from the model.")
        return []

def save_to_json(qa_pairs, file_path):
    """Save structured QnA pairs to a JSON file with proper formatting."""
    if not qa_pairs:
        print("No questions generated, skipping file save.")
        return
    
    base_name = os.path.splitext(os.path.basename(file_path))[0]
    output_filename = f"qna_of_{base_name}.json"
    
    with open(output_filename, 'w', encoding='utf-8') as json_file:
        json.dump(qa_pairs, json_file, indent=4, ensure_ascii=False)
    
    print(f"QnA pairs saved to {output_filename}")

def main(file_path):
    text = read_text_file(file_path)
    if not text:
        return
    
    qa_pairs = generate_questions(text)
    print("Generated Question-Answer Pairs:\n", json.dumps(qa_pairs, indent=4))
    save_to_json(qa_pairs, file_path)


file_path = f"{pdf_path}_extracted.txt" 
main(file_path)
