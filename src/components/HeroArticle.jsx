import React from 'react';
import { Link } from 'react-router-dom';

function HeroArticle({ article }) {
  if (!article) {
    return null;
  }

  const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className="hero-article">
      <Link to={`/article/${article.slug}`} className="hero-article__link">
        <div className="hero-article__image-wrapper">
          <img
            src={article.image}
            alt={article.title}
            className="hero-article__image"
          />
        </div>
        <div className="hero-article__content">
          <h2 className="hero-article__title">
            {article.title}
          </h2>
          <p className="hero-article__excerpt">
            {article.excerpt}
          </p>
          <div className="hero-article__meta">
            <span className="hero-article__category">
              {article.category}
            </span>
            <span className="hero-article__date">
              {formattedDate}
            </span>
            <span className="hero-article__author">
              By {article.author}
            </span>
          </div>
          <button className="button button--primary hero-article__read-more">
            Read More
          </button>
        </div>
      </Link>
    </section>
  );
}

export default HeroArticle;
