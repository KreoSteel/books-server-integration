import { useFetchHook } from "@/hooks/useFetchHook";
import PageWrapper from "@/components/layout/PageWrapper";
import type { Author } from "@/utils/interfaces";
import { Link } from "react-router";
import { Pagination } from "@/components/ui/pagination";
import AuthorsCard from "@/components/cards/AuthorsCard";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, Label, Input, DialogClose, Button } from "@/components/ui";
import { useState } from "react";
import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import useAuthors from "@/hooks/useAuthors";

export default function Authors() {
  const { data: authors = [] } = useFetchHook<Author[]>("authors", ["getAuthors"]);
  const { createAuthorMutation } = useAuthors(); // Only use what's needed
  const [currentPage, setCurrentPage] = useState(1);
  const authorsPerPage = 4;
  const totalPages = Math.ceil(authors.length / authorsPerPage);
  const indexOfLastAuthor = currentPage * authorsPerPage;
  const indexOfFirstAuthor = indexOfLastAuthor - authorsPerPage;
  const currentAuthors = authors.slice(indexOfFirstAuthor, indexOfLastAuthor);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    birthYear: 0,
    deathYear: 0,
    nationality: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createAuthorMutation({
      name: formData.name,
      bio: formData.bio,
      birthYear: Number(formData.birthYear),
      deathYear: Number(formData.deathYear),
      nationality: formData.nationality
    });
  };

  // Log when authors data is fetched
  console.log('Fetched authors:', authors);
  // Log current page
  console.log('Current page:', currentPage);

  return (
    <PageWrapper className="flex flex-col gap-18 w-screen h-screen items-center justify-center">
      <span className="flex flex-col gap-1 items-center">
        <h1 className="text-5xl font-bold">Authors</h1>
      </span>
      <div className="grid grid-cols-2 grid-rows-2 gap-10">
        {currentAuthors.map((author) => (
          <AuthorsCard key={author.id} author={author} />
        ))}
        <div className="flex justify-center items-center col-span-2">
        <Dialog>
          <DialogTrigger asChild className="flex justify-center items-center">
            <Button className="bg-[#303b9c] hover:bg-[#303b9c]/80">Add Author</Button>
          </DialogTrigger>
          <DialogContent className="bg-[#23293a] border border-indigo-700 shadow-xl shadow-indigo-900/30 rounded-xl text-indigo-100">
            <DialogHeader>
              <DialogTitle>Add Author</DialogTitle>
              <DialogDescription>
                Add a new author to the database.
              </DialogDescription>
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" name="bio" value={formData.bio} onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="birthYear">Birth Year</Label>
                  <Input id="birthYear" name="birthYear" value={formData.birthYear} onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="deathYear">Death Year</Label>
                  <Input id="deathYear" name="deathYear" value={formData.deathYear} onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input id="nationality" name="nationality" value={formData.nationality} onChange={handleChange} />
                </div>
              </form>
              <DialogFooter>
                <DialogClose asChild>
                  <Button className="bg-[#3a3b45] hover:bg-[#2d2e3a]/80 hover:text-indigo-100 border-none" variant="outline">Cancel</Button>
                </DialogClose>
                <Button className="bg-[#303b9c] hover:bg-[#303b9c]/80" onClick={() => createAuthorMutation({ name: formData.name, bio: formData.bio, birthYear: Number(formData.birthYear), deathYear: Number(formData.deathYear), nationality: formData.nationality })} type="submit">Save Changes</Button>
              </DialogFooter>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        </div>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => { console.log('Previous page clicked'); setCurrentPage((p) => Math.max(1, p - 1)); }}
              aria-disabled={currentPage === 1}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "hover:bg-indigo-400 hover:text-white"}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i + 1}>
              <PaginationLink
                isActive={currentPage === i + 1}
                onClick={() => { console.log('Page selected:', i + 1); setCurrentPage(i + 1); }}
                href="#"
                className={currentPage === i + 1 ? "hover:bg-indigo-400 hover:text-white bg-indigo-400" : "hover:bg-indigo-400 hover:text-white"}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => { console.log('Next page clicked'); setCurrentPage((p) => Math.min(totalPages, p + 1)); }}
              aria-disabled={currentPage === totalPages}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "hover:bg-indigo-400 hover:text-white"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </PageWrapper>
  );
}
