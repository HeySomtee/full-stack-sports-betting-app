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
    # remove duplicates
    slip_ids = {item['id'] for item in data['key']}
    print('Received data:', slip_ids)
    # Manipulate and pull data from main api dat from info gotten from the frontend (data)

    #will still modify response_data to be info for the slip UI display 
    response_data = {'message': "recived"}
    response = jsonify(response_data) 
    return response

if __name__ == '__main__':
    app.run(debug=True)
