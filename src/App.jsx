import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';
import { articles, categories } from './data/mockData';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (query) => {
    if (query.trim() === '') {
      setSearchResults([]);
      navigate('/search');
      return;
    }

    const filteredArticles = articles.filter(article =>
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      article.content.some(block =>
        block.type === 'paragraph' && block.text.toLowerCase().includes(query.toLowerCase())
      )
    );
    setSearchResults(filteredArticles);
    navigate('/search?q=' + encodeURIComponent(query));
  };

  return (
    <div className="app-container">
      <Header onSearch={handleSearch} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:slug" element={<ArticlePage />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route
            path="/search"
            element={<SearchPage searchResults={searchResults} articles={articles} />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
