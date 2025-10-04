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

export default App;
