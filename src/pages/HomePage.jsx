import React, { useState, useEffect } from 'react';
import ArticleCard from '../components/ArticleCard';
import HeroArticle from '../components/HeroArticle';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { articles, categories } from '../data/mockData';
import { Link } from 'react-router-dom';

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [latestArticles, setLatestArticles] = useState([]);

  useEffect(() => {
    // Simulate data fetching
    const fetchData = () => {
      try {
        setLoading(true);
        // Sort articles by date to get latest
        const sortedArticles = [...articles].sort((a, b) => new Date(b.date) - new Date(a.date));
        setFeaturedArticle(sortedArticles[0]);
        setLatestArticles(sortedArticles.slice(1, 10)); // Get top 9 latest articles after featured
        setLoading(false);
      } catch (err) {
        setError('Failed to load articles.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="home-page container">
      {featuredArticle && (
        <section className="home-page__hero mb-lg">
          <HeroArticle article={featuredArticle} />
        </section>
      )}

      <section className="home-page__categories mb-lg">
        <h2 className="text-center mb-lg">Explore Categories</h2>
        <div className="home-page__category-list">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/category/${category.toLowerCase()}`}
              className="button button--secondary home-page__category-button"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section className="home-page__latest-articles">
        <h2 className="text-center mb-lg">Latest Articles</h2>
        <div className="grid-layout">
          {latestArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
