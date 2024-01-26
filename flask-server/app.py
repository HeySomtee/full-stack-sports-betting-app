from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from flask_pymongo import PyMongo
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
from bson import ObjectId
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, decode_token 
from datetime import timedelta
from datetime import datetime
import jwt


app = Flask(__name__)
CORS(app)
app.config['JWT_SECRET_KEY'] = '0xC1B503B6c0D110f0cf6B727D109FC575B4Ad6D79' 
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=30) 

jwt = JWTManager(app)

mongo_uri = "mongodb+srv://sportee_admin:tkcx6qyh7m@cluster0.opksht3.mongodb.net/Project_db?retryWrites=true&w=majority"
client = MongoClient(mongo_uri) 

database_name = "Project_db"
db = client[database_name]

# Access a specific collection within the database
collection_name = "sportee_db"
collection = db[collection_name]


@app.route('/api/data/')
@jwt_required()
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
    response = requests.get(url, headers=headers)
    data = response.json()
    return jsonify(data)

@app.route('/api/odds', methods=['POST'])
@jwt_required()
def receive_data_from_frontend():
    data = request.json 
    print(data)
    data_to_insert = data
    result = collection.insert_one(data_to_insert)

    # Print the ID of the inserted document
    print(f"Inserted document ID: {result.inserted_id}")
    response_message = {"res" : "Bet slip created"} 
    response = jsonify(response_message)
    print(response.data) 
    return response.data



@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        user_email = request.json.get('email')
        password = request.json.get('password')

        existing_user = collection.find_one({'useremail': user_email})
        if existing_user:
            response_message = {'res': 'Email already exists'}
            response = jsonify(response_message)
            print(response.data) 
            return response.data, 222

        hashed_password = password  # generate_password_hash(password, method='sha256')
        user_data = {'useremail': user_email, 'password': hashed_password}
        collection.insert_one(user_data)
        response_message = {'res': 'User registered successfully'}
        response = jsonify(response_message)
        print(response.data) 
        return response.data, 223
    
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user_email = request.json.get('email')
        password = request.json.get('password')
        
        existing_user = collection.find_one({'useremail': user_email, 'password': password})
        if existing_user:
            access_token = create_access_token(identity=user_email, expires_delta=timedelta(minutes=30))
            print(access_token)
            response_message = {'res': 'User login successful', 'access_token': access_token}
            response = jsonify(response_message)
            print(response.data) 
            return response.data, 223
        else:
            response_message = {'res': 'invalid email or password'}
            response = jsonify(response_message)
            return response, 222
            
            
        
        

if __name__ == '__main__':
    app.run(debug=True)
