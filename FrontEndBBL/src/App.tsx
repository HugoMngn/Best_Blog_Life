/**
 * App: top-level component for the frontend application
 * - Integrates hooks (useArticles, useSearch)
 * - Switches between list and detail views
 * - Provides modals for create/edit operations
 */
import { useState, useEffect } from 'react';
import { useArticles } from './hooks/useArticles';
import { useSearch } from './hooks/useSearch';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SearchBar } from './components/common/SearchBar';
import { ArticleList } from './components/articles/ArticleList';
import { ArticleDetail } from './components/articles/ArticleDetail';
import { CreateArticleModal } from './components/articles/CreateArticleModal';
import { EditArticleModal } from './components/articles/EditArticleModal';
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

  useEffect(() => {
    fetchArticles(debouncedQuery || undefined);
  }, [debouncedQuery, fetchArticles]);

  const handleCreateArticle = async (articleData: CreateArticleDto & { password: string }) => {
    await createArticle(articleData);
    setIsCreateModalOpen(false);
  };

  const handleUpdateArticle = async (
    articleData: CreateArticleDto,
    password: string
  ) => {
    if (!selectedArticle) return;
    await updateArticle(selectedArticle.id, articleData, password);
    setIsEditModalOpen(false);
    setSelectedArticle(null);
  };

  const handleViewArticle = (article: Article) => {
    setSelectedArticle(article);
    setViewMode('detail');
  };

  const handleEditArticle = (article: Article) => {
    setSelectedArticle(article);
    setIsEditModalOpen(true);
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedArticle(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      <Header onCreateClick={() => setIsCreateModalOpen(true)} />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        {viewMode === 'list' ? (
          <>
            <div className="mb-8 max-w-2xl mx-auto">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                onClear={clearSearch}
                placeholder="Rechercher un article par titre, contenu ou auteur..."
              />
            </div>

            {debouncedQuery && (
              <div className="mb-6 text-center">
                <p className="text-gray-600 text-lg">
                  Résultats pour :{' '}
                  <span className="font-semibold text-blue-600">{debouncedQuery}</span>
                  <button
                    onClick={clearSearch}
                    className="ml-3 text-blue-600 hover:text-blue-700 underline font-medium"
                  >
                    Effacer
                  </button>
                </p>
              </div>
            )}

            <ArticleList
              articles={articles}
              loading={loading}
              error={error}
              onLike={likeArticle}
              onView={handleViewArticle}
              onRetry={() => fetchArticles()}
            />
          </>
        ) : (
          <>
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

      <CreateArticleModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateArticle}
      />

      <EditArticleModal
        isOpen={isEditModalOpen}
        article={selectedArticle}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedArticle(null);
        }}
        onSubmit={handleUpdateArticle}
      />
    </div>
  );
}

export default App;