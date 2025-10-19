import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BookDetailsPage from "./pages/BookDetailsPage";
import FavoritesPage from "./pages/FavoritesPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import logo from "./assets/logo.png";

const burgundy = "#800020";

// ✅ Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const AppContent = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("title");
  const [category, setCategory] = useState("All");
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [username, setUsername] = useState(localStorage.getItem("username") || "");

  const navigate = useNavigate();

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
    navigate("/login");
  };

  // ✅ Fetch books from Open Library API
  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      let url = "";

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
        publisher: book.publisher ? book.publisher[0] : "N/A",
        publish_date: book.first_publish_year || "N/A",
        isbn: book.isbn ? book.isbn[0] : null,
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
    if (isLoggedIn) fetchBooks();
  }, [query, category, searchType, page, isLoggedIn]);

  const handleAddToFavorites = (book) => {
    if (!favorites.some((fav) => fav.id === book.id)) {
      setFavorites([...favorites, book]);
    }
  };

  const handleRemoveFavorite = (bookId) => {
    setFavorites(favorites.filter((b) => b.id !== bookId));
  };

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundColor: "#ffffff67",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* ✅ Header only visible when logged in */}
      {isLoggedIn && (
        <Header
          logo={logo}
          query={query}
          setQuery={setQuery}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
        />
      )}


     {/* ✅ Search Bar */}
{isLoggedIn && (
  <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-4">
    <input
      type="text"
      placeholder={`Search by ${searchType}`}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="px-3 py-2 rounded-md text-black w-full md:w-64"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          fetchBooks();
        }
      }}
    />
    <button
      onClick={fetchBooks}
      className="px-4 py-2 rounded-md text-white font-semibold"
      style={{ backgroundColor: burgundy }}
    >
      🔍 Search
    </button>
  </div>
)}
      {/* ✅ Hide search filters on login/signup */}
      {isLoggedIn && (
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-4">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="px-3 py-2 rounded-md text-black"
          >
            <option value="title">Search by Title</option>
            <option value="author">Search by Author</option>
          </select>

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
      )}

      <main className="flex-grow w-full px-8 py-8">
        <Routes>
          {/* LOGIN PAGE */}
          <Route
            path="/login"
            element={
              <LoginPage
                onLogin={(username) => {
                  setIsLoggedIn(true);
                  setUsername(username);
                  localStorage.setItem("isLoggedIn", "true");
                  localStorage.setItem("username", username);
                  navigate("/");
                }}
              />
            }
          />

          {/* SIGNUP PAGE */}
          <Route path="/signup" element={<SignupPage />} />

          {/* HOME PAGE (Protected) */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                {isLoading ? (
                  <p className="text-center text-lg">Loading books...</p>
                ) : books.length > 0 ? (
                  <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {books.map((book) => (
                      <div
                        key={book.id}
                        className="bg-white/90 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition transform hover:scale-105 cursor-pointer"
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
                          <p className="text-sm text-gray-700">{book.author}</p>
                          <p className="text-sm text-gray-800 mb-2">
                            <strong>Publisher:</strong> {book.publisher || "N/A"}
                          </p>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/book/${book.id.replace("/works/", "")}`);
                            }}
                            className="mt-2 bg-[#286482] text-white rounded-full px-3 py-1 text-sm hover:bg-[#9b1233]"
                          >
                            📖 View Details
                          </button>

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
                  <span className="text-gray-800 font-semibold">Page {page}</span>
                  <button
                    onClick={() => setPage(page + 1)}
                    className="px-4 py-2 rounded-lg text-white font-semibold"
                    style={{ backgroundColor: burgundy }}
                  >
                    Next
                  </button>
                </div>
              </ProtectedRoute>
            }
          />

          {/* FAVORITES PAGE */}
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <FavoritesPage
                  favorites={favorites}
                  onRemove={handleRemoveFavorite}
                />
              </ProtectedRoute>
            }
          />

          {/* BOOK DETAILS PAGE */}
          <Route
            path="/book/:id"
            element={
              <ProtectedRoute>
                <BookDetailsPage />
              </ProtectedRoute>
            }
          />

          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>

      {isLoggedIn && <Footer logo={logo} />}
    </div>
  );
};

// ✅ Wrap App in Router
const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
