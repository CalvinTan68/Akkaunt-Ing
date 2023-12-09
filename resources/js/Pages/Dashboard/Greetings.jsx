import React from "react";
import dayjs from "dayjs";
import { Typography } from "antd";

export default function Greetings({ data }) {
    const date = new Date();
    const greetings = dayjs(date).format("HH");

    let greetingText;

    switch (true) {
        case greetings >= 6 && greetings < 11:
            greetingText = "Good Morning";
            break;
        case greetings >= 11 && greetings < 17:
            greetingText = "Good Afternoon";
            break;
        case greetings >= 17 && greetings < 22:
            greetingText = "Good Evening";
            break;
        default:
            greetingText = "Hello";
            break;
    }

    return (
        <>
            <Typography.Title level={2}>
                {greetingText}, {data.name}
            </Typography.Title>
        </>
    );
}
