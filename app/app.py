from flask import Flask, request, jsonify, redirect, url_for, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from models import db, User
from flask_socketio import SocketIO, send, emit
from flask_session import Session
from config import ApplicationConfig

app = Flask(__name__)   
app.config.from_object(ApplicationConfig)
bcrypt = Bcrypt(app)
server_session = Session(app)
socketio = SocketIO(app, cors_allowed_origins="*")
cors = CORS(app, supports_credentials=True)

db.init_app(app)


with app.app_context():
    db.create_all()

@cross_origin
@app.route("/@me")
def get_curr_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized!"}), 401
    
    user = User.query.filter_by(id=user_id).first()

    return jsonify({
        "id": user.id,
        "email": user.email,
        "username": user.username
    })

@cross_origin
@app.route("/register", methods=["POST"])
def register_user():
    username = request.json["username"]
    email = request.json["email"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(username= username, email=email, password=hashed_password)
    try:
        db.session.add(new_user)
        db.session.commit()
        session["user_id"] = new_user.id
    except:
        return "Something went wrong while creating new Account!"

    return jsonify({
        "username": new_user.username,
        "id": new_user.id,
        "email": new_user.email
    })


@cross_origin
@app.route("/login", methods=["POST", "GET"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorized!"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized!"}), 401
    
    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "email": user.email
    })

@cross_origin
@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"

@socketio.on("send_message")
def handle_message(data):
    user = data.get("user")
    message = data.get("message")
    if message and user:
        message_payload = {
            "username": user.get("username"),
            "message": message
        }
        emit("message", message_payload, broadcast=True)


if __name__ == "__main__":
    socketio.run(app, debug=True, host="0.0.0.0", port=5000)
    # app.run(debug=True, host="127.0.0.1", port=5000)