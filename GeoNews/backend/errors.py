"""API error helpers — contract shape ``{ "error": { "code", "message" } }``."""

from __future__ import annotations

from fastapi import HTTPException, Request
from fastapi.responses import JSONResponse


def error_body(code: str, message: str) -> dict:
    return {"error": {"code": code, "message": message}}


def http_error(status: int, code: str, message: str) -> HTTPException:
    return HTTPException(status_code=status, detail=error_body(code, message))


async def http_exception_handler(_request: Request, exc: HTTPException) -> JSONResponse:
    detail = exc.detail
    if isinstance(detail, dict) and "error" in detail:
        body = detail
    elif isinstance(detail, dict) and "code" in detail and "message" in detail:
        body = {"error": detail}
    else:
        body = error_body("http_error", str(detail))
    return JSONResponse(status_code=exc.status_code, content=body)
