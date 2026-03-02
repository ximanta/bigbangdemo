import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import BlogPostCard from '../components/BlogPostCard';
import CallToAction from '../components/CallToAction';
import { blogPosts } from '../data/mockData';

const BlogPage = () => {
  return (
    <div className="blog-page">
      <Breadcrumbs />
      <section className="section-padding">
        <div className="container">
          <div className="section-heading">
            <h2>Our Latest Blog Posts</h2>
            <p>
              Stay informed with expert insights, tips, and news on plastic surgery,
              beauty, and wellness.
            </p>
          </div>
          <div className="grid-2-cols">
            {blogPosts.map((post) => (
              <BlogPostCard
                key={post.id}
                post={post}
              />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <CallToAction
              text="Subscribe to Our Newsletter"
              to="/contact"
              type="primary"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
