"""Service layer for comments: provides helper functions to fetch, create and delete comments.
This module uses the Pydantic schema in `app.schemas.comment` to validate inputs.
"""

from sqlalchemy.orm import Session
from typing import List
from app.models.comment import Comment
from app.schemas.comment import CommentCreate  # reuse validation schema from Pydantic

# Single module-level docstring is above; keep code concise below.


class CommentService:
    """Service layer for comment-related operations.

    Methods are static and receive a SQLAlchemy session which is managed by the
    FastAPI dependency injection (`get_db`). Methods return model objects
    (SQLAlchemy instances) or booleans when an action simply succeeds/fails.
    """

    @staticmethod
    def get_comments_by_article(db: Session, article_id: int) -> List[Comment]:
        """Return comments for a specific article, ordered by created date.

        Args:
            db: SQLAlchemy session
            article_id: id of the article to get comments for
        """
        query = db.query(Comment).filter(Comment.article_id == article_id)
        return query.order_by(Comment.created_at).all()

    @staticmethod
    def create_comment(db: Session, comment_data: CommentCreate) -> Comment:
        """Create and return a new comment instance.

        Uses the `CommentCreate` Pydantic schema for input validation before
        persisting to the DB.
        """
        new_comment = Comment(
            article_id=comment_data.article_id,
            author=comment_data.author,
            content=comment_data.content,
        )
        db.add(new_comment)
        db.commit()
        db.refresh(new_comment)
        return new_comment

    @staticmethod
    def delete_comment(db: Session, comment_id: int) -> bool:
        """Delete a comment by id.

        Returns True on success, False if the comment does not exist.
        """
        query = db.query(Comment).filter(Comment.id == comment_id)
        existing_comment = query.first()
        if not existing_comment:
            return False
        query.delete()
        db.commit()
        return True
