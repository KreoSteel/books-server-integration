import React, { useState } from "react";
import type { Book, Author, Category, Language } from "../../utils/interfaces";
import { Button } from "../ui/button";
import useBooks from "@/hooks/useBooks";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, Label, Input, Select, SelectTrigger, SelectValue, SelectGroup, SelectLabel, SelectItem, SelectContent, DialogClose } from "@/components/ui";

interface BooksCardProps {
  book: Book;
  authors: Author[];
  categories: Category[];
  languages: Language[];
}

const BooksCard: React.FC<BooksCardProps> = ({ book, authors, categories, languages }) => {
  const { deleteBookMutation, updateBookMutation } = useBooks()
  const [formData, setFormData] = useState({
    title: book.title,
    authorId: book.authorId,
    categoryId: book.categoryId,
    languageId: book.languageId,
    description: book.description,
    pages: book.pages,
    price: book.price
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateBookMutation({
      ...book,
      ...formData,
      price: Number(formData.price),
      pages: Number(formData.pages),
      authorId: Number(formData.authorId),
      categoryId: Number(formData.categoryId),
      languageId: Number(formData.languageId),
    } as unknown as Book)
  }

    return (
    <div className="book-card min-h-90 min-w-120 w-full flex flex-col justify-between items-center bg-[#23293a] border border-indigo-700 rounded-xl shadow-lg shadow-indigo-900/30 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105 p-5 gap-3">
      <h2 className="text-2xl font-bold w-full text-center rounded-md p-2 text-white bg-gradient-to-r from-indigo-600 via-violet-700 to-cyan-600 mb-2">
        {book.title}
      </h2>
      <p className="text-indigo-200"><strong className="text-lg text-cyan-400">Author:</strong> {authors.find(author => author.id === book.authorId)?.name}</p>
      {categories.find(category => category.id === book.categoryId)?.name && (
        <p className="text-indigo-200"><strong className="text-lg text-cyan-400">Category:</strong> {categories.find(category => category.id === book.categoryId)?.name}</p>
      )}
      {languages.find(language => language.id === book.languageId)?.name && (
        <p className="text-indigo-200"><strong className="text-lg text-cyan-400">Language:</strong> {languages.find(language => language.id === book.languageId)?.name}</p>
      )}
      {book.publishedYear && (
        <p className="text-indigo-200"><strong className="font-bold text-cyan-400">Year:</strong> {book.publishedYear}</p>
      )}
      {book.description && (
        <p className="text-center text-indigo-100 line-clamp-2 text-sm italic">{book.description}</p>
      )}
      {book.price && (
        <p className="text-indigo-200"><strong className="font-bold text-cyan-400">Price:</strong> {book.price}$</p>
      )}
      <div className="flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary">Edit Book</Button>
          </DialogTrigger>
          <DialogContent className="bg-[#23293a] border border-indigo-700 shadow-xl shadow-indigo-900/30 rounded-xl text-indigo-100">
            <DialogHeader>
              <DialogTitle>Edit Book</DialogTitle>
              <DialogDescription>
                Edit the book details.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" value={formData.title} onChange={handleChange} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="authorId">Author</Label>
                <Select name="authorId" value={formData.authorId.toString()} onValueChange={(value) => setFormData({ ...formData, authorId: Number(value) })}>
                  <SelectTrigger className="w-full border-indigo-700">
                    <SelectValue placeholder="Select an author" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#23293a] border border-indigo-700 shadow-xl shadow-indigo-900/30 rounded-xl text-indigo-100">
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
                  <SelectContent className="bg-[#23293a] border border-indigo-700 shadow-xl shadow-indigo-900/30 rounded-xl text-indigo-100">
                    <SelectGroup>
                      <SelectLabel>Languages</SelectLabel>
                      {languages.map((language) => (
                        <SelectItem key={language.id} value={language.id.toString()}>{language.name}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Input id="description" name="description" value={formData.description} onChange={handleChange} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="pages">Pages</Label>
                <Input id="pages" name="pages" value={formData.pages} onChange={handleChange} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="price">Price</Label>
                <Input id="price" name="price" value={formData.price} onChange={handleChange} />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button className="bg-[#2d2e3a] hover:bg-[#2d2e3a]/80 hover:text-indigo-100 border-none" variant="outline">Cancel</Button>
                </DialogClose>
                <Button className="bg-[#303b9c] hover:bg-[#303b9c]/80" onClick={() => handleSubmit({ preventDefault: () => { } } as any)} type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">Delete Book</Button>
          </DialogTrigger>
          <DialogContent className="bg-[#23293a] border border-indigo-700 shadow-xl shadow-indigo-900/30 rounded-xl text-indigo-100">
            <DialogHeader>
              <DialogTitle>Deleting Book</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this book?
                All the data will be lost without any way to recover it.
              </DialogDescription>
              <DialogFooter>
                <DialogClose asChild>
                  <Button className="bg-[#3a3b45] hover:bg-[#2d2e3a]/80 hover:text-indigo-100 border-none" variant="outline">Cancel</Button>
                </DialogClose>
                <Button className="bg-[#303b9c] hover:bg-red-600/60" onClick={() => deleteBookMutation(book.id)} variant="destructive">Delete Book</Button>
              </DialogFooter>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
};

export default BooksCard;