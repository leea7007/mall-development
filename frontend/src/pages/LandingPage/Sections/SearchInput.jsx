import React from "react";

const SearchInput = ({ onSearch, searchTerm }) => {
  return (
    <div>
      <input
        className="p-2 border border-gray-300 rounded-md"
        type="text"
        placeholder="find"
        onChange={onSearch}
        value={searchTerm}
      />
    </div>
  );
};

export default SearchInput;
