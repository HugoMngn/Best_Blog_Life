# app/api/endpoints/comments.py
from fastapi import APIRouter, Depends, HTTPException, Query
from typing import List
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.comment_service import CommentService
from app.schemas.comment import CommentCreate, CommentResponse

router = APIRouter()


@router.get("/", response_model=List[CommentResponse])
def list_comments(
    article_id: int = Query(..., description="ID de l'article"),
    db: Session = Depends(get_db),
):
    """
    Récupère les commentaires pour un article donné.
    GET /api/comments?article_id=1
    """
    # Fetch SQLAlchemy model instances and return Pydantic responses.
    comments = CommentService.get_comments_by_article(db, article_id)
    # The CommentResponse schema handles model -> JSON conversion (from_orm)
    return [
        {
            "id": c.id,
            "article_id": c.article_id,
            "author": c.author,
            "content": c.content,
            "created_at": c.created_at,
        }
        for c in comments
    ]


@router.post("/", status_code=201, response_model=CommentResponse)
def create_comment(payload: CommentCreate, db: Session = Depends(get_db)):
    """
    Crée un commentaire.
    POST /api/comments
    body: { "article_id": 1, "author": "Paul", "content": "Super article !" }
    """
    # Create and return the saved comment using the Pydantic schema for response
    comment = CommentService.create_comment(db, payload)
    return {
        "id": comment.id,
        "article_id": comment.article_id,
        "author": comment.author,
        "content": comment.content,
        "created_at": comment.created_at,
    }


@router.delete("/{comment_id}", status_code=204)
def delete_comment(comment_id: int, db: Session = Depends(get_db)):
    """
    Supprime un commentaire par son id.
    """
    ok = CommentService.delete_comment(db, comment_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Comment not found")
