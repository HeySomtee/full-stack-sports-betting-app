from flask import Flask, jsonify
from flask_cors import CORS
import requests
from flask import Flask, request, jsonify

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

@app.route('/api/odds', methods=['POST'])
def receive_data_from_frontend():
    data = request.json 
    print('Received data:', data)

    response_data = {'message': "recived"}

    response = jsonify(response_data)
    # response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5000')  # Replace with the actual origin of your React frontend

    
    return response

if __name__ == '__main__':
    app.run(debug=True)
