"""
Configuration de la base de données
Gestion de la connexion et des sessions SQLAlchemy
"""
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# URL de connexion SQLite (pour la simplicité)
DATABASE_URL = "sqlite:///./blog.db"

# Création du moteur de base de données
engine = create_engine(
    DATABASE_URL, 
    connect_args={"check_same_thread": False}  # Nécessaire pour SQLite
)

# Session locale pour les opérations de base de données
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Classe de base pour les modèles
Base = declarative_base()

def get_db():
    """
    Générateur de session de base de données
    Utilisé comme dépendance FastAPI pour injecter la session
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()