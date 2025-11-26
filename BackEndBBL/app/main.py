"""
Application principale FastAPI
Point d'entrée de l'API
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import articles
from .database import engine, Base

# Création des tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Blog API",
    description="API REST pour application de blog avec articles, commentaires et système de likes",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_tags=[
        {"name": "articles", "description": "Opérations sur les articles de blog"},
        {"name": "comments", "description": "Opérations sur les commentaires"},
    ],
)

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclusion des routeurs
app.include_router(articles.router, prefix="/api/articles", tags=["articles"])


@app.get("/", tags=["root"])
async def root():
    """Route racine de l'API"""
    return {
        "message": "Bienvenue sur l'API du Blog",
        "documentation": {"swagger": "/docs", "redoc": "/redoc"},
        "version": "1.0.0",
    }


@app.get("/health", tags=["root"])
async def health_check():
    """Endpoint de vérification de santé"""
    return {"status": "healthy"}
