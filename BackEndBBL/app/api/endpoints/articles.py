"""
Endpoints API pour la gestion des articles
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from ...database import get_db
from app.schemas.article import ArticleCreate, ArticleUpdate, ArticleResponse
from app.services.article_service import ArticleService

router = APIRouter()


@router.get("/", response_model=List[ArticleResponse])
def get_articles(
    search: Optional[str] = Query(
        None, description="Rechercher dans titre, contenu ou auteur"
    ),
    skip: int = Query(0, ge=0, description="Nombre d'articles à sauter"),
    limit: int = Query(
        100, ge=1, le=100, description="Nombre maximum d'articles à retourner"
    ),
    db: Session = Depends(get_db),
):
    """Récupère tous les articles avec recherche optionnelle"""
    return ArticleService.get_all_articles(db, search=search, skip=skip, limit=limit)


@router.get("/{article_id}", response_model=ArticleResponse)
def get_article(article_id: int, db: Session = Depends(get_db)):
    """Récupère un article spécifique par son ID"""
    article = ArticleService.get_article_by_id(db, article_id)
    if not article:
        raise HTTPException(status_code=404, detail="Article non trouvé")
    return article


@router.post("/", response_model=ArticleResponse, status_code=201)
def create_article(article: ArticleCreate, db: Session = Depends(get_db)):
    """Crée un nouvel article"""
    return ArticleService.create_article(db, article)


@router.put("/{article_id}", response_model=ArticleResponse)
def update_article(
    article_id: int, article: ArticleUpdate, db: Session = Depends(get_db)
):
    """Met à jour un article existant"""
    updated_article = ArticleService.update_article(db, article_id, article)
    if not updated_article:
        raise HTTPException(status_code=404, detail="Article non trouvé")
    return updated_article


@router.delete("/{article_id}", status_code=204)
def delete_article(article_id: int, db: Session = Depends(get_db)):
    """Supprime un article"""
    if not ArticleService.delete_article(db, article_id):
        raise HTTPException(status_code=404, detail="Article non trouvé")


@router.post("/{article_id}/like", response_model=ArticleResponse)
def like_article(article_id: int, db: Session = Depends(get_db)):
    """Ajoute un like à un article"""
    article = ArticleService.increment_likes(db, article_id)
    if not article:
        raise HTTPException(status_code=404, detail="Article non trouvé")
    return article
