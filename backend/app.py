from flask import Flask
from flask import request
from flask_cors import CORS
from webscraper import SoupMaker

app = Flask(__name__)
CORS(app)
@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/get_all_projects", methods = ['POST'])
def get_all_projects():
    data = request.json["j"]
    print(data)
    return "ok"

@app.route("/project_info", methods = ['POST'])
def get_projects_info():
    url = request.json["url"]
    soup = SoupMaker(url)
    print(soup.get_project_info())
    return "ok"
