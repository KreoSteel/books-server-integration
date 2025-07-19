import http from "../utils/http";

export default async function getAuthors() {
    try {
        const response = await http.get("/authors");
        return response.data;
    } catch (error) {
        console.error("Error fetching authors:", error);
        throw error;
    }
}