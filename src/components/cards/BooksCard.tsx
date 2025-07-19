import React from "react";
import type { Book, Author, Category, Language } from "../../utils/interfaces";

interface BooksCardProps {
  book: Book;
  authors: Author[];
  categories: Category[];
  languages: Language[];
}

const BooksCard: React.FC<BooksCardProps> = ({ book, authors, categories, languages }) => (
  <div className="book-card">
    <h2>{book.title}</h2>
    <p><strong>Author:</strong> {authors.find(author => author.id === book.authorId)?.name}</p>
    {categories.find(category => category.id === book.categoryId)?.name && <p><strong>Category:</strong> {categories.find(category => category.id === book.categoryId)?.name}</p>}
    {languages.find(language => language.id === book.languageId)?.name && <p><strong>Language:</strong> {languages.find(language => language.id === book.languageId)?.name}</p>}
    {book.publishedYear && <p><strong>Year:</strong> {book.publishedYear}</p>}
    {book.description && <p>{book.description}</p>}
  </div>
);

export default BooksCard;