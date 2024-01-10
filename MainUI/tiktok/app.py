from flask import Flask, render_template
import requests

app = Flask(__name__)

@app.route('/')
def index():
    # Make an API request
    url = "http://api.football-data.org/v4/matches/327117"
    headers = {
        'X-Auth-Token': '4cd97aa4596f477eaf41f79164f7cb7c',
        "X-Unfold-Goals": "true",
    }
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        return render_template('index.html', data=data)
    else:
        return f"Error: {response.status_code}"

@app.route('/api/data/')
def get_api_data():
    url = "http://api.football-data.org/v4/matches"
    headers = {
        'X-Auth-Token': '4cd97aa4596f477eaf41f79164f7cb7c',
        "X-Unfold-Goals": "true",
    }
    response = requests.get(url, headers=headers)
    data = response.json()
    return data  

if __name__ == '__main__':
    app.run(debug=True)