import json
import sqlite3
from pathlib import Path
from typing import Any

from app.schema import DEFAULT_BOARD


def serialize_board(board: dict[str, Any]) -> str:
    return json.dumps(board, separators=(",", ":"), sort_keys=True)


def deserialize_board(payload: str) -> dict[str, Any]:
    loaded = json.loads(payload)
    if not isinstance(loaded, dict):
        raise ValueError("Board payload must be a JSON object.")

    if "columns" not in loaded or "cards" not in loaded:
        raise ValueError("Board payload must include columns and cards.")

    if not isinstance(loaded["columns"], list) or not isinstance(loaded["cards"], dict):
        raise ValueError("Board payload has invalid structure.")

    return loaded


def init_database(db_path: Path) -> None:
    db_path.parent.mkdir(parents=True, exist_ok=True)

    with sqlite3.connect(db_path) as connection:
        schema_path = Path(__file__).with_name("schema.sql")
        connection.executescript(schema_path.read_text(encoding="utf-8"))
        _seed_demo_user(connection)
        connection.commit()


def _seed_demo_user(connection: sqlite3.Connection) -> None:
    # Phase 4 introduced hardcoded credentials; seed the matching user record now.
    connection.execute(
        """
        INSERT OR IGNORE INTO users (username, password_hash)
        VALUES (?, ?)
        """,
        ("user", "password"),
    )

    user = connection.execute(
        "SELECT id FROM users WHERE username = ?",
        ("user",),
    ).fetchone()
    if user is None:
        raise ValueError("Expected demo user to exist after seed.")

    connection.execute(
        """
        INSERT OR IGNORE INTO boards (user_id, board_json)
        VALUES (?, ?)
        """,
        (user[0], serialize_board(DEFAULT_BOARD)),
    )
