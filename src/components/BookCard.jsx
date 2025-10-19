import React from "react";

const BookCard = ({ book, onSelect, onFavorite }) => {
  const coverUrl = book.coverId
    ? `https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`
    : "https://via.placeholder.com/150x220?text=No+Cover";

  return (
    <div
      className="bg-white bg-opacity-90 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-transform transform hover:-translate-y-1 cursor-pointer border border-gray-200"
    onClick={() => {
  console.log("Book clicked:", book);
  setSelectedBook(book);
}}
    >
      <img
        src={coverUrl}
        alt={book.title}
        className="w-full h-60 object-cover"
      />

      <div className="p-4 text-black">
        <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
        <p className="text-sm mb-1">
          <span className="font-medium">Author:</span>{" "}
          {book.author || "Unknown"}
        </p>
        <p className="text-sm mb-1">
          <span className="font-medium">Publisher:</span>{" "}
          {book.publisher || "N/A"}
        </p>
        <p className="text-xs text-gray-600">
          First Published: {book.firstPublishYear || "N/A"}
        </p>

        <button
          className="mt-3 w-full bg-[#800020] text-white py-1.5 rounded-lg hover:bg-[#a52a2a]"
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

export default BookCard;
