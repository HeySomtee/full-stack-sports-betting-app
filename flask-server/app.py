from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route('/api/data/')

def get_api_data():
    dateFrom = "2023-12-29"
    dateTo = "2024-01-01"
    
    url = "http://api.football-data.org/v4/matches"
    headers = {
        'X-Auth-Token': '4cd97aa4596f477eaf41f79164f7cb7c',
        "X-Unfold-Goals": "true",
    }
    params = {
        'dateFrom': dateFrom,
        'dateTo': dateTo
    }
    response = requests.get(url, headers=headers, params=params)
    data = response.json()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
