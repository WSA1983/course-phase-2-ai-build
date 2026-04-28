import sqlite3

import pytest

from app.board_store import deserialize_board, init_database, serialize_board
from app.schema import DEFAULT_BOARD


def test_serialize_deserialize_round_trip() -> None:
    payload = serialize_board(DEFAULT_BOARD)
    loaded = deserialize_board(payload)

    assert loaded["columns"][0]["id"] == "col-backlog"
    assert loaded["cards"]["card-1"]["title"] == "Align roadmap themes"


@pytest.mark.parametrize(
    "payload",
    [
        "[]",
        "{}",
        '{"columns": {}, "cards": []}',
    ],
)
def test_deserialize_rejects_invalid_shapes(payload: str) -> None:
    with pytest.raises(ValueError):
        deserialize_board(payload)


def test_init_database_creates_db_and_seeds_defaults(tmp_path) -> None:
    db_path = tmp_path / "data" / "pm.sqlite3"
    assert not db_path.exists()

    init_database(db_path)

    assert db_path.exists()
    with sqlite3.connect(db_path) as connection:
        users_count = connection.execute("SELECT COUNT(*) FROM users").fetchone()[0]
        boards_count = connection.execute("SELECT COUNT(*) FROM boards").fetchone()[0]
        board_json = connection.execute("SELECT board_json FROM boards LIMIT 1").fetchone()[0]

    assert users_count == 1
    assert boards_count == 1
    assert deserialize_board(board_json)["columns"][0]["id"] == "col-backlog"
