"""
Like model

Simplified like tracking: each like is a separate record linked to an article_id.
This can be extended later to add a user_id or to enforce unique likes per user.
"""

from sqlalchemy import Column, Integer, DateTime, func
from app.database import Base


class Like(Base):
    """SQLAlchemy model representing the 'likes' table."""

    __tablename__ = "likes"

    id = Column(Integer, primary_key=True, index=True)
    article_id = Column(Integer, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
