import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SocialShareButtons from '../components/SocialShareButtons';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import ArticleCard from '../components/ArticleCard';
import { articles } from '../data/mockData';

function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const foundArticle = articles.find((a) => a.slug === slug);

    if (foundArticle) {
      setArticle(foundArticle);
      // Simulate fetching related articles (e.g., from same category, excluding current)
      const related = articles.filter(
        (a) => a.category === foundArticle.category && a.id !== foundArticle.id
      ).slice(0, 3);
      setRelatedArticles(related);
      setLoading(false);
    } else {
      setError('Article not found.');
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!article) {
    return <ErrorMessage message="Article data is missing." />;
  }

  const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const currentArticleUrl = window.location.href;

  return (
    <article className="article-page container">
      <h1 className="article-page__title">{article.title}</h1>
      <div className="article-page__meta">
        <span className="article-page__author">By {article.author}</span>
        <span className="article-page__date">{formattedDate}</span>
        <Link
          to={`/category/${article.category.toLowerCase()}`}
          className="article-page__category-link"
        >
          {article.category}
        </Link>
      </div>

      <div className="article-page__social-share">
        <SocialShareButtons
          articleTitle={article.title}
          articleUrl={currentArticleUrl}
        />
      </div>

      <div className="article-page__body">
        {article.image && (
          <figure className="article-page__main-image-wrapper">
            <img
              src={article.image}
              alt={article.title}
              className="article-page__main-image"
            />
            {article.imageCaption && (
              <figcaption className="article-page__image-caption">
                {article.imageCaption}
              </figcaption>
            )}
          </figure>
        )}

        {article.content.map((block, index) => {
          if (block.type === 'paragraph') {
            return <p key={index} className="article-page__paragraph">{block.text}</p>;
          } else if (block.type === 'image') {
            return (
              <figure key={index} className="article-page__inline-image-wrapper">
                <img
                  src={block.src}
                  alt={block.caption || 'Article image'}
                  className="article-page__inline-image"
                />
                {block.caption && (
                  <figcaption className="article-page__image-caption">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          } else if (block.type === 'video') {
            return (
              <div key={index} className="article-page__video-wrapper">
                <iframe
                  src={block.src}
                  title={block.caption || 'Embedded video'}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="article-page__video"
                ></iframe>
                {block.caption && (
                  <p className="article-page__video-caption">{block.caption}</p>
                )}
              </div>
            );
          }
          return null;
        })}
      </div>

      {relatedArticles.length > 0 && (
        <section className="article-page__related-articles">
          <h2 className="article-page__related-title">Related Articles</h2>
          <div className="grid-layout">
            {relatedArticles.map((related) => (
              <ArticleCard key={related.id} article={related} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

export default ArticlePage;
