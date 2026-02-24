import React from 'react';
import { Link } from 'react-router-dom';

function ArticleCard({ article }) {
  const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="article-card">
      <Link to={`/article/${article.slug}`} className="article-card__link">
        <div className="article-card__image-wrapper">
          <img
            src={article.image}
            alt={article.title}
            className="article-card__image"
          />
        </div>
        <div className="article-card__content">
          <h3 className="article-card__title">
            {article.title}
          </h3>
          <p className="article-card__excerpt">
            {article.excerpt}
          </p>
          <div className="article-card__meta">
            <span className="article-card__category">
              {article.category}
            </span>
            <span className="article-card__date">
              {formattedDate}
            </span>
            <span className="article-card__author">
              By {article.author}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default ArticleCard;
