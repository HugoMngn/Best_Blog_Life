"""
Unit tests for article endpoints

These tests use an in-memory SQLite database and override the FastAPI
database dependency to ensure isolation. Each test recreates the schema so
they are independent from one another.
"""

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app
from app.database import Base, get_db

# Base de données de test en mémoire
TEST_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(TEST_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_db():
    """Override dependency: yield a transient session bound to the test DB.

    This is used to replace the app's `get_db` dependency so the tests operate
    on a separate database instance using the same ORM models.
    """
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)


@pytest.fixture(autouse=True)
def setup_database():
    """Crée et nettoie la base de données avant chaque test"""
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


def test_create_article():
    """Test de création d'un article"""
    response = client.post(
        "/api/articles/",
        json={
            "title": "Test Article",
            "content": "This is a test article content",
            "author": "Test Author",
        },
    )
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Test Article"
    assert data["author"] == "Test Author"
    assert "id" in data


def test_get_all_articles():
    """Test de récupération de tous les articles"""
    # Créer quelques articles
    client.post(
        "/api/articles/",
        json={"title": "Article 1", "content": "Content 1", "author": "Author 1"},
    )
    client.post(
        "/api/articles/",
        json={"title": "Article 2", "content": "Content 2", "author": "Author 2"},
    )

    response = client.get("/api/articles/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2


def test_search_articles():
    """Test de recherche d'articles"""
    client.post(
        "/api/articles/",
        json={"title": "Python Tutorial", "content": "Learn Python", "author": "John"},
    )
    client.post(
        "/api/articles/",
        json={"title": "JavaScript Guide", "content": "Learn JS", "author": "Jane"},
    )

    response = client.get("/api/articles/?search=Python")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["title"] == "Python Tutorial"


def test_like_article():
    """Test d'ajout de like à un article"""
    # Créer un article
    create_response = client.post(
        "/api/articles/",
        json={"title": "Test", "content": "Content", "author": "Author"},
    )
    article_id = create_response.json()["id"]

    # Liker l'article
    like_response = client.post(f"/api/articles/{article_id}/like")
    assert like_response.status_code == 200
    assert like_response.json()["likes_count"] == 1


def test_delete_article():
    """Test de suppression d'un article"""
    # Créer un article
    create_response = client.post(
        "/api/articles/",
        json={"title": "To Delete", "content": "Content", "author": "Author"},
    )
    article_id = create_response.json()["id"]

    # Supprimer l'article
    delete_response = client.delete(f"/api/articles/{article_id}")
    assert delete_response.status_code == 204

    # Vérifier que l'article n'existe plus
    get_response = client.get(f"/api/articles/{article_id}")
    assert get_response.status_code == 404
