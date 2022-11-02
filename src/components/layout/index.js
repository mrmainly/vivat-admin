import React from "react";
import { Layout, Menu, Typography, Divider } from "antd";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import cookie from "js-cookie";

import "./layout.css";
import ROUTES from "../../routes";
import pathname from "./pathname";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const MyLayout = () => {
    const navigate = useNavigate();
    const params = useLocation();

    const items = [
        {
            label: "Заказы",
            navigate: ROUTES.ORDERS,
        },
        {
            label: "Блог",
            navigate: ROUTES.BLOG,
        },
        {
            label: "Акции",
            navigate: ROUTES.STOCKS,
        },
        {
            label: "Аналитика",
            navigate: ROUTES.ANALYTICS,
        },
        {
            label: "Города",
            navigate: ROUTES.CITY,
        },
        {
            label: "Пользователи",
            navigate: ROUTES.USERS,
        },
        {
            label: "Вакансии",
            navigate: ROUTES.WORK,
        },
        {
            label: "Товары",
            navigate: ROUTES.PRODUCTS,
        },
        {
            label: "Тематические подборки",
            navigate: ROUTES.CATALOG,
        },
    ];

    return (
        <>
            {params.pathname === "/" ? (
                <div>
                    <Outlet />
                </div>
            ) : (
                <Layout style={{ minHeight: 950 }}>
                    <Sider width={250} breakpoint="lg" collapsedWidth="0" className="site-layout-background">
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: 20,
                                marginBottom: 20,
                            }}
                        >
                            <img src="/img/Frame62.png" alt="" />
                        </div>
                        <Divider />
                        <Menu mode="inline">
                            {items.map((item, index) => (
                                <Menu.Item key={index} onClick={() => navigate(item.navigate)}>
                                    {item.label}
                                </Menu.Item>
                            ))}
                            <Menu.Item
                                onClick={() => {
                                    cookie.remove("jwttoken");
                                    navigate(ROUTES.SIGN_IN);
                                }}
                            >
                                Выйти
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header
                            className="site-layout-sub-header-background"
                            style={{
                                paddingLeft: 20,
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Title level={4} style={{ color: "#20B12E" }}>
                                {pathname(params)}
                            </Title>
                        </Header>
                        <Content style={{ margin: "16px 16px 0" }}>
                            <div className="site-layout-background" style={{ padding: 24, minHeight: 900 }}>
                                <Outlet />
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            )}
        </>
    );
};

export default MyLayout;
