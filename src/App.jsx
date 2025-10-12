<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import BookDetailsModal from "./components/BookDetailsModal";
import FavoritesPage from "./pages/FavoritesPage";

import logo from "./assets/logo.png";

const burgundy = "#800020";

const App = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("title"); // title or author
  const [category, setCategory] = useState("All");
  const [selectedBook, setSelectedBook] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      let url = "";

      // ✅ Choose correct API endpoint
      if (searchType === "author" && query) {
        url = `https://openlibrary.org/search.json?author=${query}&page=${page}`;
      } else if (searchType === "title" && query) {
        url = `https://openlibrary.org/search.json?title=${query}&page=${page}`;
      } else if (category !== "All") {
        url = `https://openlibrary.org/search.json?subject=${category}&page=${page}`;
      } else {
        url = `https://openlibrary.org/search.json?q=books&page=${page}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      const formattedBooks = data.docs.map((book) => ({
        id: book.key,
        title: book.title,
        author: book.author_name ? book.author_name.join(", ") : "Unknown",
        coverUrl: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
          : null,
      }));

      setBooks(formattedBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [query, category, searchType, page]);

  const handleAddToFavorites = (book) => {
    if (!favorites.some((fav) => fav.id === book.id)) {
      setFavorites([...favorites, book]);
    }
  };

  const handleRemoveFavorite = (bookId) => {
    setFavorites(favorites.filter((b) => b.id !== bookId));
  };

  return (
    <Router>
      <div
        className="flex flex-col min-h-screen"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#ffffff67",
        }}
      >
        

        <div className="flex flex-col md:ml-64">
          {/* HEADER */}
          <Header logo={logo} query={query} setQuery={setQuery} />

          {/* SEARCH + CATEGORY CONTROLS */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6">
            {/* Search Type Dropdown */}
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="px-3 py-2 rounded-md text-black"
            >
              <option value="title">Search by Title</option>
              <option value="author">Search by Author</option>
            </select>

            {/* Category Filter */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-2 rounded-md text-black"
            >
              <option value="All">All Categories</option>
              <option value="Fiction">Fiction</option>
              <option value="Science">Science</option>
              <option value="Fantasy">Fantasy</option>
              <option value="History">History</option>
              <option value="Biography">Biography</option>
            </select>
          </div>

      

          {/* MAIN CONTENT */}
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              {/* HOME PAGE */}
              <Route
                path="/"
                element={
                  <>
                    {isLoading ? (
                      <p className="text-center text-lg">Loading books...</p>
                    ) : books.length > 0 ? (
                      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {books.map((book) => (
                          <div
                            key={book.id}
                            className="bg-white/90 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition transform hover:scale-105 cursor-pointer"
                            onClick={() => setSelectedBook(book)}
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
                              <p className="text-sm text-black-700">
                                {book.author}
                              </p>
                               <p className="text-sm text-gray-800 mb-2">
                  <strong>Publisher:</strong> {book.publisher || "N/A"}
                </p>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddToFavorites(book);
                                }}
                                className="mt-2 bg-white border border-gray-400 rounded-full px-3 py-1 text-sm hover:bg-gray-100"
                              >
                                ❤️ Favorite
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-lg">
                        No books found. Try another search.
                      </p>
                    )}

                    {/* Pagination */}
                    <div className="flex justify-center items-center space-x-4 mt-8">
                      <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        className="px-4 py-2 rounded-lg text-white font-semibold disabled:opacity-50"
                        style={{ backgroundColor: burgundy }}
                      >
                        Previous
                      </button>
                      <span className="text-white font-semibold">
                        Page {page}
                      </span>
                      <button
                        onClick={() => setPage(page + 1)}
                        className="px-4 py-2 rounded-lg text-white font-semibold"
                        style={{ backgroundColor: burgundy }}
                      >
                        Next
                      </button>
                    </div>
                  </>
                }
              />

              {/* FAVORITES PAGE */}
              <Route
                path="/favorites"
                element={
                  <FavoritesPage
                    favorites={favorites}
                    onRemove={handleRemoveFavorite}
                    onSelect={setSelectedBook}
                  />
                }
              />
            </Routes>
          </main>

          <Footer logo={logo} />
        </div>

        {selectedBook && (
          <BookDetailsModal
            book={selectedBook}
            onClose={() => setSelectedBook(null)}
          />
        )}
      </div>
    </Router>
  );
};
=======
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import BookCard from "./components/BookCard";

function App() {
  const [books, setBooks] = useState([]);

  // Fetch books from Open Library API
  const handleSearch = async (query) => {
    if (!query) return;
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${query}`
      );
      const data = await response.json();
      setBooks(data.docs.slice(0, 10)); // Limit to 10 results
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">📚 Book Library</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {books.map((book) => (
          <BookCard key={book.key} book={book} />
        ))}
      </div>
    </div>
  );
}
>>>>>>> 87d519328d0541e6030d45d0560996f39a9ac23a

export default App;
