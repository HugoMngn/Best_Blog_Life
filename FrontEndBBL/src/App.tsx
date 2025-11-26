/**
 * Composant principal de l'application
 * Gère l'état global et la navigation
 */
import React, { useState, useEffect } from 'react';
import { useArticles } from './hooks/useArticles';
import { useSearch } from './hooks/useSearch';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SearchBar } from './components/common/SearchBar';
import { ArticleList } from './components/articles/ArticleList';
import { ArticleForm } from './components/articles/ArticleForm';
import { ArticleDetail } from './components/articles/ArticleDetail';
import { Modal } from './components/common/Modal';
import { Article, CreateArticleDto } from './types/article.types';

type ViewMode = 'list' | 'detail';

function App() {
  const {
    articles,
    loading,
    error,
    fetchArticles,
    createArticle,
    updateArticle,
    deleteArticle,
    likeArticle,
  } = useArticles();

  const { searchQuery, debouncedQuery, setSearchQuery, clearSearch } = useSearch();

  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Effectue la recherche quand la query debounced change
  useEffect(() => {
    fetchArticles(debouncedQuery || undefined);
  }, [debouncedQuery, fetchArticles]);

  /**
   * Gère la création d'un article
   */
  const handleCreateArticle = async (articleData: CreateArticleDto) => {
    await createArticle(articleData);
    setIsCreateModalOpen(false);
  };

  /**
   * Gère la modification d'un article
   */
  const handleUpdateArticle = async (articleData: CreateArticleDto) => {
    if (!selectedArticle) return;

    await updateArticle(selectedArticle.id, {
      title: articleData.title,
      content: articleData.content,
    });

    setIsEditModalOpen(false);
    setSelectedArticle(null);
  };

  /**
   * Affiche le détail d'un article
   */
  const handleViewArticle = (article: Article) => {
    setSelectedArticle(article);
    setViewMode('detail');
  };

  /**
   * Ouvre le formulaire d'édition
   */
  const handleEditArticle = (article: Article) => {
    setSelectedArticle(article);
    setIsEditModalOpen(true);
  };

  /**
   * Retourne à la liste
   */
  const handleBackToList = () => {
    setViewMode('list');
    setSelectedArticle(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
      <Header onCreateClick={() => setIsCreateModalOpen(true)} />

      <main className="flex-1 container mx-auto px-4 py-8">
        {viewMode === 'list' ? (
          <>
            {/* Barre de recherche */}
            <div className="mb-8 max-w-2xl mx-auto">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                onClear={clearSearch}
                placeholder="Rechercher un article par titre, contenu ou auteur..."
              />
            </div>

            {/* Indicateur de recherche */}
            {debouncedQuery && (
              <div className="mb-4 text-center">
                <p className="text-gray-600">
                  Résultats pour : <span className="font-medium">{debouncedQuery}</span>
                  <button
                    onClick={clearSearch}
                    className="ml-2 text-blue-600 hover:text-blue-700 underline"
                  >
                    Effacer
                  </button>
                </p>
              </div>
            )}

            {/* Liste des articles */}
            <ArticleList
              articles={articles}
              loading={loading}
              error={error}
              onLike={likeArticle}
              onDelete={deleteArticle}
              onEdit={handleEditArticle}
              onView={handleViewArticle}
              onRetry={() => fetchArticles()}
            />
          </>
        ) : (
          <>
            {/* Détail de l'article */}
            {selectedArticle && (
              <div className="max-w-4xl mx-auto">
                <ArticleDetail
                  article={selectedArticle}
                  onLike={likeArticle}
                  onEdit={handleEditArticle}
                  onDelete={deleteArticle}
                  onBack={handleBackToList}
                />
              </div>
            )}
          </>
        )}
      </main>

      <Footer />

      {/* Modal de création */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Créer un nouvel article"
      >
        <ArticleForm
          onSubmit={handleCreateArticle}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      {/* Modal d'édition */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedArticle(null);
        }}
        title="Modifier l'article"
      >
        {selectedArticle && (
          <ArticleForm
            article={selectedArticle}
            onSubmit={handleUpdateArticle}
            onCancel={() => {
              setIsEditModalOpen(false);
              setSelectedArticle(null);
            }}
            isEditing
          />
        )}
      </Modal>
    </div>
  );
}

export default App;