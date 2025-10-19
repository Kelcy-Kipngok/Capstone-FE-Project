import React from "react";

const burgundy = "#800020";

const FavoritesPage = ({ favorites, onRemove, onSelect }) => {
  return (
     <div
  className="flex-grow w-full px-8 py-8"
  style={{
    backgroundColor: "#f0f0f0", 
  }}
>
      <h2 className="text-3xl font-bold text-center mb-6 text-[#800020]">
        ❤️ Your Favorite Books
      </h2>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-700">No favorite books yet.</p>
      ) : (
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {favorites.map((book) => (
            <div
              key={book.id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition transform hover:scale-105 cursor-pointer"
              onClick={() => onSelect(book)}
            >
            
            {book.coverUrl ? (
                              <img
                                src={book.coverUrl}
                                alt={book.title}
                                className="w-full h-56 object-cover"
                              />
                            ) : (
                              <div className="w-full h-56 bg-gray-300 flex items-center justify-center">
                                <span className="text-gray-700">No Image</span>
                              </div>
                            )}
                            <div className="p-4 text-center">
                              <h3
                                className="text-lg font-semibold"
                                style={{ color: burgundy }}
                              >
                                {book.title}
                </h3>
                <p className="text-sm text-gray-800 mb-1">
                  <strong>Author:</strong> {book.author || "Unknown"}
                </p>
                <p className="text-sm text-gray-800 mb-2">
                  <strong>Publisher:</strong> {book.publisher || "N/A"}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(book.id);
                  }}
                  className="bg-[#800020] text-white px-3 py-1 rounded hover:bg-[#a52a2a]"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
