import sqlite3

from flask import Flask, request

app = Flask(__name__)


def get_user_unsafe(username):
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    query = "SELECT * FROM users WHERE username = '" + username + "'"
    cursor.execute(query, (sql_injection,))
    results = cursor.fetchall()
    conn.close()
    return results


@app.route("/user")
def get_user():
    username = request.args.get("username")
    return str(get_user_unsafe(username))
