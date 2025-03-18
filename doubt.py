from openai import OpenAI
from OpenAI_api_key import openai_api_key

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
  api_key= openai_api_key,
)


def doubt_solver(student_class,subject_name,student_doubt):
    prompt = f"""
    You are a doubt-solving AI assistant. Given the student's current standard (class) and subject name, your task is to provide simple, easy-to-understand answers to their doubts. Focus on clear explanations and real-world examples to make concepts easier to grasp.
    **Instructions:**
    1. Try to answer it in around 5-6 lines and add an example(if possible)

    Input:
    - Standard: {student_class}
    - Subject: {subject_name}
    - Doubt: {student_doubt}

    Provide output in this format:
    Answer: <Very simple and clear explanation with examples if needed>
    """


    convo = client.chat.completions.create(
        model="openchat/openchat-7b:free",
        messages=[{"role": "system", "content": prompt}],
        temperature=1,
    )
    
    output = convo.choices[0].message.content.strip()

    return output

answer = doubt_solver("9","evaporation","why does evaporation leads to rain")
print(answer)