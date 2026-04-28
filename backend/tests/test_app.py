from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_root_returns_hello_html() -> None:
    response = client.get("/")

    assert response.status_code == 200
    assert "text/html" in response.headers["content-type"]
    assert "Hello from PM MVP backend" in response.text


def test_health_route() -> None:
    response = client.get("/api/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_hello_route() -> None:
    response = client.get("/api/hello")

    assert response.status_code == 200
    assert response.json() == {"message": "hello world"}
