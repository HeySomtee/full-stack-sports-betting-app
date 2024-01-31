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

collection_name = "sportee_db"
collection = db[collection_name]

user_schema = {
    'useremail': {
        'type': str,
        'required': True,
        'unique': True,
    },
    'password': {
        'type': str,
        'required': True,
    },
    'bets': {
        'type': list,
        'default': [],
    },
}


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
def place_bet():
    user_email = get_jwt_identity()
    new_bet = request.json 
    collection.update_one (
        {"useremail": user_email},
        {"$push": {"bets": new_bet}}
    )
    user = collection.find_one({"useremail": user_email})
    if user:
        user_bets = user.get('bets', [])
        return jsonify({"user_bets": user_bets})
    else:
        return jsonify({"error": f"User with email {user_email} not found"}), 404 



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

        #TODO hash/salt password
        hashed_password = password  # generate_password_hash(password, method='sha256')
        user_data = {'useremail': user_email, 'password': hashed_password, 'bets': []}
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
