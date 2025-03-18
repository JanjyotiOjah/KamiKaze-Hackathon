import json
import ollama

def load_qna(file_path):
    """Load QnA pairs from a JSON file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)
            if isinstance(data, list) and all(isinstance(entry, dict) for entry in data):
                return data
            else:
                print(f"Error: JSON format in '{file_path}' is incorrect. Expected a list of dictionaries.")
                return None
    except FileNotFoundError:
        print(f"Error: File '{file_path}' not found.")
        return None
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON format in '{file_path}'.")
        return None

def evaluate_answer(question, ai_answer, student_answer):
    """Evaluate a student's answer against the AI-generated answer using Ollama Mistral."""
    prompt = f"""
    Evaluate the student's answer compared to the AI-provided answer.
    Provide:
    1. Accuracy (0-10)
    2. Context Understanding (0-10)
    3. Relevance (0-10)
    4. Completeness (0-10)
    5. Coherence & Grammar (0-10)
    6. Overall Score (0-10)
    7. How the student can improve.

    Question: {question}
    AI Answer: {ai_answer}
    Student Answer: {student_answer}

    Response format:
    {{
        "accuracy": <value>,
        "context": <value>,
        "relevance": <value>,
        "completeness": <value>,
        "coherence": <value>,
        "overall_score": <value>,
        "improvement_suggestions": "<text>"
    }}
    """

    response = ollama.chat(model="mistral", messages=[{"role": "user", "content": prompt}])
    
    try:
        result = json.loads(response['message']['content'])
    except (json.JSONDecodeError, KeyError):
        print("Error: Invalid response from Ollama. Returning default evaluation.")
        result = {
            "accuracy": 0,
            "context": 0,
            "relevance": 0,
            "completeness": 0,
            "coherence": 0,
            "overall_score": 0,
            "improvement_suggestions": "Could not process response."
        }

    return result

def evaluate_qna(ai_qna_path, student_qna_path):
    """Evaluate student answers against AI-generated answers."""
    ai_qna = load_qna(ai_qna_path)
    student_qna = load_qna(student_qna_path)

    if not ai_qna or not student_qna:
        print("Error: Could not load one or both QnA files.")
        return

    evaluation_results = []

    for ai_entry, student_entry in zip(ai_qna, student_qna):
        if ai_entry.get("question") != student_entry.get("question"):
            print(f"Warning: Mismatched question detected - {ai_entry.get('question')}")
            continue  # Skip if questions don't match
        
        question = ai_entry["question"]
        ai_answer = ai_entry["answer"]
        student_answer = student_entry["answer"]

        evaluation = evaluate_answer(question, ai_answer, student_answer)
        evaluation["question"] = question
        evaluation["student_answer"] = student_answer
        evaluation["ai_answer"] = ai_answer

        evaluation_results.append(evaluation)

    # Save evaluation results
    output_file = f"evaluation_{student_qna_path}"
    with open(output_file, "w", encoding="utf-8") as file:
        json.dump(evaluation_results, file, indent=4)

    print(f"Evaluation saved to {output_file}")

# Example usage:
evaluate_qna("qna_of_notes.json", "qna_of_notes[3].json")
