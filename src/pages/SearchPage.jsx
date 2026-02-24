import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import SearchInput from '../components/SearchInput';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { articles as allArticles } from '../data/mockData';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchPage({ searchResults: propSearchResults }) {
  const queryParams = useQuery();
  const initialSearchQuery = queryParams.get('q') || '';
  const [currentSearchResults, setCurrentSearchResults] = useState(propSearchResults);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If the propSearchResults are from an internal app search, use them directly
    if (propSearchResults && propSearchResults.length > 0 && queryParams.get('q')) {
      setCurrentSearchResults(propSearchResults);
    } else if (initialSearchQuery) {
      // If the page is accessed directly via URL with a query, perform search
      handleSearch(initialSearchQuery);
    } else {
      setCurrentSearchResults([]);
    }
  }, [initialSearchQuery, propSearchResults]);

  const handleSearch = (query) => {
    setLoading(true);
    setError(null);
    if (query.trim() === '') {
      setCurrentSearchResults([]);
      setLoading(false);
      return;
    }

    try {
      const filteredArticles = allArticles.filter(article =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        article.content.some(block =>
          block.type === 'paragraph' && block.text.toLowerCase().includes(query.toLowerCase())
        )
      );
      setCurrentSearchResults(filteredArticles);
    } catch (err) {
      setError('An error occurred during search.');
      setCurrentSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page container">
      <h1 className="search-page__title text-center mb-lg">
        Search Results
      </h1>
      <div className="search-page__input-wrapper mb-lg">
        <SearchInput onSearchSubmit={handleSearch} initialQuery={initialSearchQuery} />
      </div>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <div className="search-page__results">
          {currentSearchResults.length > 0 ? (
            <p className="search-page__count mb-md">
              Found {currentSearchResults.length} articles for "{initialSearchQuery || '...'}"
            </p>
          ) : (
            initialSearchQuery && <p className="search-page__no-results mb-md">
              No articles found for "{initialSearchQuery}". Please try a different search term.
            </p>
          )}
          <div className="grid-layout">
            {currentSearchResults.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
