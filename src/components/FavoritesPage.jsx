import React from "react";

const Favorites = ({ favorites }) => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-[#800020]">❤️ Favorite Books</h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-600">No favorite books yet.</p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {favorites.map((book, index) => {
            // Determine the image URL
            const imageUrl = book.cover_i
              ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
              : "https://via.placeholder.com/150x220.png?text=No+Cover";

            return (
              <div
                key={index}
                className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={imageUrl}
                  alt={book.title}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150x220.png?text=No+Cover";
                  }}
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-black">{book.title}</h2>
                  <p className="text-sm text-gray-700">
                    Author: {book.author_name ? book.author_name.join(", ") : "Unknown"}
                  </p>
                  <p className="text-sm text-gray-700">
                    Publisher: {book.publisher ? book.publisher[0] : "N/A"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Favorites;
