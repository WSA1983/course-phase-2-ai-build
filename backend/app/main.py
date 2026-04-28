from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from pathlib import Path

app = FastAPI(title="PM MVP Backend")
FRONTEND_DIST = Path("/app/frontend-out")


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/api/hello")
def hello() -> dict[str, str]:
    return {"message": "hello world"}


if FRONTEND_DIST.exists():
    app.mount("/", StaticFiles(directory=str(FRONTEND_DIST), html=True), name="frontend")
else:
    @app.get("/", response_class=HTMLResponse)
    def root() -> str:
        return """
        <!doctype html>
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>PM MVP - Hello</title>
          </head>
          <body>
            <h1>Hello from PM MVP backend</h1>
            <p>Phase scaffold backend fallback is running.</p>
            <p>Try <a href="/api/health">/api/health</a>.</p>
          </body>
        </html>
        """
