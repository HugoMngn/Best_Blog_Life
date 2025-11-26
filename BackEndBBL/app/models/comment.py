"""
Modèle de données pour les commentaires
"""

from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..database import Base


class Comment(Base):
    """Modèle représentant un commentaire sur un article"""

    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    article_id = Column(Integer, ForeignKey("articles.id"), nullable=False)
    author = Column(String(100), nullable=False)
    content = Column(Text, nullable=False)
    likes_count = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relation avec l'article
    article = relationship("Article", back_populates="comments")
