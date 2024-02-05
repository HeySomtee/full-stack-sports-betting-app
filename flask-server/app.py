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
from uuid import uuid4


app = Flask(__name__)
CORS(app)
app.config['JWT_SECRET_KEY'] = '0xC1B503B6c0D110f0cf6B727D109FC575B4Ad6D79' 
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=60) 

jwt = JWTManager(app)

mongo_uri = "mongodb+srv://sportee_admin:tkcx6qyh7m@cluster0.opksht3.mongodb.net/Project_db?retryWrites=true&w=majority"
client = MongoClient(mongo_uri) 

database_name = "Project_db"
db = client[database_name]

collection_name = "sportee_db"
collection = db[collection_name]


@app.route('/api/data/')
@jwt_required()
def get_api_data():
    dateFrom = "2023-11-01"
    dateTo = "2023-11-10"
    
    url = "http://api.football-data.org/v4/matches"
    headers = {
        'X-Auth-Token': '9377f5d5f1e14826a93b303ef58efc92',
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

    # Generate a unique ID for the new bet
    bet_id = str(uuid4())
    new_bet['id'] = bet_id

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
        user_data = {'useremail': user_email, 'password': hashed_password, 'balance': 500000, 'bets': [], 'history': []}
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
            access_token = create_access_token(identity=user_email, expires_delta=timedelta(minutes=60))
            print(access_token)
            response_message = {'res': 'User login successful', 'access_token': access_token}
            response = jsonify(response_message)
            print(response.data) 
            return response.data, 223
        else:
            response_message = {'res': 'invalid email or password'}
            response = jsonify(response_message)
            return response, 222
            
@app.route('/user/bets', methods=['GET', 'POST'])
@jwt_required()
def user_bets():
    user_email = get_jwt_identity()
    user = collection.find_one({"useremail": user_email})
    if user:
        user_bets = user.get('bets', [])
        return jsonify({"user_bets": user_bets})
    else:
        return jsonify({"error": f"User with email {user_email} not found"}), 404 
        
        
# @app.route('/update/bets', methods=['POST', 'GET'])
# @jwt_required()
def check_validated_bets():
    # user_email = get_jwt_identity()
    user_email = 'ilosomto2000@gmail.com'
    user = collection.find_one({"useremail": user_email})
    user_bets = user.get('bets', [])
    
    slipState = []
    for item in user_bets:
        bet_date = item['betDate']

        url = "http://api.football-data.org/v4/matches"
        headers = {
            'X-Auth-Token': '9377f5d5f1e14826a93b303ef58efc92',
            "X-Unfold-Goals": "true",
        }
        params = {
            'dateFrom': bet_date["dateFrom"],
            'dateTo': bet_date["dateTo"]
        }
        response = requests.get(url, headers=headers, params=params)
        ref_data = response.json()

        user_bets_info = [
            (item2["id"], item2["status"]) for item2 in item["slip"]
        ]

        selected_winners = [
            (
                item2["id"],
                (item2["className"][:item2["className"].find("Win")] + '_TEAM').upper()
                if "Win" in item2["className"]
                else item2["className"].upper()
            )
            for item2 in item["slip"]
        ]


        selected_winners_info = {
            match_item: match_item2 for match_item, match_item2 in selected_winners
        }

        ref_data_info = {
            match_item["id"]: match_item.get("status") for match_item in ref_data["matches"]
        }

        win_status_info = {
            match_item["id"]: match_item["score"]["winner"] for match_item in ref_data["matches"]
        }
        

        matching_statuses = [
            (match_id, ref_data_info.get(match_id), win_status_info.get(match_id), selected_winners_info.get(match_id))
            for match_id, _ in user_bets_info
        ]
        # print(matching_statuses)
          
        all_finished = all(status == 'FINISHED' for _, status, _, _ in matching_statuses)
        if all_finished:
            bet_win = all(winners == selected_winners for _, _, winners, selected_winners in matching_statuses)
            print(bet_win)
            if bet_win:
                user_data = collection.find_one({'useremail': user_email})
                balance = user_data.get('balance', 0)
                # new_balance = balance + pWin(client state)
                print(f"The balance for {user_email} is: {balance}")

            bet_id_to_move = item['id']
            print(bet_id_to_move)
            result = collection.update_one(
                {'useremail': user_email, 'bets.id': bet_id_to_move},
                {
                    '$pull': {'bets': {'id': bet_id_to_move}},
                    '$push': {'history': {'$each': [{'id': bet_id_to_move}], '$position': 0}}
                }
            )

            # Check if the update was successful
            if result.modified_count > 0:
                print(f"Bet with ID {bet_id_to_move} moved to history for user {user_email}.")    

            
                



check_validated_bets()  


                 
            # ________   ________   ________   ________   _________   _______    _______          
            # |\   ____\ |\   __  \ |\   __  \ |\   __  \ |\___   ___\|\  ___ \  |\  ___ \         
            # \ \  \___|_\ \  \|\  \\ \  \|\  \\ \  \|\  \\|___ \  \_|\ \   __/| \ \   __/|        
            # \ \_____  \\ \   ____\\ \  \\\  \\ \   _  _\    \ \  \  \ \  \_|/__\ \  \_|/__      
            # \|____|\  \\ \  \___| \ \  \\\  \\ \  \\  \|    \ \  \  \ \  \_|\ \\ \  \_|\ \     
            #     ____\_\  \\ \__\     \ \_______\\ \__\\ _\     \ \__\  \ \_______\\ \_______\    
            # |\_________\\|__|      \|_______| \|__|\|__|     \|__|   \|_______| \|_______|    
            # \|_________|                                                                      
                                                                                     
                                                                                           

if __name__ == '__main__':
    app.run(debug=True)
