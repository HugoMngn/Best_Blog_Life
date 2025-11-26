
# **Frontend**-**Application** de **Blog**

**Application** frontend moderne construite avec **React**,**TypeScript** et **Tailwind**CSS**.**

## **Principes**Clean**Code**

**-****Composants réutilisables******:**Button**,**Input**,**Modal**, etc**.**
**-****Hooks personnalisés******: useArticles**,** useSearch pour la logique métier
**-****Types stricts******:**TypeScript** pour la sécurité des types
**-****Validation******:**Validation** côté client avec messages d'erreur clairs
**-****Architecture en couches******:**S**éparation services**/**composants**/**types

## **Installation**

**`**`**`**bash npm install **`**`**`**

## **Scripts** disponibles

**`**`**`**bash

# Développement

npm run dev

# Build production

npm run build

# Preview du build

npm run preview

# Tests

npm test

# Linting

npm run lint
**`**`**`**

## **Structure** des dossiers

**`**`**`** src/ ├── components/       # Composants React │   ├── articles/    # Composants liés aux articles │   ├── common/      # Composants réutilisables │   └── layout/      # Composants de mise en page ├── hooks/           # Hooks personnalisés ├── services/        # Services API ├── types/           # Types TypeScript └── utils/           # Fonctions utilitaires **`**`**`**

## **Fonctionnalités**

✅ **Création** d'articles avec validation
✅ **Modification** et suppression
✅ **Système** de likes
✅ **Recherche** en temps réel avec debounce
✅ **Interface** responsive
✅ **Gestion** d'erreurs élégante
✅ **Modals** pour les formulaires
