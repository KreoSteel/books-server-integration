import PageWrapper from "../components/layout/PageWrapper";
import { Link } from "react-router";

export default function Home() {
    return (
        <PageWrapper className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-4xl font-bold">Home Page</h1>
                <Link to="/books" className="text-2xl text-blue-500">Books</Link>
                <Link to="/authors" className="text-2xl text-blue-500">Authors</Link>
                <Link to="/categories" className="text-2xl text-blue-500">Categories</Link>
                <Link to="/languages" className="text-2xl text-blue-500">Languages</Link>
            </div>
        </PageWrapper>
    )
}