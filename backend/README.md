# Backend

## Run (local with uv)

```bash
uv sync --all-groups
uv run uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## Test

```bash
uv run pytest
```
