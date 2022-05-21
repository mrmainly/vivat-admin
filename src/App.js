import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import "antd/dist/antd.min.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import MyLayout from "./components/layout";
import ROUTES from "./routes";
import {
    Blog,
    Orders,
    Stocks,
    Analytics,
    BlogCreate,
    StockCreate,
    SignIn,
} from "./pages";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.SIGN_IN} element={<MyLayout />}>
                    <Route index element={<SignIn />} />
                    <Route path={ROUTES.ORDERS} element={<Orders />} />
                    <Route path={ROUTES.BLOG} element={<Blog />} />
                    <Route path={ROUTES.STOCKS} element={<Stocks />} />
                    <Route path={ROUTES.ANALYTICS} element={<Analytics />} />

                    <Route path={ROUTES.BLOG_CREATE} element={<BlogCreate />} />
                    <Route
                        path={ROUTES.STOCK_CREATE}
                        element={<StockCreate />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
