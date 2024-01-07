originality_scoring_prompt = """
    Competitive analysis and project differentiation: 
    {similartools}

    This is project description : {ideasummary}
    Originality Scoring Rubric:

    Parameter 1 : Novelty :

    1: Offers no new concepts or methods.
    2: Introduces minor variations on existing concepts.
    3: Presents some new elements not widely explored.
    4: Introduces novel approaches and techniques.
    5: Presents entirely new and groundbreaking concepts.

    Parameter 2 : Problem-Solving :

    1: Ineffective at solving the problem.
    2: Offers limited improvement over existing solutions.
    3: Provides noticeable improvements in addressing the problem.
    4: Effectively addresses the problem with innovative methods.
    5: Solves the problem in unexpected and transformative ways.

    Parameter 3 : Impact :

    1: Minimal impact on the field or industry.
    2: Offers slight improvements with limited industry impact.
    3: Has the potential to cause moderate changes in the industry.
    4: Could lead to significant shifts or improvements.
    5: Has the potential to completely transform the industry.

    Task: Where does this project belong? Give an explanation for why it belongs/does not belong to each category?
    Rule: Be critical, and judge without bias. DO NOT OVERLOOK ANY DETAILS.
    {format_instructions}

"""


similar_tools_prompt = """
            Project description:  {description}
            Task: Identify specific direct and indirect competitors of the project mentioned above, avoiding generic or broad categories.
            Output Format: 
            {format_instructions}
            """


categories_rubric = ["Poor", "Limited", "Adequate", "Strong", "Exceptional"]