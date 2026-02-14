import sqlite3
import sys


def get_user_unsafe(username):
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    query = "SELECT * FROM users WHERE username = '" + username + "'"
    cursor.execute(query)
    results = cursor.fetchall()
    conn.close()
    return results


def delete_user_unsafe(user_id):
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    query = f"DELETE FROM users WHERE id = {user_id}"
    cursor.execute(query)
    conn.commit()
    conn.close()


def search_users_unsafe(search_term):
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE name LIKE '%" + search_term + "%'")
    return cursor.fetchall()


if __name__ == "__main__":
    if len(sys.argv) > 1:
        print(get_user_unsafe(sys.argv[1]))
