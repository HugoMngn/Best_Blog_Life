"""
Modèle de données pour les articles
"""

from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..database import Base


class Article(Base):
    """Modèle représentant un article de blog"""

    __tablename__ = "articles"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False, index=True)
    content = Column(Text, nullable=False)
    author = Column(String(100), nullable=False, index=True)
    likes_count = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relation avec les commentaires
    comments = relationship(
        "Comment", back_populates="article", cascade="all, delete-orphan"
    )
