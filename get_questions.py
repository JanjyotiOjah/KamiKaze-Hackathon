from openai import OpenAI
from OpenAI_api_key import openai_api_key

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
  api_key= openai_api_key,
)

topics = ['Pre-emptive SJF', 'Non-preemptive SJF', 'Priority scheduling', 'Blocking', 'Round Robin.']
type_of_questions = [5,6,3] # 5 mcqs, 6-3 marks question and 3-5 marks question

def get_question_papers(topics,type_of_questions):
    prompt = f"""
    You are an AI assistant. Your task is to generate three unique question papers based on the given topics from multiple PDFs on Operating Systems (college level). 

    **Instructions:**  
    1. Each question paper should include a mix of the specified question types.  
    2. Structure the question papers properly with sections for each type of question.  
    3. Ensure variety in the questions across the three papers while maintaining relevance to the topics.  
    4. Format the papers in a clear and organized manner.  
    5. Do not provide answers for the Multiple Choice Questions (MCQs).

    **Topics:**  
    {topics}  

    **Question Distribution:**  
    - Multiple Choice Questions (MCQs): {type_of_questions[0]}  
    - Short Answer Questions (3 Marks): {type_of_questions[1]}  
    - Long Answer Questions (5 Marks): {type_of_questions[2]}  

    **Output Format:**  
    - Each question paper should be numbered and formatted clearly.  
    - Questions should be categorized under appropriate sections.  
    - Ensure readability and logical flow.

    Generate the question papers accordingly.
    """

    convo = client.chat.completions.create(
        model="openchat/openchat-7b:free",
        messages=[{"role": "system", "content": prompt}],
        temperature=1,
    )
    
    output = convo.choices[0].message.content.strip()

    papers = output.split("Question Paper")[1:]  

    paper_1 = "Question Paper" + papers[0].strip()
    paper_2 = "Question Paper" + papers[1].strip()
    paper_3 = "Question Paper" + papers[2].strip()

    return paper_1,paper_2,paper_3


p1,p2,p3 = data_from_pdf(topics,type_of_questions)

print(p1)
print(p2)
print(p3)
