from flask import Flask, jsonify
from flask import request
from flask_cors import CORS
from webscraper import SoupMaker
from judgeai.business.agent import BusinessAgent
from judgeai.originality.agent import OriginalityAgent
from judgeai.summary.agent import SummaryAgent
from judgeai.codereview.agent import CodeAgent

codeAgent = None

app = Flask(__name__)
CORS(app)
@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/get_all_projects", methods = ['POST'])
def get_all_projects():
    url = request.json["url"]
    soup = SoupMaker(url)
    return soup.get_projects()

@app.route("/project_info", methods = ['POST'])
def get_projects_info():
    url = request.json["url"]
    soup = SoupMaker(url)
    datadict = soup.get_project_info()
    return [datadict]

@app.route("/ai/summary", methods = ['POST'])
def get_project_summary():
    url = request.json["url"]
    summaryAgent = SummaryAgent(url)
    summary = summaryAgent.get_summary()

    return {"summary": summary}

@app.route("/ai/originality/score", methods = ['POST'])
def get_originality_ai_results():
    summary = request.json["summary"]
    originalityAgent = OriginalityAgent(summary)
    return originalityAgent.score()

@app.route("/ai/business/score", methods = ['POST'])
def get_business_ai_results():
    summary = request.json["summary"]
    businessAgent = BusinessAgent(summary)
    return businessAgent.score()


@app.route("/ai/code/score", methods = ['POST'])
def get_code_ai_results():
    github_url = request.json["github_url"]
    summary = request.json["summary"]
    global codeAgent
    codeAgent = CodeAgent(summary, github_url)
    return codeAgent.score()

@app.route("/chat", methods = ['POST'])
def chat():
    global codeAgent
    if codeAgent is None:
        return {"error": "No code agent"}
    message = request.json["message"]
    return codeAgent.chat(message)["answer"]

@app.route("/endchat", methods = ['POST'])
def endchat():
    global codeAgent
    if codeAgent is None:
        return {"error": "No code agent"}
    codeAgent.end()
    codeAgent = None
    return {"success": True}