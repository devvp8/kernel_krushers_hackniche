from openai import OpenAI
from dotenv import load_dotenv
import os
load_dotenv()

print()
client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
)
assistant = client.beta.assistants.create(
    name="Code_generator",
    instructions="You are a personal function code generator. Understand user's problem and give the user for the code for it in python",
    tools=[{"type": "code_interpreter"}],
    model="gpt-3.5-turbo-1106",
)
thread = client.beta.threads.create()
message = client.beta.threads.messages.create(
    thread_id=thread.id,
    role="user",
    content="write a program to implemnet merge sort",
)
print(message)
run = client.beta.threads.runs.create(
    thread_id=thread.id,
    assistant_id=assistant.id,
    instructions="Please address the problem of user and give the code to it",
)
run = client.beta.threads.runs.retrieve(thread_id=thread.id, run_id=run.id)
messages = client.beta.threads.messages.list(thread_id=thread.id)

print(messages)