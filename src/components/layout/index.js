import React from "react";
import { Layout, Menu, Typography } from "antd";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

import "./layout.css";
import ROUTES from "../../routes";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const MyLayout = () => {
    const navigate = useNavigate();
    const params = useLocation();

    const pathname = () => {
        switch (params.pathname) {
            case "/orders":
                return "Заказы";
                break;
            case "/blog":
                return "Блог";
                break;
            case "/stocks":
                return "Акции";
                break;
            case "/analytics":
                return "Аналитика";
                break;
            case "/blog-create":
                return "Создание блога";
                break;
            case "/city":
                return "Города";
                break;
            case "/city-create":
                return "Создание города";
                break;
            case "/stock-create":
                return "Создание акции";
        }
    };

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
    ];

    return (
        <>
            {params.pathname == "/" ? (
                <div>
                    <Outlet />
                </div>
            ) : (
                <Layout style={{ minHeight: 950 }}>
                    <Sider
                        width={250}
                        breakpoint="lg"
                        collapsedWidth="0"
                        className="site-layout-background"
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: 20,
                                marginBottom: 20,
                            }}
                        >
                            <img src="/img/Frame62.png" />
                        </div>
                        <Menu mode="inline">
                            {items.map((item, index) => (
                                <Menu.Item
                                    key={index}
                                    onClick={() => navigate(item.navigate)}
                                >
                                    {item.label}
                                </Menu.Item>
                            ))}
                            <Menu.Item>Выйти</Menu.Item>
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
                                {pathname()}
                            </Title>
                        </Header>
                        <Content style={{ margin: "16px 16px 0" }}>
                            <div
                                className="site-layout-background"
                                style={{ padding: 24 }}
                            >
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
