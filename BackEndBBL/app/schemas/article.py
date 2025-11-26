"""
Schémas Pydantic pour la validation des articles
"""

from pydantic import BaseModel, Field, validator
from datetime import datetime
from typing import Optional


class ArticleBase(BaseModel):
    """Schéma de base pour un article"""

    title: str = Field(
        ..., min_length=1, max_length=200, description="Titre de l'article"
    )
    content: str = Field(..., min_length=1, description="Contenu de l'article")
    author: str = Field(
        ..., min_length=1, max_length=100, description="Auteur de l'article"
    )

    @validator("title", "author")
    def validate_not_empty(cls, v):
        """Valide que les champs ne sont pas vides après trim"""
        if not v.strip():
            raise ValueError("Le champ ne peut pas être vide")
        return v.strip()


class ArticleCreate(ArticleBase):
    """Schéma pour la création d'un article"""

    pass


class ArticleUpdate(BaseModel):
    """Schéma pour la mise à jour d'un article"""

    title: Optional[str] = Field(None, min_length=1, max_length=200)
    content: Optional[str] = Field(None, min_length=1)


class ArticleResponse(ArticleBase):
    """Schéma de réponse pour un article"""

    id: int
    likes_count: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
