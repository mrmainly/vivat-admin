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
    Users,
    UsersDetail,
    OrdersDetail,
    Work,
    WorkCreate,
    WorkDetail,
    Tags,
    TagsCreate,
    TagDetail,
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

                    <Route path={ROUTES.USERS} element={<Users />} />
                    <Route
                        path={`${ROUTES.USERS_DETAIL}/:id`}
                        element={<UsersDetail />}
                    />
                    <Route
                        path={`${ROUTES.ORDERS_DETAIL}/:id`}
                        element={<OrdersDetail />}
                    />
                    <Route path={ROUTES.WORK} element={<Work />} />
                    <Route path={ROUTES.WORK_CREATE} element={<WorkCreate />} />
                    <Route
                        path={`${ROUTES.WORK_DETAIL}/:id`}
                        element={<WorkDetail />}
                    />
                    <Route path={ROUTES.TAGS} element={<Tags />} />
                    <Route path={ROUTES.TAGS_CREATE} element={<TagsCreate />} />
                    <Route
                        path={`${ROUTES.TAG_DETAIL}/:id`}
                        element={<TagDetail />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
