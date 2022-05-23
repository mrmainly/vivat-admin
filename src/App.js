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
    City,
    CityCreate,
    BlogDetail,
    CityDetail,
} from "./pages";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.SIGN_IN} element={<MyLayout />}>
                    <Route index element={<SignIn />} />
                    <Route path={ROUTES.ORDERS} element={<Orders />} />
                    {/* блог */}
                    <Route path={ROUTES.BLOG} element={<Blog />} />
                    <Route path={ROUTES.BLOG_CREATE} element={<BlogCreate />} />
                    <Route
                        path={`${ROUTES.BLOG_DETAIL}/:id`}
                        element={<BlogDetail />}
                    />

                    <Route path={ROUTES.STOCKS} element={<Stocks />} />
                    <Route path={ROUTES.ANALYTICS} element={<Analytics />} />

                    <Route
                        path={ROUTES.STOCK_CREATE}
                        element={<StockCreate />}
                    />
                    <Route path={ROUTES.CITY} element={<City />} />
                    <Route path={ROUTES.CITY_CREATE} element={<CityCreate />} />
                    <Route
                        path={`${ROUTES.CITY_DETAIL}/:id`}
                        element={<CityDetail />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
