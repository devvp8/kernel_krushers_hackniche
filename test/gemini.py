import google.generativeai as genai
from dotenv import load_dotenv
from segerate import segerate
import os
import json
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
generation_config = {
    "temperature": 0.9,
    "top_p": 1,
    "top_k": 1,
    "max_output_tokens": 3000,
}
safety_settings = [
    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE",
    },
]
model = genai.GenerativeModel(
    model_name="gemini-1.0-pro",
    generation_config=generation_config,
    safety_settings=safety_settings,
)

schema = """"
{
    "tables": [
        {
            "name": "Student",
            "attributes": [
                {
                    "name": "id",
                    "keyType": "primary",
                    "dataType": "number",
                    "referenceTable": ""
                },
                {
                    "name": "name",
                    "keyType": "",
                    "dataType": "string",
                    "referenceTable": ""
                }
            ]
        },
        {
            "name": "Marks",
            "attributes": [
                {
                    "name": "sid",
                    "keyType": "foreign",
                    "dataType": "number",
                    "referenceTable": "Student"
                },
                {
                    "name": "marks",
                    "keyType": "",
                    "dataType": "number",
                    "referenceTable": ""
                }
            ]
        }
    ]
}
"""
language = "javascript"
database = "nosql"
prompt = "retrieve records of student name of computer department having marks greater than 100"
convo = model.start_chat(history=[])
res = convo.send_message(
    f"""
{schema}
Give a function in {language} to {prompt}  in {database} 
""",
    stream=True,
)

response = ""
for chunk in res:
    response += chunk.text
q_name, q_code = segerate(response)
result = {"language": q_name, "code": q_code}
json_result = json.dumps(result, indent=2)
print(json_result)

res = convo.send_message(
    "give me just sample input data object for the previous code you provided",
    stream=True,
)
response2 = ""
for chunk in res:
    response2 += chunk.text
# print(response2)
q_name, q_code = segerate(response2)
result = {"language": q_name, "input_data": q_code}
json_result = json.dumps(result, indent=2)
print(json_result)

res = convo.send_message(
    "give me sample output data for the previous code you provided",
    stream=True,
)
response3 = ""
for chunk in res:
    response3 += chunk.text
# print(response3)
o_name, o_code = segerate(response3)
result = {"language": o_name, "output_data": o_code}
json_result = json.dumps(result, indent=2)
print(json_result)