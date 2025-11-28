"""
Schémas Pydantic pour la validation des commentaires
"""

from pydantic import BaseModel, Field, validator
from datetime import datetime
from typing import Optional


class CommentBase(BaseModel):
    """Schéma de base pour un commentaire"""

    author: str = Field(..., min_length=1, max_length=100)
    content: str = Field(..., min_length=1, description="Contenu du commentaire")

    @validator("author", "content")
    def validate_not_empty(cls, v):
        """Valide que les champs ne sont pas vides"""
        if not v.strip():
            raise ValueError("Le champ ne peut pas être vide")
        return v.strip()


class CommentCreate(CommentBase):
    """Schéma pour la création d'un commentaire"""

    article_id: int = Field(..., gt=0, description="ID de l'article associé")


class CommentResponse(CommentBase):
    """Schéma de réponse pour un commentaire"""

    id: int
    article_id: int
    likes_count: int
    created_at: datetime
    likes_count: Optional[int] = 0

    class Config:
        from_attributes = True
