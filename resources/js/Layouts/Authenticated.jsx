import React from "react";
import { Link } from "@inertiajs/react";
import { Button, Dropdown, Layout, Typography } from "antd";
import {
    CalculatorOutlined,
    ClockCircleOutlined,
    HomeOutlined,
    LogoutOutlined,
    MenuOutlined,
} from "@ant-design/icons";
const { Header, Content } = Layout;

export default function Authenticated({ auth, children }) {
    const items = [
        {
            label: (
                <Link href={route("dashboard")}>
                    <Button
                        size="large"
                        icon={<HomeOutlined />}
                        className="menu-item"
                    >
                        Dashboard
                    </Button>
                </Link>
            ),
            key: "dashboard",
        },
        {
            label: (
                <Link href={route("accounting")}>
                    <Button
                        size="large"
                        icon={<CalculatorOutlined />}
                        className="menu-item"
                    >
                        Accounting
                    </Button>
                </Link>
            ),
            key: "accounting",
        },
        {
            label: (
                <Link href={route("history")}>
                    <Button
                        size="large"
                        icon={<ClockCircleOutlined />}
                        className="menu-item"
                    >
                        History
                    </Button>
                </Link>
            ),
            key: "history",
        },
        {
            label: (
                <Link href={route("logout")} method="post">
                    <Button
                        size="large"
                        icon={<LogoutOutlined />}
                        className="menu-item"
                        danger
                    >
                        Logout
                    </Button>
                </Link>
            ),
            key: "logout",
        },
    ];

    return (
        <>
            <Layout>
                <Header
                    style={{
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                        <Button
                            type="primary"
                            size="large"
                            icon={<MenuOutlined />}
                        />
                    </Dropdown>
                    <Link href="/dashboard">
                        <Typography
                            style={{ color: "white", padding: "0 10px" }}
                        >
                            AKKAUNT-ING
                        </Typography>
                    </Link>
                </Header>
                <Content
                    style={{
                        backgroundColor: "#f5f5f5",
                    }}
                    className="body-container"
                >
                    {children}
                </Content>
            </Layout>
        </>
    );
}
