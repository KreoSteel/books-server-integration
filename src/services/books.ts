import http from "../utils/http";

export default async function getBooks() {
    try {
        const response = await http.get("/books");
        return response.data;
    } catch (error) {
        console.error("Error fetching books:", error);
        throw error;
    }
}

export async function getBookById(id: string) {
    try {
        const response = await http.get(`/books/${id}`)
        return response.data;
    } catch (error) {
        console.error("Error fetching book by id:", error);
        throw error;
    }
}