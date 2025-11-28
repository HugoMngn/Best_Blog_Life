"""
Application principale FastAPI
Point d'entrée de l'API du blog
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import articles, comments
from app.api.endpoints.articles import router as articles_router
from app.api.endpoints.comments import router as comments_router
from app.database import engine, Base

# Création des tables dans la base de données
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Blog API",
    description="API REST pour application de blog avec protection par mot de passe et commentaires",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_tags=[
        {
            "name": "articles",
            "description": "Opérations CRUD sur les articles avec protection par mot de passe",
        },
        {
            "name": "comments",
            "description": "Système de commentaires pour les articles",
        },
    ],
)

# Configuration CORS - IMPORTANT pour permettre les requêtes depuis le frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite dev server alternative
        "http://localhost:4173",  # Vite dev server main
        "http://localhost:3000",  # Alternative
        "http://127.0.0.1:5173",  # Reseau Alternative
        "http://127.0.0.1:4173",  # Main Reseau Alternative
    ],
    allow_credentials=True,
    allow_methods=["*"],  # Permet toutes les méthodes (GET, POST, PUT, DELETE)
    allow_headers=["*"],  # Permet tous les headers
)

# Inclusion des routeurs
app.include_router(articles.router, prefix="/api/articles", tags=["articles"])
app.include_router(comments.router, prefix="/api/comments", tags=["comments"])


@app.get("/", tags=["root"])
async def root():
    """Route racine de l'API"""
    return {
        "message": "Bienvenue sur l'API du Blog v2.0",
        "features": [
            "✅ Articles protégés par mot de passe",
            "✅ Système de commentaires",
            "✅ Likes sur les articles",
            "✅ Recherche avancée",
            "✅ Compteur de likes visible",
        ],
        "documentation": {"swagger": "/docs", "redoc": "/redoc"},
        "endpoints": {"articles": "/api/articles", "comments": "/api/comments"},
    }


@app.get("/health", tags=["root"])
async def health_check():
    """Endpoint de vérification de santé"""
    return {"status": "healthy", "version": "2.0.0", "database": "connected"}
