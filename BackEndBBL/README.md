# **Backend**-**API**Blog

**API**REST construite avec **FastAPI** pour une application de blog moderne**.**

## **Fonctionnalités**

✅ ******CRUD**Articles**** avec protection par mot de passe
✅ ******Système de commentaires******
✅ ******Likes****** sur les articles
✅ ******Recherche****** d'articles
✅ ******Documentation**OpenAPI****automatique**(**Swagger**/**ReDoc**)**
✅ ******Base de données **SQLite****(peut être changée facilement**)**
✅ ******Sécurité******:**Hash** des mots de passe avec **SHA**-**256**

## **Installation**

**`**`**`**bash

# Créer l'environnement virtuel

python -m venv venv

# Activer l'environnement

# Sur macOS/Linux:

source venv/bin/activate

# Sur Windows:

venv\Scripts\activate

# Installer les dépendances

pip install -r requirements.txt
**`**`**`**

## **Lancement**

**`**`**`**bash

# Mode développement avec rechargement automatique

uvicorn app.main:app --reload

# Mode production

uvicorn app.main:app --host 0.0.0.0 --port 8000
**`**`**`**

## **Documentation**API

**Une** fois le serveur lancé**,** accédez à **:**

**-****Swagger**UI****: http**:**/**/**localhost**:**8000**/**docs
**-****ReDoc******: http**:**/**/**localhost**:**8000**/**redoc
**-****OpenAPI**Schema****: http**:**/**/**localhost**:**8000**/**openapi**.**json

## **Endpoints**Principaux

### **Articles**

**-**`**GET /api/articles**`**-**Liste tous les **articles**(avec recherche**)**
**-**`**GET /api/articles/{id}**`**-**Détail d'un article
**-**`**POST /api/articles**`**-**Créer un **article**(avec mot de passe**)**
**-**`**PUT /api/articles/{id}**`**-**Modifier un **article**(nécessite mot de passe**)**
**-**`**DELETE /api/articles/{id}**`**-**Supprimer un **article**(nécessite mot de passe**)**
**-**`**POST /api/articles/{id}/like**`**-**Liker un article

### **Commentaires**

**-**`**GET /api/comments/article/{article_id}**`**-**Liste des commentaires d'un article
**-**`**POST /api/comments**`**-**Ajouter un commentaire
**-**`**DELETE /api/comments/{id}**`**-**Supprimer un commentaire

## **Tests**

**`**`**`**bash pytest **`**`**`**

## **Structure**

**`**`**`** backend/ ├── app/ │   ├── api/endpoints/     # Routes API │   ├── core/              # Configuration et sécurité │   ├── models/            # Modèles SQLAlchemy │   ├── schemas/           # Schémas Pydantic │   ├── services/          # Logique métier │   ├── database.py        # Configuration DB │   └── main.py            # Point d'entrée ├── tests/                 # Tests unitaires ├── requirements.txt       # Dépendances Python └── README.md **`**`**`**

## **Variables** d'**Environnement**

**Vous** pouvez créer un fichier **`**.env**`**:

**`**`**`**env DATABASE_URL=sqlite:///./blog.db CORS_ORIGINS=http://localhost:5173,http://localhost:3000 **`**`**`**

## **S**écurité

**-** ✅ **Mots** de passe hashés avec **SHA**-**256**
**-** ✅ **CORS** configuré
**-** ✅ **Validation** des données avec **Pydantic**
**-** ✅ **Protection** contre les injections **SQL**(**ORM**SQLAlchemy**)**

## **Base** de **Données**

**Par** défaut**,** utilise **SQLite**(**`**blog.db**`**)**.**Pour changer **:**

**`**`**`**python

# Dans app/database.py

DATABASE_URL = "postgresql://user:password@localhost/dbname"

# ou

DATABASE_URL = "mysql://user:password@localhost/dbname"
**`**`**`**
