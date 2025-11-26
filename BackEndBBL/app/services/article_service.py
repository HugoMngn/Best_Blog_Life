"""
Service métier pour la gestion des articles
Encapsule la logique métier liée aux articles
"""

from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import List, Optional
from app.models.article import Article
from app.schemas.article import ArticleCreate, ArticleUpdate


class ArticleService:
    """Service pour les opérations CRUD sur les articles"""

    @staticmethod
    def get_all_articles(
        db: Session, search: Optional[str] = None, skip: int = 0, limit: int = 100
    ) -> List[Article]:
        """
        Récupère tous les articles avec recherche optionnelle

        Args:
            db: Session de base de données
            search: Terme de recherche optionnel
            skip: Nombre d'enregistrements à sauter
            limit: Nombre maximum d'enregistrements à retourner
        """
        query = db.query(Article)

        if search:
            search_term = f"%{search}%"
            query = query.filter(
                or_(
                    Article.title.ilike(search_term),
                    Article.content.ilike(search_term),
                    Article.author.ilike(search_term),
                )
            )

        return query.order_by(Article.created_at.desc()).offset(skip).limit(limit).all()

    @staticmethod
    def get_article_by_id(db: Session, article_id: int) -> Optional[Article]:
        """Récupère un article par son ID"""
        return db.query(Article).filter(Article.id == article_id).first()

    @staticmethod
    def create_article(db: Session, article_data: ArticleCreate) -> Article:
        """Crée un nouvel article"""
        new_article = Article(**article_data.model_dump())
        db.add(new_article)
        db.commit()
        db.refresh(new_article)
        return new_article

    @staticmethod
    def update_article(
        db: Session, article_id: int, article_data: ArticleUpdate
    ) -> Optional[Article]:
        """Met à jour un article existant"""
        article = ArticleService.get_article_by_id(db, article_id)
        if not article:
            return None

        update_data = article_data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(article, field, value)

        db.commit()
        db.refresh(article)
        return article

    @staticmethod
    def delete_article(db: Session, article_id: int) -> bool:
        """Supprime un article"""
        article = ArticleService.get_article_by_id(db, article_id)
        if not article:
            return False

        db.delete(article)
        db.commit()
        return True

    @staticmethod
    def increment_likes(db: Session, article_id: int) -> Optional[Article]:
        """Incrémente le nombre de likes d'un article"""
        article = ArticleService.get_article_by_id(db, article_id)
        if not article:
            return None

        article.likes_count += 1
        db.commit()
        db.refresh(article)
        return article
