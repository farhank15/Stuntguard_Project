// SearchBar.js
import React, { useState } from "react";

const SearchBar = ({ articles, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    const filteredArticles = articles.filter((article) =>
      article.judul.toLowerCase().includes(searchTerm.toLowerCase())
    );
    onSearch(filteredArticles);
  };

  return (
    <div className="container px-2 mx-auto mt-8">
      <div className="flex items-center ">
        <input
          type="text"
          placeholder="Cari..."
          className="w-[300px] p-2 mr-2 border"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded"
          onClick={handleSearch}
        >
          Cari
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
