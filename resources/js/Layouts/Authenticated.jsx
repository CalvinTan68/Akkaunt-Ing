import React from "react";
import { Link } from "@inertiajs/inertia-react";
import { Button, Dropdown, Layout, Typography } from "antd";
import {
    CalculatorOutlined,
    ClockCircleOutlined,
    HomeOutlined,
    LogoutOutlined,
    UnorderedListOutlined,
} from "@ant-design/icons";
const { Header, Content } = Layout;

export default function Authenticated({ auth, children }) {
    const items = [
        {
            label: <Link href={route("dashboard")}>Dashboard</Link>,
            key: "dashboard",
            icon: <HomeOutlined />,
        },
        {
            label: <Link href={route("accounting")}>Accounting</Link>,
            key: "accounting",
            icon: <CalculatorOutlined />,
        },
        {
            label: <Link href={route("history")}>History</Link>,
            key: "history",
            icon: <ClockCircleOutlined />,
        },
        {
            label: (
                <Link href={route("logout")} method="post">
                    Logout
                </Link>
            ),
            key: "logout",
            icon: <LogoutOutlined />,
            danger: true,
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
                            icon={<UnorderedListOutlined />}
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
