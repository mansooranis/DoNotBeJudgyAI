# DoNotBeJudgyAI
## Inspiration
Upon careful reflection and a thorough examination of the hackathon rubric, project inspiration came to us. We empathized with the demanding task faced by judges who invest significant time and effort in evaluating numerous projects. In response to this challenge, we conceived DoNotBeJudgyAI. DoNotBeJudgyAI is a groundbreaking solution designed to streamline and alleviate the burdensome responsibilities of project evaluation. Our goal is to revolutionize the judging experience, making it more efficient, less stressful, and ultimately enhancing the overall hackathon experience for both participants and judges.

## What it does
DoNotBeJudgyAI is capable of meticulously analyzing and evaluating either the complete DevPost Hackathon project gallery or individual projects. DoNotBeJudgyAI delivers comprehensive judgment information, including:

-Project Summary: A concise overview capturing the essence of the project.

-Marketability Assessment: An insightful evaluation of the project's potential appeal in the market that includes multiple categories, including market relevance, market demand, revenue generation, scalability, customer base, and long-term viability.

-Uniqueness Analysis: A thorough examination of the project's distinctive features and contributions. The project's novelty, problem-solving ability, and impact. DoNotBeJudgyAI also searches online for any similar projects and presents them in a list format. 

DoNotBeJudgyAI also has a sophisticated chatbot feature, enabling users to inquire about the project's GitHub repository codebase and receive real-time responses. The platform assigns ratings on a scale of 1 to 5 across various categories, and provides an overall score that serves as an overall measure of the project's excellence and innovation.

## How we built it
**Technical Details:**

- Utilizes language processing through LangChain and employs OpenAI models including ChatGPT 3.5-turbo, with customized prompts.
- Incorporates advanced code understanding techniques to enhance project analysis.

**Backend:**

- Developed using Flask in Python.
- Backend seamlessly integrated with Chroma DB.

**Frontend:**

- Built with React to create a user-friendly and dynamic interface.
- Contributes to a seamless and engaging user experience.

## Challenges we ran into
We encountered challenges related to the time required for the AI to generate judgments and determining the optimal way to display all categories on the website.

## Accomplishments that we're proud of
We are proud of DoNotBeJudgyAI's ability to extract data from DevPost and create judgements about each project. We are also proud of our chatbot which is able to analyze a project's codebase from the linked Github repo.

## What we learned
We learned a lot about large language models and React.

## What's next for DoNotBeJudgyAI
DoNotBeJudgyAI will be expanded in the future to be able to provide unbiased judgments for all kinds of competitions!
