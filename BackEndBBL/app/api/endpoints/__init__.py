# app/api/endpoints/__init__.py
"""
API package initializer
Expose les routeurs d'API (articles, comments)
"""
from . import articles  # existant dans ton projet
from . import (
    comments,
)  # nouveau - import nécessaire pour que les modèles soient enregistrés
