import React, { useState } from 'react';
import { Search } from 'lucide-react';

function SearchInput({ onSearchSubmit, initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit(query);
  };

  return (
    <form onSubmit={handleSubmit} className="search-input-form">
      <input
        type="text"
        placeholder="Search for articles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="input-field search-input-form__field"
        aria-label="Search input"
      />
      <button type="submit" className="button button--primary search-input-form__button">
        <Search size={20} />
        <span className="sr-only">Search</span>
      </button>
    </form>
  );
}

export default SearchInput;
