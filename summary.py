import pdfplumber
from openai import OpenAI
from OpenAI_api_key import openai_api_key

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
  api_key= openai_api_key,
)

def extract_text(pdf_path):
    with pdfplumber.open(pdf_path) as pdf:
        text = "\n".join([page.extract_text() for page in pdf.pages if page.extract_text()])
    return text

def data_from_pdf(extracted_text):
    prompt = f"""
    You are an AI assistant. Given the following text from a PDF about Operating Systems, perform two tasks:
    1. Summarize the content.
    2. List key subject topics covered in the text.

    Text: {extracted_text}

    Provide output in this format:
    Summary: <detailed summary>
    Topics: <Comma-separated list of 5 key topics>
    """

    convo = client.chat.completions.create(
        model="openchat/openchat-7b:free",
        messages=[{"role": "system", "content": prompt}],
        temperature=1,
    )
    
    output = convo.choices[0].message.content.strip()
    summary = output.split("Summary: ")[1].split("Topics: ")[0].strip()
    topics = output.split("Topics: ")[1].strip().split(",")
    topics = [topic.strip() for topic in topics]

    return summary,topics

def main(pdf):
    text = extract_text(pdf)
    summary, topics = data_from_pdf(text)
    print("Summary : ",summary)
    print("\nTopics : ",topics)

main("D:\\python_lib\\os_class14.pdf")