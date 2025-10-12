import React from "react";

const categories = [
  "All",
  "Fiction",
  "Science",
  "History",
  "Biography",
  "Children",
  "Fantasy",
  "Romance",
  "Mystery",
  "Technology",
  "Art",
  "Education",
];

const CategoryFilter = ({ selected, onSelect }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all 
            ${
              selected === cat
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100"
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
