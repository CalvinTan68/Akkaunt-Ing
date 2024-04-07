import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button, Card, Form, Input, Typography } from "antd";
import { useEffect } from "react";

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: true,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const onFinish = () => {
        post(route("login"));
    };

    const onValuesChange = (_, values) => {
        setData(values);
    };

    return (
        <>
            <Head title="Login" />
            <Card
                title="Login"
                extra={<Typography>AKKAUNT-ING</Typography>}
                style={{
                    width: 400,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
                className="auth-component"
            >
                {status && (
                    <div className="mb-4 font-medium text-sm text-green-600">
                        {status}
                    </div>
                )}

                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    onValuesChange={onValuesChange}
                    initialValues={data}
                >
                    <Form.Item
                        label="Email Address"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your email!",
                            },
                        ]}
                    >
                        <Input
                            type="email"
                            size="large"
                            placeholder="Enter your email"
                            prefix={<MailOutlined />}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your password!",
                            },
                        ]}
                    >
                        <Input.Password
                            size="large"
                            placeholder="Enter your password"
                            prefix={<LockOutlined />}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            block
                            htmlType="submit"
                            loading={processing}
                        >
                            LOG IN
                        </Button>
                        Or{" "}
                        <Link replace href={route("register")}>
                            register now!
                        </Link>
                    </Form.Item>
                </Form>
                {errors.email && (
                    <Typography style={{ color: "red", textAlign: "center" }}>
                        {errors.email}
                    </Typography>
                )}
            </Card>
        </>
    );
}
