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

export default BookCard;
