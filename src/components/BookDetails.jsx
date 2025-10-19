function BookDetails({ book }) {
  return (
    <div>
      <h2 className="text-xl font-bold">{book.title}</h2>
      <p>{book.first_publish_year ? `Published: ${book.first_publish_year}` : "No publication date"}</p>
      <p>{book.isbn ? `ISBN: ${book.isbn[0]}` : "No ISBN available"}</p>
      {/* Later we’ll expand this */}
    </div>
  );
}

export default BookDetails;
