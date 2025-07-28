import type { Author } from "@/utils/interfaces";
import React, { useState } from "react";
import { Button } from "../ui/button";
import useAuthors from "@/hooks/useAuthors";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, Label, Input, DialogClose } from "@/components/ui";

interface AuthorsCardProps {
  author: Author;
}

const AuthorsCard: React.FC<AuthorsCardProps> = ({ author }) => {
  const { deleteAuthorMutation, updateAuthorMutation } = useAuthors(); // Only use what's needed
  const [formData, setFormData] = useState({
    name: author.name,
    bio: author.bio,
    birthYear: author.birthYear,
    deathYear: author.deathYear,
    nationality: author.nationality,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Input changed:', e.target.name, e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitting author update:', { ...author, ...formData });
    updateAuthorMutation({
      ...author,
      ...formData,
      birthYear: Number(formData.birthYear),
      deathYear: Number(formData.deathYear),
    } as Author);
  };

  // Log when rendering card
  console.log('Rendering AuthorsCard for:', author);

  return (
    <div className="author-card min-h-80 max-w-200 min-w-120 w-full flex flex-col justify-between items-center bg-[#23293a] border border-indigo-700 rounded-xl shadow-lg shadow-indigo-900/30 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105 p-5 gap-3">
      <h2 className="text-2xl font-bold w-full text-center rounded-md p-2 text-white bg-gradient-to-r from-indigo-600 via-violet-700 to-cyan-600">
        {author.name}
      </h2>
      <p className="text-center italic">{author.bio}</p>
      <p className="text-gray-300"><strong>Birth Year:</strong> {author.birthYear}</p>
      <p className="text-gray-300"><strong>Death Year:</strong> {author.deathYear}</p>
      <p className="text-gray-300"><strong>Nationality:</strong> {author.nationality}</p>
      <div className="flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" onClick={() => console.log('Edit dialog opened for:', author)}>Edit Author</Button>
          </DialogTrigger>
          <DialogContent className="bg-[#23293a] border border-indigo-700 shadow-xl shadow-indigo-900/30 rounded-xl text-indigo-100">
            <DialogHeader>
              <DialogTitle>Edit Author</DialogTitle>
              <DialogDescription>Edit the author details.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="bio">Bio</Label>
                <Input id="bio" name="bio" value={formData.bio} onChange={handleChange} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="birthYear">Birth Year</Label>
                <Input id="birthYear" name="birthYear" value={formData.birthYear} onChange={handleChange} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="deathYear">Death Year</Label>
                <Input id="deathYear" name="deathYear" value={formData.deathYear} onChange={handleChange} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="nationality">Nationality</Label>
                <Input id="nationality" name="nationality" value={formData.nationality} onChange={handleChange} />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button className="bg-[#2d2e3a] hover:bg-[#2d2e3a]/80 hover:text-indigo-100 border-none" variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button className="bg-[#303b9c] hover:bg-[#303b9c]/80" type="submit">Save Changes</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive" className="bg-red-600 hover:bg-red-700">Delete Author</Button>
          </DialogTrigger>
          <DialogContent className="bg-[#23293a] border border-red-700 shadow-xl shadow-red-900/30 rounded-xl text-red-100">
            <DialogHeader>
              <DialogTitle className="text-red-400">Delete Author</DialogTitle>
              <DialogDescription className="text-red-200">
                Are you sure you want to delete <strong className="text-white">{author.name}</strong>?
                <br />
                <span className="text-sm text-red-300 mt-2 block">
                  This action cannot be undone. All associated books and data will be permanently removed.
                </span>
              </DialogDescription>
              <DialogFooter>
                <DialogClose asChild>
                  <Button className="bg-[#2d2e3a] hover:bg-[#2d2e3a]/80 hover:text-indigo-100 border-none" variant="outline">Cancel</Button>
                </DialogClose>
                <Button 
                  className="bg-red-600 hover:bg-red-700 text-white" 
                  onClick={() => deleteAuthorMutation(author.id as number)} 
                  variant="destructive"
                >
                  Delete Author
                </Button>
              </DialogFooter>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AuthorsCard;