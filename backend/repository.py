import sqlite3

DB_NAME = "stackFactoryLite.db"
LIKES_TABLE = "likes"
MESSAGES_TABLE = "messages"


def close_db(e=None, g) -> None:
    db = g.pop("db", None)

    if db is not None:
        db.close()

#current_app.config["DATABASE"]
def get_database(file) -> sqlite3.Connection:
    if "db" not in g:
        g.db = sqlite3.connect(
            file, detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row

    return g.db

def prepare_database() -> None:
    db = get_database()
    db.execute(f"CREATE TABLE IF NOT EXISTS {LIKES_TABLE} (hash, date)")
    db.execute(
        f"CREATE TABLE IF NOT EXISTS {MESSAGES_TABLE} (hash, date, message, from_sender)"
    )

def get_likes():
    db = get_database()
    result = db.execute(f"SELECT COUNT(*) FROM {LIKES_TABLE}").fetchone()

    return result