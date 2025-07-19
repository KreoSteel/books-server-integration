import PageWrapper from "../components/layout/PageWrapper";
import { Link } from "react-router";


export default function Books() {
    return (
        <PageWrapper>
            <div className="flex flex-col items-center justify-center">
                <Link to="/">Home</Link>
                <h1 className="text-2xl font-bold">Books</h1>
            </div>
        </PageWrapper>
    )
}