from transformers import pipeline
import os

def read_text_file(file_path):
    """Read the content of a text file."""
    if not os.path.exists(file_path):
        print(f"Error: File '{file_path}' not found.")
        return None
    
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()

def generate_questions(text, model_name="mrm8488/t5-base-finetuned-question-generation-ap"):
    """Generate questions from the given text."""
    try:
        question_generator = pipeline("text2text-generation", model=model_name)
        formatted_text = "generate questions: " + text
        questions = question_generator(formatted_text, max_length=100, num_return_sequences=5)
        return [q['generated_text'] for q in questions] if questions else []
    except Exception as e:
        print(f"Error generating questions: {e}")
        return []

def answer_questions(questions, text, model_name="deepset/roberta-base-squad2"):
    """Answer generated questions using a QA model."""
    if not questions:
        print("No questions generated.")
        return {}
    
    try:
        qa_pipeline = pipeline("question-answering", model=model_name)
        answers = {}
        for question in questions:
            answer = qa_pipeline({"question": question, "context": text})
            answers[question] = answer.get("answer", "No answer found")
        return answers
    except Exception as e:
        print(f"Error answering questions: {e}")
        return {}

def main(file_path):
    text = read_text_file(file_path)
    if not text:
        return
    
    questions = generate_questions(text)
    if not questions:
        print("No questions were generated. Please check the input text.")
        return
    
    qa_pairs = answer_questions(questions, text)
    
    print("Generated Question-Answer Pairs:")
    for q, a in qa_pairs.items():
        print(f"Q: {q}\nA: {a}\n")

# Example usage
file_path = "notes.txt"  # Replace with your actual file path
main(file_path)