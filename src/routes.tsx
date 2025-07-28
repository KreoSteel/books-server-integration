import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Authors from "./pages/Authors";
import Categories from "./pages/Categories";

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
    },
    {
        path: "/categories",
        element: <Categories />,
    }
]);

export default router;
