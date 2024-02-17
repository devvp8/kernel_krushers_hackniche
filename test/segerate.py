import re

def segerate(input_string):
    # print(input_string)
    # Define a regular expression pattern to match the program name and code
    pattern = r"```(\w+)\n([\s\S]+?)```"
    # Use re.search to find the match in the input_string
    match = re.search(pattern, input_string)
    if match:
        program_name = match.group(1)
        program_code = match.group(2)
        return program_name,program_code
    else:
        print("No match found.")
