code_summary_prompt = """
Create a summary of the project based on the code.
List how much Time Requirement, Difficulty, and Readability of the code.
Be very critical, pessimistic, and classify without bias. DO NOT OVERLOOK ANY DETAILS. Be very strict and thorough
"""

code_scoring_prompt = """
Project Summary : {ideasummary}

Code Summary : {codesummary}

Parameter 1: Code Time Requirement:

1: Code is very complex.
2: Code is complex.
3: Code is moderately complex.
4: Code is simple.
5: Code is very simple.

Parameter 2: Difficulty of Code:

1: Code is very difficult to understand.
2: Code is difficult to understand.
3: Code is moderately difficult to understand.
4: Code is easy to understand.
5: Code is very easy to understand.

Parameter 3: Code Readability:

1: Code is not at all readable.
2: Code is not readable.
3: Code is moderately readable.
4: Code is readable.
5: Code is easily readable.


Task: Classify project into one category for each parameter and Give an explanation for why it belongs/does not belong to each category using the code summary only?
Rule: Be extremely critical, pessimistic, and classify without bias. DO NOT OVERLOOK ANY DETAILS. Be very strict and thorough 
{format_instructions}
"""

categories_rubric = ["Poor", "Limited", "Adequate", "Strong", "Exceptional"]