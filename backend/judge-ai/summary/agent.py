from langchain_community.document_loaders import WebBaseLoader
from langchain.chains.summarize import load_summarize_chain
from .prompts import SUMMARISE_PROMPT_TEMPLATE, REFINE_PROMPT_TEMPLATE
from llm import LLMModels

class SummaryAgent():
    def __init__(self, url: str) -> None:
        self.loader = WebBaseLoader(url)
        self.docs = self.loader.load()
        self.llm = LLMModels.get_chat_model()
        self.chain = load_summarize_chain(self.llm, chain_type="refine", verbose=False,
            question_prompt=SUMMARISE_PROMPT_TEMPLATE,
            refine_prompt=REFINE_PROMPT_TEMPLATE)
    def get_summary(self):
        return self.chain.run(self.docs)