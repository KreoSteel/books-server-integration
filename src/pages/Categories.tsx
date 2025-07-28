import { useFetchHook } from "@/hooks/useFetchHook";
import type { Category } from "@/utils/interfaces";
import { Link } from "react-router";
import PageWrapper from "@/components/layout/PageWrapper";
import CategoryCard from "@/components/cards/CategoryCard";
import { Button, Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose, DialogFooter, Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui";
import { PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import useCategories from "@/hooks/useCategories";


export default function Categories() {
    const { data: categories } = useFetchHook<Category[]>('categories', ['categories'])
    const { createCategoryMutation } = useCategories()
    const [currentPage, setCurrentPage] = useState(1);
    const categoriesPerPage = 4;
    const totalPages = Math.ceil((categories?.length || 0) / categoriesPerPage);
    const indexOfLastCategory = currentPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
    const currentCategories = categories?.slice(indexOfFirstCategory, indexOfLastCategory);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createCategoryMutation(formData)
    }
    return (
        <PageWrapper className="flex flex-col gap-18 w-screen h-screen items-center justify-center">
            <span className="flex flex-col gap-1 items-center">
                <h1 className="text-5xl font-bold">Categories</h1>
            </span>
            <div className="grid grid-cols-2 grid-rows-2 gap-10">
                {currentCategories?.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                ))}
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-[#303b9c] hover:bg-[#303b9c]/80">Add Category</Button>
                </DialogTrigger>
                <DialogContent className="bg-[#23293a] border border-indigo-700 shadow-xl shadow-indigo-900/30 rounded-xl text-indigo-100">
                    <DialogHeader>
                        <DialogTitle>Add Category</DialogTitle>
                        <DialogDescription>Add a new category</DialogDescription>
                    </DialogHeader>
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
                            <Button onClick={() => createCategoryMutation(formData)} className="bg-[#303b9c] hover:bg-[#303b9c]/80" type="submit">Save Changes</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
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
    )
}