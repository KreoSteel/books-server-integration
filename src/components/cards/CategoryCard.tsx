import type { Category } from "@/utils/interfaces";
import { Button } from "../ui/button";
import useCategories from "@/hooks/useCategories";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, Label, Input, DialogClose } from "@/components/ui";
import { useState } from "react";

interface CategoryCardProps {
    category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
    const { deleteCategoryMutation, updateCategoryMutation } = useCategories()
    const [formData, setFormData] = useState({
        name: category.name,
        description: category.description,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        updateCategoryMutation({
            id: category.id,
            name: formData.name,
            description: formData.description,
        })
    }
    
    return (
        <div className="category-card min-h-80 max-w-150 min-w-120 w-full flex flex-col justify-between items-center bg-[#23293a] border border-indigo-700 rounded-xl shadow-lg shadow-indigo-900/30 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105 p-5 gap-3">
            <h2 className="text-2xl font-bold w-full text-center rounded-md p-2 text-white bg-gradient-to-r from-indigo-600 via-violet-700 to-cyan-600">
                {category.name}
            </h2>
            <p className="text-center italic text-xl">{category.description}</p>
            <div className="flex gap-2">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-[#303b9c] hover:bg-[#303b9c]/80">Edit</Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#23293a] border border-indigo-700 shadow-xl shadow-indigo-900/30 rounded-xl text-indigo-100">
                        <DialogHeader>
                            <DialogTitle>Edit Category</DialogTitle>
                            <DialogDescription>Edit the category</DialogDescription>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                                <div className="grid gap-3">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" name="name" value={formData.name} onChange={handleChange} />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="description">Description</Label>
                                    <Input id="description" name="description" value={formData.description} onChange={handleChange} />
                                </div>
                            </form>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button className="bg-[#2d2e3a] hover:bg-[#2d2e3a]/80 hover:text-indigo-100 border-none" variant="outline">Cancel</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button onClick={() => updateCategoryMutation({
                                        id: category.id,
                                        name: formData.name,
                                        description: formData.description,
                                    })} className="bg-[#303b9c] hover:bg-[#303b9c]/80" type="submit">Save Changes</Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="destructive" className="bg-red-600 hover:bg-red-700">Delete</Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#23293a] border border-red-700 shadow-xl shadow-red-900/20 rounded-xl text-red-100">
                        <DialogHeader>
                            <DialogTitle className="text-red-400">Delete Category</DialogTitle>
                            <DialogDescription className="text-red-200">
                                Are you sure you want to delete <strong className="text-white">{category.name}</strong>?
                                <br />
                                <span className="text-sm text-red-300 mt-2 block">
                                    This action cannot be undone. All associated data will be permanently removed.
                                </span>
                            </DialogDescription>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button className="bg-[#2d2e3a] hover:bg-[#2d2e3a]/80 hover:text-indigo-100 border-none" variant="outline">Cancel</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button 
                                        variant="destructive" 
                                        onClick={() => deleteCategoryMutation(category.id)} 
                                        className="bg-red-600/70 hover:bg-red-700 text-white"
                                    >
                                        Delete Category
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}