import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import "antd/dist/antd.min.css";

import MyLayout from "./components/layout";
import ROUTES from "./routes";
import { Blog, Orders, Stocks, Analytics } from "./pages";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.ORDERS} element={<MyLayout />}>
                    <Route index element={<Orders />} />
                    <Route path={ROUTES.BLOG} element={<Blog />} />
                    <Route path={ROUTES.STOCKS} element={<Stocks />} />
                    <Route path={ROUTES.ANALYTICS} element={<Analytics />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
