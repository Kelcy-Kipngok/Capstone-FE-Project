<<<<<<< HEAD
import React from "react";

const BookCard = ({ book, onSelect, onFavorite }) => {
  const imageUrl = book.coverId
    ? `https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`
    : "https://via.placeholder.com/150x220?text=No+Cover";

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
      onClick={() => onSelect(book)}
    >
      <img
        src={imageUrl}
        alt={book.title}
        className="w-full h-60 object-cover"
      />
      <div className="p-3">
        <h3 className="font-semibold text-indigo-700 dark:text-indigo-300 truncate">
          {book.title}
        </h3>
        <p className="text-sm text-black-600 dark:text-black-400 truncate">
          {book.author}
        </p>
        <button
          className="mt-2 w-full bg-indigo-600 text-white py-1 rounded-lg hover:bg-indigo-700 transition"
          onClick={(e) => {
            e.stopPropagation();
            onFavorite(book);
          }}
        >
          Add to Favorites
        </button>
      </div>
    </div>
  );
};
=======
function BookCard({ book }) {
  const coverId = book.cover_i;
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "https://via.placeholder.com/150x200?text=No+Cover";

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={coverUrl}
        alt={book.title}
        className="w-full h-60 object-cover"
      />
      <div className="p-4">
        <h2 className="font-bold text-lg">{book.title}</h2>
        <p className="text-gray-600">
          Author: {book.author_name ? book.author_name.join(", ") : "Unknown"}
        </p>
        <p className="text-gray-600">
          Publisher: {book.publisher ? book.publisher[0] : "N/A"}
        </p>
      </div>
    </div>
  );
}
>>>>>>> 87d519328d0541e6030d45d0560996f39a9ac23a

export default BookCard;
