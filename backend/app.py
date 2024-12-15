import sqlite3
import os
from datetime import datetime, timezone
from flask import Flask, request, make_response, g, current_app
from utils import hash_params, rows_to_list

if "AZURE_SQLITE_DATABASE" in os.environ:
    # running on Azure
    DB_NAME = "/home/site/wwwroot/database.db"
else:
    DB_NAME = "stackFactoryLite.db"

LIKES_TABLE = "likes"
MESSAGES_TABLE = "messages"

app = Flask(__name__)


def close_db(e=None) -> None:
    db = g.pop("db", None)

    if db is not None:
        db.close()


def get_database() -> sqlite3.Connection:
    if "db" not in g:
        g.db = sqlite3.connect(
            current_app.config["DATABASE"], detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row

    return g.db


def prepare_database() -> None:
    db = get_database()
    db.execute(f"CREATE TABLE IF NOT EXISTS {LIKES_TABLE} (hash, date)")
    db.execute(
        f"CREATE TABLE IF NOT EXISTS {MESSAGES_TABLE} (hash, date, message, from_sender)"
    )


@app.route("/likes", methods=["GET"])
def get_likes():
    db = get_database()
    result = db.execute(f"SELECT COUNT(*) FROM {LIKES_TABLE}").fetchone()

    return make_response({"count": result[0]}, 200)


@app.route("/addOrUpdateLike", methods=["POST"])
def add_or_update_like():

    payload = request.json

    if "host" not in payload or "userAgent" not in payload:
        return make_response({}, 400)

    if len(payload["userAgent"]) > 300 or len(payload["host"]) > 300:
        return make_response({}, 400)

    hashed = hash_params(payload["host"], payload["userAgent"])

    db = get_database()
    result = db.execute(
        f"SELECT hash, date FROM {LIKES_TABLE} WHERE hash = '{hashed}'"
    ).fetchone()

    if result is None:
        db.execute(
            f"INSERT INTO {LIKES_TABLE} VALUES ('{hashed}','{datetime.now(timezone.utc)}')"
        )
        db.commit()
        db.close()

        return make_response({}, 201)

    time_delta = datetime.now(timezone.utc) - datetime.fromisoformat(result["date"])

    if time_delta.total_seconds() > 10:
        db.execute(
            f"UPDATE {LIKES_TABLE} SET date = '{datetime.now(timezone.utc)}' WHERE hash = '{hashed}'"
        )
        db.commit()
        db.close()

        return make_response({}, 200)

    db.close()

    return make_response({}, 204)


@app.route("/messages", methods=["GET"])
def get_messages():
    db = get_database()
    result = db.execute(
        f"SELECT date, message, from_sender FROM {MESSAGES_TABLE}"
    ).fetchall()

    return make_response(rows_to_list(result), 200)


@app.route("/addMessage", methods=["POST"])
def add_message():
    payload = request.json

    if (
        "host" not in payload
        or "userAgent" not in payload
        or "message" not in payload
        or "from_sender" not in payload
    ):
        return make_response({}, 400)

    if (
        len(payload["userAgent"]) > 300
        or len(payload["host"]) > 300
        or len(payload["message"]) > 2000
        or len(payload["from_sender"]) > 100
    ):
        return make_response({}, 400)

    hashed = hash_params(payload["host"], payload["userAgent"])

    message, from_sender = payload["message"], payload["from_sender"]

    db = get_database()
    result = db.execute(
        f"SELECT hash, date FROM {MESSAGES_TABLE} WHERE hash = '{hashed}'"
    ).fetchone()

    if result is None:
        db.execute(
            f"INSERT INTO {MESSAGES_TABLE} VALUES ('{hashed}','{datetime.now(timezone.utc)}', '{message}', '{from_sender}')"
        )
        db.commit()
        db.close()

        return make_response({}, 201)

    db.close()

    time_delta = datetime.now(timezone.utc) - datetime.fromisoformat(result["date"])

    if time_delta.total_seconds() < 10:
        return make_response({}, 400)

    return make_response({}, 200)


with app.app_context():
    app.config["DATABASE"] = DB_NAME
    prepare_database()
