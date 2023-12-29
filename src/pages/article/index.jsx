// index.jsx

import React, { useState } from "react";
import ArticleList from "../../components/article/Article";
import SearchBar from "../../components/article/Searchbar";
import data from "../../api/dataartikel.json"; // Gantilah dengan path yang sesuai

const IndexPage = () => {
  const [filteredArticles, setFilteredArticles] = useState(
    data.artikel_stunting
  );

  const handleSearch = (filteredArticles) => {
    setFilteredArticles(filteredArticles);
  };

  return (
    <div>
      <SearchBar articles={data.artikel_stunting} onSearch={handleSearch} />
      <ArticleList articles={filteredArticles} />
    </div>
  );
};

export default IndexPage;
