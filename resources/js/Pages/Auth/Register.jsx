import React, { useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { Input, Form, Button, Typography, Card } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const onFinish = () => {
        post(route("register"));
    };

    const onValuesChange = (_, values) => {
        setData(values);
    };

    return (
        <>
            <Head title="Register" />
            <Card
                title="Register"
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
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    onValuesChange={onValuesChange}
                    initialValues={data}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your name!",
                            },
                        ]}
                    >
                        <Input
                            type="text"
                            autoComplete="name"
                            placeholder="Type in your name"
                            required
                            size="large"
                            prefix={<UserOutlined />}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Email"
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
                            autoComplete="username"
                            placeholder="Type in your email address"
                            required
                            size="large"
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
                            autoComplete="new-password"
                            placeholder="Type in your password"
                            required
                            size="large"
                            prefix={<LockOutlined />}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Confirm Password"
                        name="password_confirmation"
                        dependencies={["password"]}
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your password!",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue("password") === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            "The two passwords do not match!"
                                        )
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            placeholder="Retype your password"
                            required
                            size="large"
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
                            REGISTER
                        </Button>
                        <Link href={route("login")}>
                            Already have an account?
                        </Link>
                    </Form.Item>
                </Form>
                {errors.password && (
                    <Typography style={{ color: "red", textAlign: "center" }}>
                        {errors.password}
                    </Typography>
                )}
            </Card>
        </>
    );
}
