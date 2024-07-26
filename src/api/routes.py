"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from api.models import db, Users, Comments, Posts, Planets, Starships, Contacts, Characters




api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=['GET'])
def handle_hello():
    response_body = {}
    response_body['message'] = "Hello! I'm a message that came from the backend"
    return response_body, 200

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():
    response_body = {}
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    user = Users.query.filter_by(email=email, password=password, is_active=True).first()
    
    if user:
        access_token = create_access_token(identity={'user_id': user.id, 'is_admin': user.is_admin, 'id': user.id})
        response_body['message'] = 'Usuario logueado'
        response_body['access_token'] = access_token
        response_body['is_admin'] = user.is_admin
        response_body['id'] = user.id
        response_body['results'] = user.serialize()
        return jsonify(response_body), 200
    else:
        response_body['message'] = 'Correo o contraseña incorrectos'
        return jsonify(response_body), 401


@api.route('/signup', methods=['POST'])
def signup():
    response_body = {}
    data = request.json
    
    email = data.get("email", None).lower()
    password = data.get("password", None)
    existing_user = Users.query.filter_by(email=email).first()
    
    if existing_user:
        response_body['error'] = 'El correo electrónico ya está registrado'
        return jsonify(response_body), 400
    
    print (request.json)
    new_user = Users(
        email=email,
        password=password,
        is_active=True,
        first_name=data.get('first_name', None),
        last_name=data.get('last_name', None),
        is_admin=False,
        pfp="https://www.teleadhesivo.com/es/img/arc226-jpg/folder/products-listado-merchanthover/pegatinas-coches-motos-space-invaders-marciano-iii.jpg"
    )
    db.session.add(new_user)
    db.session.commit()
    
    access_token = create_access_token(identity={'user_id': new_user.id})
    response_body['message'] = 'Usuario registrado y logueado'
    response_body['access_token'] = access_token
    
    return jsonify(response_body), 200
   
# Protect a route with jwt_required, which will kick out requests
@api.route("/profile", methods=["GET"])
@jwt_required()
def get_profile():
    print("-----------------------------------------------------------------------------------------------------------------")
    response_body = {}
    current_user = get_jwt_identity()
    print(current_user)
    user = Users.query.get(current_user['user_id'])
    
    if user:
        response_body['message'] = 'Perfil encontrado'
        response_body['results'] = user.serialize()
        return jsonify(response_body), 200
    else:
        response_body['message'] = 'Perfil no encontrado'
        return jsonify(response_body), 404

@api.route('/planets', methods=['GET'])
def handle_planets():
    response_body = {}
    response_body['message'] = "Hello! I'm a message that came from the backend"
    return response_body, 200

@api.route('/starships', methods=['GET'])
def handle_starships():
    response_body = {}
    response_body['message'] = "Hello! I'm a message that came from the backend"
    return response_body, 200

@api.route('/users', methods=['GET'])
def handle_users():
    response_body = {}
    response_body['message'] = "Hello, this are the users"
    return response_body, 200


@api.route('/users/<int:id>', methods=['GET'])
def get_specific_users(id):
    response_body = {}
    user = db.session.execute(db.select(Users).where(Users.id == id)).scalar()
    if user:
        response_body['results'] = user.serialize()
        response_body['message'] = 'Usuario encontrado'
        return jsonify(response_body), 200
    response_body['message'] = 'Usuario inexistente'
    response_body['results'] = {}
    return jsonify(response_body), 404


@api.route('/users/<int:id>', methods=['GET', 'POST', 'DELETE'])
def handle_specific_users(id):
    response_body = {}
    if request.method == 'PUT':
        data = request.json
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if user:
            user.email = data['email']
            user.is_active = data['is_active']
            user.first_name = data['first_name']
            user.last_name = data['last_name']
            response_body['message'] = 'Datos actualizados'
            response_body['results'] = user.serialize()
            return response_body, 200
        response_body['message'] = 'Usuario inexistente'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'DELETE':
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if user:
            # db.session.delete(user)
            # db.session.commit()
            user.is_active = False
            response_body['message'] = 'Usuario eliminado'
            response_body['resuls'] = user.serialize()
            return response_body, 200
        response_body['message'] = 'Usuario inexistente'
        response_body['results'] = {}
        return response_body, 404

