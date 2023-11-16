import React, { useEffect } from "react";
import Button from "@/Components/Button";
import Guest from "@/Layouts/Guest";
import Label from "@/Components/Label";
import ValidationErrors from "@/Components/ValidationErrors";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import { Input } from "antd";

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

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <>
            <Guest>
                <Head title="Register" />

                <ValidationErrors errors={errors} />

                <form onSubmit={submit}>
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-person"
                            viewBox="0 0 16 16"
                            style={{ display: "inline-block" }}
                        >
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                        </svg>
                        <div
                            style={{
                                display: "inline-block",
                                verticalAlign: "middle",
                            }}
                            className="pl-1"
                        >
                            <Label forInput="name" value="Name" />
                        </div>
                        <div
                            style={{
                                display: "inline-block",
                                verticalAlign: "middle",
                                color: "red",
                            }}
                        >
                            *
                        </div>

                        <Input
                            type="text"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full input input-bordered"
                            autoComplete="name"
                            isFocused={true}
                            onChange={onHandleChange}
                            placeholder="Type in your name"
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-envelope-at"
                            viewBox="0 0 16 16"
                            style={{ display: "inline-block" }}
                        >
                            <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z" />
                            <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648Zm-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
                        </svg>
                        <div
                            style={{
                                display: "inline-block",
                                verticalAlign: "middle",
                            }}
                            className="pl-1"
                        >
                            <Label forInput="email" value="Email" />
                        </div>
                        <div
                            style={{
                                display: "inline-block",
                                verticalAlign: "middle",
                                color: "red",
                            }}
                        >
                            *
                        </div>

                        <Input
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full input input-bordered"
                            autoComplete="username"
                            onChange={onHandleChange}
                            placeholder="Type in your email address"
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-shield-lock"
                            viewBox="0 0 16 16"
                            style={{ display: "inline-block" }}
                        >
                            <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z" />
                            <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z" />
                        </svg>
                        <div
                            style={{
                                display: "inline-block",
                                verticalAlign: "middle",
                            }}
                            className="pl-1"
                        >
                            <Label forInput="password" value="Password" />
                        </div>
                        <div
                            style={{
                                display: "inline-block",
                                verticalAlign: "middle",
                                color: "red",
                            }}
                        >
                            *
                        </div>

                        <Input
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full input input-bordered"
                            autoComplete="new-password"
                            onChange={onHandleChange}
                            placeholder="Type in your password"
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-shield-lock"
                            viewBox="0 0 16 16"
                            style={{ display: "inline-block" }}
                        >
                            <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z" />
                            <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z" />
                        </svg>
                        <div
                            style={{
                                display: "inline-block",
                                verticalAlign: "middle",
                            }}
                            className="pl-1"
                        >
                            <Label
                                forInput="password_confirmation"
                                value="Confirm Password"
                            />
                        </div>
                        <div
                            style={{
                                display: "inline-block",
                                verticalAlign: "middle",
                                color: "red",
                            }}
                        >
                            *
                        </div>

                        <Input
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full input input-bordered"
                            onChange={onHandleChange}
                            placeholder="Retype your password"
                            required
                        />
                    </div>

                    <div className="flex justify-center mt-6">
                        <Button
                            className="btn btn-sm w-full"
                            processing={processing}
                        >
                            Register
                        </Button>
                    </div>
                </form>
            </Guest>
        </>
    );
}
