import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BookDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [edition, setEdition] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        // ✅ 1. Fetch the main work details
        const workRes = await fetch(`https://openlibrary.org/works/${id}.json`);
        const workData = await workRes.json();
        setDetails(workData);

        // ✅ 2. Fetch the first edition for more metadata (publisher, ISBN, publish_date)
        const editionRes = await fetch(`https://openlibrary.org/works/${id}/editions.json?limit=1`);
        const editionData = await editionRes.json();
        if (editionData.entries && editionData.entries.length > 0) {
          setEdition(editionData.entries[0]);
        }
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading book details...</p>;
  if (!details) return <p className="text-center mt-10">No details found for this book.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <button
        onClick={() => navigate(-1)}
        className="bg-[#800020] text-white px-4 py-2 rounded-md mb-4 hover:bg-[#a02030]"
      >
        ← Back
      </button>

      {/* ✅ Title */}
      <h1 className="text-3xl font-bold text-[#800020] mb-3">{details.title}</h1>

      {/* ✅ Author */}
      <p className="text-gray-800 mb-2">
        <strong>Author:</strong>{" "}
        {details.authors && details.authors.length > 0
          ? details.authors.map((a, i) => (
              <span key={i}>
                <a
                  href={`https://openlibrary.org${a.author.key}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#800020] hover:underline"
                >
                  {a.name || a.author.key.replace("/authors/", "")}
                </a>
                {i < details.authors.length - 1 && ", "}
              </span>
            ))
          : "Unknown"}
      </p>

      {/* ✅ Publisher */}
      <p className="text-gray-800 mb-2">
        <strong>Publisher:</strong> {edition?.publishers?.join(", ") || "N/A"}
      </p>

      {/* ✅ Publish Date */}
      <p className="text-gray-800 mb-2">
        <strong>First Published:</strong>{" "}
        {edition?.publish_date || details.created?.value?.split("T")[0] || "Unknown"}
      </p>

      {/* ✅ ISBN */}
      <p className="text-gray-800 mb-2">
        <strong>ISBN:</strong>{" "}
        {edition?.isbn_13
          ? edition.isbn_13.join(", ")
          : edition?.isbn_10
          ? edition.isbn_10.join(", ")
          : "N/A"}
      </p>

      {/* ✅ Subjects */}
      {details.subjects && (
        <p className="text-gray-800 mb-2">
          <strong>Subjects:</strong> {details.subjects.join(", ")}
        </p>
      )}

      {/* ✅ Description */}
      {details.description && (
        <div className="mt-4">
          <h3 className="font-semibold text-lg mb-1">Description</h3>
          <p className="text-gray-700">
            {typeof details.description === "string"
              ? details.description
              : details.description.value}
          </p>
        </div>
      )}

      {/* ✅ Cover Image */}
      {details.covers && details.covers.length > 0 && (
        <img
          src={`https://covers.openlibrary.org/b/id/${details.covers[0]}-L.jpg`}
          alt={details.title}
          className="w-full h-auto rounded-lg mt-4 shadow-md"
        />
      )}
    </div>
  );
};

export default BookDetailsPage;
