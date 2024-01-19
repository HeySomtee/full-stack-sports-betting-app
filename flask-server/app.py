from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from flask_pymongo import PyMongo
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

mongo_uri = "mongodb+srv://sportee_admin:tkcx6qyh7m@cluster0.opksht3.mongodb.net/Project_db?retryWrites=true&w=majority"
client = MongoClient(mongo_uri) 

database_name = "Project_db"
db = client[database_name]

# Access a specific collection within the database
collection_name = "sportee_db"
collection = db[collection_name]

@app.route('/api/data/')
def get_api_data():
    dateFrom = "2023-11-01"
    dateTo = "2023-11-10"
    
    url = "http://api.football-data.org/v4/matches"
    headers = {
        'X-Auth-Token': '73fdb77b3269470da61ca7234e7da2b8',
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
    data_to_insert = data
    result = collection.insert_one(data_to_insert)

    # Print the ID of the inserted document
    print(f"Inserted document ID: {result.inserted_id}")
    response_message = {"res" : "Bet slip created"} 
    response = jsonify(response_message)
    print(response.data) 
    return response.data

    # No need to close the MongoDB client connection here

if __name__ == '__main__':
    app.run(debug=True)
