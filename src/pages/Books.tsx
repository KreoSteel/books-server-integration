import PageWrapper from "../components/layout/PageWrapper";
import { useFetchHook } from "../hooks/useFetchHook";
import type { Author, Book, Category, Language } from "../utils/interfaces.ts";
import BooksCard from "../components/cards/BooksCard.tsx";
import { Link } from "react-router";
import { useState } from "react";
import useBooks from "@/hooks/useBooks.tsx";
import {
  Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Input, Label, Button, Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui";

export default function Books() {
  const { data: books = [] } = useFetchHook<Book[]>("books", ["getBooks"]);
  const { data: authors = [] } = useFetchHook<Author[]>("authors", ["getAuthors"]);
  const { data: categories = [] } = useFetchHook<Category[]>("categories", ["getCategories"]);
  const { data: languages = [] } = useFetchHook<Language[]>("languages", ["getLanguages"]);

  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    authorId: 0,
    categoryId: 0,
    languageId: 0,
    description: "",
    pages: 0,
    price: 0,
  })
  const booksPerPage = 4;
  const totalPages = Math.ceil(books.length / booksPerPage);
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const { createBookMutation } = useBooks()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData)
    createBookMutation(formData as unknown as Book)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <PageWrapper className="flex flex-col items-center justify-center gap-10">
      <span className="flex flex-col gap-2 items-center">
        <Link to="/">Home</Link>
        <h1 className="text-2xl font-bold">Books</h1>
      </span>
      <Dialog>
        <form onSubmit={handleSubmit}>
          <DialogTrigger asChild>
            <Button variant="secondary">Add Book</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-[#23293a] border border-indigo-700 shadow-xl shadow-indigo-900/30 rounded-xl text-indigo-100">
            <DialogHeader>
              <DialogTitle>Create a Book</DialogTitle>
              <DialogDescription>
                Fill this form to create a new book.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
            <div className="grid gap-3">
                <Label htmlFor="title">Title</Label>
                <Input className="border-indigo-700" id="title" name="title" value={formData.title} onChange={handleChange} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="authorId">Author</Label>
                <Select name="authorId" value={formData.authorId.toString()} onValueChange={(value) => setFormData({ ...formData, authorId: Number(value) })}>
                  <SelectTrigger className="w-full border-indigo-700">
                    <SelectValue placeholder="Select an author" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#23293a] border border-indigo-700 shadow-xl shadow-indigo-900/30 rounded-xl text-indigo-100 active:bg-[#23293a] active:text-indigo-100" >
                    <SelectGroup>
                      <SelectLabel>Authors</SelectLabel>
                      {authors.map((author) => (
                        <SelectItem key={author.id} value={author.id.toString()}>{author.name}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="categoryId">Category</Label>
                <Select name="categoryId" value={formData.categoryId.toString()} onValueChange={(value) => setFormData({ ...formData, categoryId: Number(value) })}>
                  <SelectTrigger className="w-full border-indigo-700">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#23293a] border border-indigo-700 shadow-xl shadow-indigo-900/30 rounded-xl text-indigo-100">
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="languageId">Language</Label>
                <Select name="languageId" value={formData.languageId.toString()} onValueChange={(value) => setFormData({ ...formData, languageId: Number(value) })}>
                  <SelectTrigger className="w-full border-indigo-700">
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#23293a] border border-indigo-700 shadow-xl shadow-indigo-900/30 rounded-xl text-indigo-100"  >
                    <SelectGroup>
                      <SelectLabel>Languages</SelectLabel>
                      {languages.map((language) => (
                        <SelectItem key={language.id} value={language.id.toString()}>{language.name}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-4">
            <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Input className="border-indigo-700" id="description" name="description" value={formData.description} onChange={handleChange} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="pages">Pages</Label>
                <Input className="border-indigo-700" id="pages" name="pages" value={formData.pages} onChange={handleChange} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="price">Price</Label>
                <Input className="border-indigo-700" id="price" name="price" value={formData.price} onChange={handleChange} />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button className="bg-[#3a3b45] hover:bg-[#2d2e3a]/80 hover:text-indigo-100 border-none" variant="outline">Cancel</Button>
              </DialogClose>
              <Button className="bg-[#303b9c] hover:bg-[#303b9c]/80" onClick={() => handleSubmit({ preventDefault: () => { } } as any)} type="submit">Create</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
      <div className="grid grid-cols-2 gap-10 justify-center items-center">
        {currentBooks.map((book) => (
          <BooksCard
            key={book.id}
            book={book}
            authors={authors}
            categories={categories}
            languages={languages}
          />
        ))}
      </div>
      <Pagination>
        <PaginationContent >
          <PaginationItem >
            <PaginationPrevious
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              aria-disabled={currentPage === 1}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "hover:bg-indigo-400 hover:text-white"}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i + 1}>
              <PaginationLink
                isActive={currentPage === i + 1}
                onClick={() => setCurrentPage(i + 1)}
                href="#"
                className={currentPage === i + 1 ? "hover:bg-indigo-400 hover:text-white bg-indigo-400" : "hover:bg-indigo-400 hover:text-white"}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              aria-disabled={currentPage === totalPages}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "hover:bg-indigo-400 hover:text-white"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </PageWrapper>
  );
}