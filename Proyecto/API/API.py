from flask import Flask, request, jsonify
import mysql.connector
import bcrypt
from flask_cors import CORS
 
app = Flask(__name__)
CORS(app)
 
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="tiendaproteina"
)
 
cursor = db.cursor(dictionary=True)
 
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    nombre = data.get('nombre')
    apellido = data.get('apellido')
    telefono = data.get('telefono')
    email = data.get('email')
    password = data.get('password')

    if not nombre or not apellido or not telefono or not email or not password:
        return jsonify({'message': 'Faltan datos del usuario'}), 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    try:
        cursor.execute("INSERT INTO clientes (nombre, apellido, telefono, email, password) VALUES (%s, %s, %s, %s, %s)",
                       (nombre, apellido, telefono, email, hashed_password))
        db.commit()
        return jsonify({'message': 'Registro exitoso'}), 200
    except mysql.connector.Error as err:
        return jsonify({'message': 'Error al registrar: ' + str(err)}), 400

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Faltan datos del usuario'}), 400

    cursor.execute("SELECT * FROM clientes WHERE email = %s", (email,))
    user = cursor.fetchone()

    if user and bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        return jsonify({'message': 'Inicio de sesión exitoso', 'user': user}), 200
    else:
        return jsonify({'message': 'Credenciales incorrectas'}), 401
 
 
@app.route('/productos', methods=['GET'])
def get_products():
    cursor.execute("SELECT * FROM productos")
    products = cursor.fetchall()
    return jsonify(products), 200


if __name__ == '__main__':
    app.run(debug=True)