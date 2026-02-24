import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { articles } from '../data/mockData';

const ARTICLES_PER_PAGE = 6;

function CategoryPage() {
  const { categoryName } = useParams();
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setCurrentPage(1); // Reset page when category changes

    const categoryArticles = articles.filter(
      (article) => article.category.toLowerCase() === categoryName.toLowerCase()
    );

    if (categoryArticles.length > 0) {
      setFilteredArticles(categoryArticles.sort((a, b) => new Date(b.date) - new Date(a.date)));
      setLoading(false);
    } else {
      setFilteredArticles([]);
      setError(`No articles found for category: ${categoryName}`);
      setLoading(false);
    }
  }, [categoryName]);

  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const currentArticles = filteredArticles.slice(startIndex, startIndex + ARTICLES_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error && filteredArticles.length === 0) {
    return (
      <div className="container mt-lg pb-lg">
        <h2 className="text-center mb-lg">Category: {categoryName}</h2>
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="category-page container">
      <h1 className="category-page__title text-center mb-lg">
        Category: {categoryName}
      </h1>

      {currentArticles.length > 0 ? (
        <div className="grid-layout category-page__article-list">
          {currentArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <p className="text-center">No articles found in this category.</p>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default CategoryPage;
