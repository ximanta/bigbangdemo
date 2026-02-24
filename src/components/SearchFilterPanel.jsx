import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { categories } from '../data/categories';

const SearchFilterPanel = ({ onSearch, onCategoryChange, onPriceRangeChange, onSortChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  const handlePriceChange = () => {
    onPriceRangeChange(minPrice, maxPrice);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    onSortChange(e.target.value);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <h4>Search Products</h4>
        <form onSubmit={handleSearchSubmit} className="flex-group">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: '0' }}
          />
          <button type="submit" className="button button-primary button-icon">
            <Search size={20} />
          </button>
        </form>
      </div>

      <div className="sidebar-section">
        <h4>Categories</h4>
        <ul>
          {categories.map((category) => (
            <li key={category}>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); handleCategoryClick(category); }}
                className={selectedCategory === category ? 'active' : ''}
              >
                {category}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-section">
        <h4>Price Range</h4>
        <div className="flex-group">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            style={{ marginBottom: '0' }}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            style={{ marginBottom: '0' }}
          />
        </div>
        <button
          onClick={handlePriceChange}
          className="button button-secondary button-small"
          style={{ marginTop: 'var(--spacing-sm)', width: '100%' }}
        >
          Apply Price Filter
        </button>
      </div>

      <div className="sidebar-section">
        <h4>Sort By</h4>
        <select value={sortBy} onChange={handleSortChange} className="sort-dropdown">
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A-Z</option>
          <option value="name-desc">Name: Z-A</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilterPanel;