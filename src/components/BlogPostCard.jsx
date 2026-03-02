import React from 'react';
import { Link } from 'react-router-dom';
import CallToAction from './CallToAction';

const BlogPostCard = ({ post }) => {
  return (
    <div className="blog-post-card">
      <img
        src={post.imageUrl}
        alt={post.title}
        className="blog-post-card-image"
      />
      <div className="blog-post-card-content">
        <h3>{post.title}</h3>
        <p className="meta">
          By {post.author} on {post.date}
        </p>
        <p>{post.excerpt}</p>
        <CallToAction
          text="Read More"
          to={`/blog/${post.id}`}
          type="secondary"
        />
      </div>
    </div>
  );
};

export default BlogPostCard;
