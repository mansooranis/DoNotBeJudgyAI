from git import Repo
from os import remove, getcwd, path
from shutil import rmtree
from langchain.text_splitter import Language
from langchain_community.document_loaders.generic import GenericLoader
from langchain_community.document_loaders.parsers import LanguageParser
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings.openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from llm import LLMModels
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationSummaryMemory
from langchain.prompts import PromptTemplate
from langchain.output_parsers import OutputFixingParser
from langchain.output_parsers import PydanticOutputParser

from .parsers import MetricList
from .prompts import code_scoring_prompt, categories_rubric, code_summary_prompt

PATH_TO_CODE_REPO = 'code-repo-to-analyze'
FOLDERS_TO_REMOVE = [
    "node_modules",
    "dist",
    "env",
    "build",
    "static",
    "public",
    "assets",
    "tests",
    "test",
    "docs",
    "media",
    "gradle",
    "bin",
    "__pycache__",
]
FILES_TO_REMOVE = [
    "package-lock.json",
    "yarn.lock",
]

ALLOWED_SUFFEXIS = [
    ".py",
    ".cpp",
    ".c",
    ".java",
    ".js",
    ".html",
    ".php",
    ".rust",
    ".go",
    ".cs",
    ".swift",
    ".kt",
    ".ts",
    ".jsx",
    ".tsx",
]

class CodeAgent:
    def __init__(self, summary, githubURL) -> None:
        self.url = githubURL
        self.summary = summary
        self.getRepo()
        self.removeFolders()
        self.removeFiles()
        self.llm2 = LLMModels.get_openai_model()

        loader = GenericLoader.from_filesystem(
            getcwd() + "/" + PATH_TO_CODE_REPO,
            glob="**/*",
            suffixes=ALLOWED_SUFFEXIS,
            parser=LanguageParser(parser_threshold=500),
        )
        documents = loader.load()
        splitter = RecursiveCharacterTextSplitter(
            chunk_size=2000, chunk_overlap=200
        )
        texts = splitter.split_documents(documents)
        self.db = Chroma.from_documents(texts, OpenAIEmbeddings(disallowed_special=()))
        retriever = self.db.as_retriever(
            search_type="mmr",  # Also test "similarity"
            search_kwargs={"k": 8},
        )
        self.llm = LLMModels.get_chat_model()
        memory = ConversationSummaryMemory(
        llm=self.llm, memory_key="chat_history", return_messages=True
            )
        self.qa = ConversationalRetrievalChain.from_llm(self.llm, retriever=retriever, memory=memory)
        print(self.score())

    def score(self):
        parser = PydanticOutputParser(pydantic_object=MetricList)
        prompt = PromptTemplate(
            template=code_scoring_prompt,
            input_variables=["ideasummary"],
            partial_variables={"format_instructions": parser.get_format_instructions()},
        )
        print(self.qa(code_summary_prompt))
        output = self.llm2(
            prompt.format_prompt(
                ideasummary=self.summary,
                codesummary= self.qa(code_summary_prompt)["answer"],
            ).to_string()
        )
        try:
            metrics = parser.parse(output)
        except:
            fixing_parser = OutputFixingParser.from_llm(
                parser=parser, llm=self.llm
            )
            metrics = fixing_parser.parse(output)

        total_score = 0
        for i in metrics.metrics:
            total_score += i.score

        final_score = total_score / len(metrics.metrics)
        rubric_index = max(0, min(int(final_score) - 1, len(categories_rubric) - 1))
        rubric_value = categories_rubric[rubric_index]
        return {
            "score": final_score,
            "category": rubric_value,
            "metrics": metrics.dict(),
        }

    def chat(self, message):
        return self.qa(message)

    def end(self):
        self.removeRepo()

    def removeFolders(self):
        for folder in FOLDERS_TO_REMOVE:
            try:
                rmtree(f"{PATH_TO_CODE_REPO}/{folder}")
            except:
                pass
    
    def removeFiles(self):
        for file in FILES_TO_REMOVE:
            try:
                remove(f"{PATH_TO_CODE_REPO}/{file}")
            except:
                pass

    def getRepo(self):
        if path.exists(PATH_TO_CODE_REPO):
            self.removeRepo()
        try:
            self.repo = Repo.clone_from(self.url, PATH_TO_CODE_REPO)
        except:
            raise Exception("Invalid URL")
    
    def removeRepo(self):
        try:
            rmtree(PATH_TO_CODE_REPO)
        except:
            raise Exception("Unable to remove repo")