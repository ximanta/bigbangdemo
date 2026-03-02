import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProceduresPage from './pages/ProceduresPage';
import ProcedureDetailPage from './pages/ProcedureDetailPage';
import SurgeonPage from './pages/SurgeonPage';
import GalleryPage from './pages/GalleryPage';
import TestimonialsPage from './pages/TestimonialsPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="/procedures"
            element={<ProceduresPage />}
          />
          <Route
            path="/procedures/:id"
            element={<ProcedureDetailPage />}
          />
          <Route
            path="/surgeon"
            element={<SurgeonPage />}
          />
          <Route
            path="/gallery"
            element={<GalleryPage />}
          />
          <Route
            path="/testimonials"
            element={<TestimonialsPage />}
          />
          <Route
            path="/blog"
            element={<BlogPage />}
          />
          <Route
            path="/blog/:id"
            element={<BlogPostPage />}
          />
          <Route
            path="/contact"
            element={<ContactPage />}
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
