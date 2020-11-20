from requests_oauthlib import OAuth2Session
from flask import Flask, request
from flask_cors import cross_origin
import os
import requests
from flask.json import jsonify
import json

app = Flask(__name__)

# This information is obtained upon registration of a new GitHub OAuth
client_id = "7399c989ae7246112a4d"
client_secret = "0fda142a205ba59cfc57e57d5131e8e2c500804c"
authorization_base_url = 'https://github.com/login/oauth/authorize?client_id=7399c989ae7246112a4d&scope=repo'
token_url = 'https://github.com/login/oauth/access_token'

# Urls for data requests
requestRepos_url = "https://api.github.com/user/repos"
session = None


# Request sha
# https://api.github.com/repos/manuelmerkel/Forschungsprojekt/contents/doc/adr
# If link not available --> No adrs
# There is a sha for every folder and file

# Request blob (Only possible with sha)
# https://api.github.com/repos/manuelmerkel/Forschungsprojekt/git/blobs/508c5c3007f067e2678f9c0ef2141d592857b8f3

# requestUsername_url = "https://api.github.com/user"

# Requests token from GitHub with code from authorisation
@app.route("/token", methods=["POST"])
@cross_origin()
def getToken():
    global session
    code = request.form["code"] 
    data = {"client_id": client_id, "client_secret": client_secret, "code": code}
    session = OAuth2Session(client_id)
    # Now we have the authorisation
    token = session.fetch_token(token_url, code=code, client_secret=client_secret)
    return token

# Requests the repos and returns a json with all repos 
@app.route("/repos", methods=["POST"])
@cross_origin()
def getRepos():
    global session
    reposJson = jsonify(session.get(requestRepos_url).json())
    return reposJson

if __name__ == "__main__":
    app.run(debug=True)