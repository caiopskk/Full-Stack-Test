import React from 'react';
import { SearchBarProps } from '../types/searchBar';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, 'data-testid': testId }) => {
  return (
    <div className="search-bar-container">
      <div className="icon-container">
        <MagnifyingGlassIcon className="search-icon" />
      </div>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
        className="search-bar"
        data-testid={testId}
      />
    </div>
  );
};

export default SearchBar;
