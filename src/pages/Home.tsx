import PageWrapper from "../components/layout/PageWrapper";
import { Link } from "react-router";

export default function Home() {
    return (
        <PageWrapper className="justify-center">
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="flex flex-col items-center justify-center gap-8">
                    <h1 className="text-4xl font-bold">Welcome to the Library!</h1>
                    <span className="flex flex-col items-center justify-center gap-2">
                        <h2 className="text-2xl italic text-gray-300/90">Here you can manage your library, add, edit and delete books, authors, categories.</h2>
                        <h3 className="text-xl text-gray-300/90">To add your book, first of all you need to add an author and a category.</h3>
                    </span>
                </div>
                <Link to="/categories" className="text-2xl text-blue-500">Categories</Link>
                <Link to="/authors" className="text-2xl text-blue-500">Authors</Link>
                <Link to="/books" className="text-2xl text-blue-500">Books</Link>
            </div>
        </PageWrapper>
    )
}