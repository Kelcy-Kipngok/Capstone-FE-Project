<<<<<<< HEAD
import React, { useState } from "react";
=======
import { useState } from "react";
>>>>>>> 87d519328d0541e6030d45d0560996f39a9ac23a

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
<<<<<<< HEAD
    onSearch(query.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center mt-6 gap-2"
    >
      <input
        type="text"
        placeholder="Search for books by title, author, or keyword..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-3/4 sm:w-2/3 md:w-1/2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
      />
      <button
        type="submit"
        className="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
=======
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center">
      <input
        type="text"
        placeholder="Search by title, author, or keyword..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-2/3 px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
>>>>>>> 87d519328d0541e6030d45d0560996f39a9ac23a
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
