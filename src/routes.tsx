import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Authors from "./pages/Authors";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/books",
        element: <Books />,
    },
    {
        path: "/authors",
        element: <Authors />,
    }
]);

export default router;
