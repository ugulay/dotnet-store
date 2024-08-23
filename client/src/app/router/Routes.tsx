import { createBrowserRouter, Navigate } from "react-router-dom";

import App from "../layout/App";

// Pages
import HomePage from "../../features/home/HomePage";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import Basket from "../../features/basket/BasketPage";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "catalog", element: <Catalog /> },
            { path: "catalog/:id", element: <ProductDetails /> },
            { path: "about", element: <AboutPage /> },
            { path: "contact", element: <ContactPage /> },
            { path: "basket", element: <Basket /> },
            { path: "checkout", element: <CheckoutPage /> },
            { path: "server-error", element: <ServerError /> },
            { path: "not-found", element: <NotFound /> },
            { path: "*", element: <Navigate replace to="/not-found" /> },
        ]
    }
]);