import { Head, Link } from "@inertiajs/react";
import { Button, Layout, Typography } from "antd";
import { useState } from "react";
const { Header, Content, Footer } = Layout;

export default function Public(props) {
    const [loading, setLoading] = useState(false);

    const redirecting = () => {
        setLoading(true);
    };

    return (
        <>
            <div className="public-page">
                <Head title="Simple Bookkeeping App" />
                <Layout>
                    <Header
                        style={{
                            position: "fixed",
                            top: 0,
                            zIndex: 1,
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Link href="/">
                            <Typography
                                style={{ color: "white", padding: "0 10px" }}
                            >
                                AKKAUNT-ING
                            </Typography>
                        </Link>

                        {props.auth.user ? (
                            <Link href={route("dashboard")}>
                                <Button
                                    type="primary"
                                    loading={loading}
                                    onClick={redirecting}
                                >
                                    Dashboard
                                </Button>
                            </Link>
                        ) : (
                            <Link href={route("login")}>
                                <Button
                                    type="primary"
                                    loading={loading}
                                    onClick={redirecting}
                                >
                                    Get Started
                                </Button>
                            </Link>
                        )}
                    </Header>
                    <Content>
                        <section className="sec-1">
                            <h1>Bookkeeping made easy!</h1>
                        </section>
                        <section className="sec-2">
                            <h1>Features</h1>
                        </section>
                        <section className="sec-3">
                            <h1>FAQ</h1>
                        </section>
                    </Content>
                    <Footer>2023</Footer>
                </Layout>
            </div>
        </>
    );
}
