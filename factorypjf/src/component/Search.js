import React from "react";

function Search({ onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(event.target.elements.filter.value);
  };

  return (
    <form className="search_box" onSubmit={handleSubmit}>
      <input name="filter" />
      <button className="button">검색</button>
    </form>
  );
}

export default Search;