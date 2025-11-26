
# Application de Blog Best_Blog_Life - Clean Code

Application de blog complète avec React/TypeScript (frontend) et Python/FastAPI (backend).

## Principes Clean Code appliqués

✅ **Nommage significatif** - Variables, fonctions et composants avec des noms expressifs
✅ **Fonctions claires** - Chaque fonction a une responsabilité unique
✅ **Organisation modulaire** - Séparation des préoccupations (services, composants, types)
✅ **Gestion d'erreurs** - Try/catch avec messages clairs
✅ **Tests unitaires** - Couverture des fonctionnalités principales
✅ **Documentation** - Commentaires pertinents et documentation OpenAPI

## Installation

```bash
# Cloner le projet
git clone <url>
cd blog-application

# Backend
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Frontend
cd ../frontend
npm install
```

## Lancement

```bash
# Backend (port 8000)
cd backend
source venv/bin/activate
uvicorn app.main:app --reload

# Frontend (port 5173)
cd frontend
npm run dev
```

## Documentation API

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Tests

```bash
# Backend
cd backend
pytest

# Frontend
cd frontend
npm test
```

## Fonctionnalités

- ✍️ Publication d'articles
- 💬 Système de commentaires
- ❤️ Likes sur articles et commentaires
- 🔍 Recherche d'articles
- 🗑️ Suppression d'articles
