import React, { useEffect, useState } from "react";

const BookDetailsModal = ({ book, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!book) return;

      setLoading(true);
      try {
        let data = null;

        // Try fetching by ISBN if available
        if (book.isbn) {
          const res = await fetch(
            `https://openlibrary.org/api/books?bibkeys=ISBN:${book.isbn}&format=json&jscmd=data`
          );
          const json = await res.json();
          data = json[`ISBN:${book.isbn}`];
        }

        // Fallback: fetch by work ID if no ISBN
        if (!data && book.id) {
          const res = await fetch(`https://openlibrary.org${book.id}.json`);
          data = await res.json();
        }

        setDetails(data || {});
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [book]);

  if (!book) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
        >
          ✕
        </button>

        {loading ? (
          <p className="text-center text-gray-700">Loading book details...</p>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-[#800020] mb-3">
              {details?.title || book.title}
            </h2>

            <p className="text-gray-800 mb-2">
              <strong>Author:</strong>{" "}
              {details?.authors
                ? details.authors.map((a) => a.name).join(", ")
                : book.author || "Unknown"}
            </p>

            <p className="text-gray-800 mb-2">
              <strong>Publisher:</strong>{" "}
              {details?.publishers
                ? details.publishers.map((p) => p.name).join(", ")
                : book.publisher || "N/A"}
            </p>

            <p className="text-gray-800 mb-2">
              <strong>Published:</strong>{" "}
              {details?.publish_date || book.publish_date || "N/A"}
            </p>

            <p className="text-gray-800 mb-2">
              <strong>ISBN:</strong> {book.isbn || "N/A"}
            </p>

            {details?.subjects && (
              <p className="text-gray-800 mb-2">
                <strong>Subjects:</strong>{" "}
                {details.subjects
                  .map((s) => (typeof s === "string" ? s : s.name))
                  .join(", ")}
              </p>
            )}

            {details?.description && (
              <div className="mt-4">
                <h3 className="font-semibold mb-1">Description</h3>
                <p className="text-gray-700">
                  {typeof details.description === "string"
                    ? details.description
                    : details.description.value}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BookDetailsModal;
