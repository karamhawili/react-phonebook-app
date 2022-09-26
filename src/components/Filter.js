import React from 'react';

const Filter = ({ query, handleQueryChange }) => {
  return (
    <div>
      search by name:{' '}
      <input
        value={query}
        onChange={handleQueryChange}
        placeholder="Enter name..."
      />
    </div>
  );
};

export default Filter;
