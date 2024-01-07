from summary.agent import SummaryAgent
from business.agent import BusinessAgent
from originality.agent import OriginalityAgent
from codereview.agent import CodeAgent

def get_summary(url):
    agent = SummaryAgent(url)
    return agent.get_summary()

if "__main__" == __name__:
    summary = get_summary("https://devpost.com/software/decide-this-later")
    # businessAgent = BusinessAgent(summary)
    # originalityAgent = OriginalityAgent(summary)

    # businessScore = businessAgent.score()
    # originalityScore = originalityAgent.score()

    # print(businessScore)
    # print(originalityScore)

    codeAgent = CodeAgent(summary, "https://github.com/mansooranis/vrrt")
