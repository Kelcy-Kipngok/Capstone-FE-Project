import React, { useEffect, useState } from "react";

const BookDetailsModal = ({ book, onClose }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!book || !book.isbn) return;
      try {
        const res = await fetch(
          `https://openlibrary.org/api/books?bibkeys=ISBN:${book.isbn}&format=json&jscmd=data`
        );
        const data = await res.json();
        setDetails(data[`ISBN:${book.isbn}`]);
      } catch (err) {
        console.error("Error fetching book details", err);
      }
    };
    fetchDetails();
  }, [book]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          ✖
        </button>

        {details ? (
          <>
            <h2 className="text-2xl font-bold text-[#800020] mb-2">
              {details.title}
            </h2>
            <p className="text-gray-800 mb-1">
              <strong>Author:</strong>{" "}
              {details.authors ? details.authors.map(a => a.name).join(", ") : "Unknown"}
            </p>
            <p className="text-gray-800 mb-1">
              <strong>Publisher:</strong>{" "}
              {details.publishers ? details.publishers.map(p => p.name).join(", ") : "N/A"}
            </p>
            <img
              src={
                details.cover
                  ? details.cover.large
                  : "https://via.placeholder.com/200x300.png?text=No+Cover"
              }
              alt={details.title}
              className="mt-4 mx-auto rounded-lg shadow-md"
            />
          </>
        ) : (
          <p className="text-gray-600">Loading book details...</p>
        )}
      </div>
    </div>
  );
};

export default BookDetailsModal;