@api.route('/contacts', methods=['GET', 'POST'])
def handle_contacts():
    response_body = {}

    if request.method == 'GET':
        contacts = db.session.query(Contacts).all()
        if contacts:
            response_body = {
                'results': [contact.serialize() for contact in contacts],
                'message': 'Contactos encontrados'
            }
            return jsonify(response_body), 200
        response_body = {
            'message': 'No hay contactos',
            'results': []
        }
        return jsonify(response_body), 404
        
    if request.method == 'POST':
        data = request.json
               
        new_contact = Contacts(
            fullname=data['fullname'],
            email=data['email'],
            phone=data['phone'],
            address=data['address']
        )
        db.session.add(new_contact)
        db.session.commit()
        
        response_body['results'] = new_contact.serialize()
        response_body['message'] = 'Contacto creado'
        print(response_body)
        return response_body, 201

@api.route('/contacts/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def handle_specific_contact(id):
    response_body = {}
    if request.method == 'GET':
        contact = db.session.query(Contacts).get(id)
        if contact:
            response_body = {
                'results': contact.serialize(),
                'message': 'Contacto encontrado'
            }
            return jsonify(response_body), 200
        response_body = {
            'message': 'Contacto inexistente',
            'results': {}
        }
        return jsonify(response_body), 404

    if request.method == 'PUT':
        data = request.json
        contact = db.session.query(Contacts).get(id)
        if contact:
            contact.email = data.get('email', contact.email)
            contact.phone = data.get('phone', contact.phone)
            contact.fullname = data.get('fullname', contact.fullname)
            contact.address = data.get('address', contact.address)
            db.session.commit()
            response_body = {
                'message': 'Datos actualizados',
                'results': contact.serialize()
            }
            return jsonify(response_body), 200
        response_body = {
            'message': 'Contacto inexistente',
            'results': {}
        }
        return jsonify(response_body), 404

    if request.method == 'DELETE':
        contact = db.session.query(Contacts).get(id)
        if contact:
            db.session.delete(contact)
            db.session.commit()
            response_body = {
                'message': 'Contacto eliminado',
                'results': contact.serialize()
            }
            return jsonify(response_body), 200
        response_body = {
            'message': 'Contacto inexistente',
            'results': {}
        }
        return jsonify(response_body), 404

@api.route('/favorites', methods=['POST'])
def add_favorite():
    data = request.json
    favorited_by_id = data.get('favorited_by_id')
    character_id = data.get('character_id')
    
    user = Users.query.get(favorited_by_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    character = Characters.query.get(character_id)  
    if not character:
        return jsonify({'error': 'Character not found'}), 404
    
    new_favorite = FavoriteCharacters(favorited_by_id=favorited_by_id, character_id=character_id)
    db.session.add(new_favorite)
    db.session.commit()
    
    return jsonify({'message': 'Favorite added'}), 201



@api.route('/favorites/<int:user_id>', methods=['GET'])
def get_favorites(user_id):
    favorites = FavoriteCharacters.query.filter_by(favorited_by_id=user_id).all()
    favorites_list = [{'id': f.id, 'favorited_by_id': f.favorited_by_id} for f in favorites]
    
    return jsonify(favorites_list), 200

@api.route('/favorites/<int:id>', methods=['DELETE'])
def remove_favorite(id):
    favorite = FavoriteCharacters.query.get(id)
    if not favorite:
        return jsonify({'error': 'Favorite not found'}), 404
    
    db.session.delete(favorite)
    db.session.commit()
    
    return jsonify({'message': 'Favorite removed'}), 200

