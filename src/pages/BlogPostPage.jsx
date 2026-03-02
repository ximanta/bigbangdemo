import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { blogPosts } from '../data/mockData';
import Breadcrumbs from '../components/Breadcrumbs';
import CallToAction from '../components/CallToAction';
import { Facebook, Twitter, Linkedin } from 'lucide-react';

const BlogPostPage = () => {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="blog-post-page">
      <Breadcrumbs />
      <section className="section-padding">
        <div className="container">
          <header className="blog-post-detail-header">
            <h1>{post.title}</h1>
            <p className="meta">
              By {post.author} on {post.date}
            </p>
          </header>

          <img
            src={post.imageUrl}
            alt={post.title}
            className="blog-post-detail-image"
          />

          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>

          <div style={{ marginTop: '40px', borderTop: '1px solid var(--border-color)', paddingTop: '20px', textAlign: 'center' }}>
            <h3>Share This Post</h3>
            <div className="footer-social-links" style={{ justifyContent: 'center' }}>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Facebook"
              >
                <Facebook />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${post.title}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Twitter"
              >
                <Twitter />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${post.title}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
              >
                <Linkedin />
              </a>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <CallToAction
              text="Back to Blog"
              to="/blog"
              type="secondary"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPostPage;
