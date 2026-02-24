import React, { useState, useEffect } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import SearchFilterPanel from '../components/SearchFilterPanel';
import Pagination from '../components/Pagination';

const productsPerPage = 8;

const ShopPage = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');
  const [currentCategory, setCurrentCategory] = useState('All Categories');
  const [currentMinPrice, setCurrentMinPrice] = useState('');
  const [currentMaxPrice, setCurrentMaxPrice] = useState('');
  const [currentSortBy, setCurrentSortBy] = useState('default');

  useEffect(() => {
    let updatedProducts = [...products];

    // Filter by search term
    if (currentSearchTerm) {
      updatedProducts = updatedProducts.filter(product =>
        product.name.toLowerCase().includes(currentSearchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (currentCategory !== 'All Categories') {
      updatedProducts = updatedProducts.filter(product =>
        product.category === currentCategory
      );
    }

    // Filter by price range
    const min = parseFloat(currentMinPrice);
    const max = parseFloat(currentMaxPrice);
    if (!isNaN(min)) {
      updatedProducts = updatedProducts.filter(product => product.price >= min);
    }
    if (!isNaN(max)) {
      updatedProducts = updatedProducts.filter(product => product.price <= max);
    }

    // Sort products
    updatedProducts.sort((a, b) => {
      switch (currentSortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    setFilteredProducts(updatedProducts);
    setCurrentPage(1); // Reset to first page after filters/sort change
  }, [currentSearchTerm, currentCategory, currentMinPrice, currentMaxPrice, currentSortBy]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const handleSearch = (term) => {
    setCurrentSearchTerm(term);
  };

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
  };

  const handlePriceRangeChange = (min, max) => {
    setCurrentMinPrice(min);
    setCurrentMaxPrice(max);
  };

  const handleSortChange = (sortBy) => {
    setCurrentSortBy(sortBy);
  };

  return (
    <div className="container" style={{ padding: 'var(--spacing-xl) 0' }}>
      <div style={{ display: 'flex', gap: 'var(--spacing-lg)' }}>
        <SearchFilterPanel
          onSearch={handleSearch}
          onCategoryChange={handleCategoryChange}
          onPriceRangeChange={handlePriceRangeChange}
          onSortChange={handleSortChange}
        />
        <div className="main-content">
          <h2 style={{ marginBottom: 'var(--spacing-xl)' }}>All Products</h2>
          <div className="product-listing-header">
            <p>Showing {Math.min(startIndex + 1, filteredProducts.length)} - {Math.min(startIndex + productsPerPage, filteredProducts.length)} of {filteredProducts.length} products</p>
          </div>
          <div className="grid-4-col">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>No products found matching your criteria.</p>
            )}
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;