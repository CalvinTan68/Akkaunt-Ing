import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/react";
import { Typography } from "antd";

import DataHistory from "./DataHistory";

export default function History(props) {
    return (
        <>
            <Authenticated auth={props.auth} errors={props.errors}>
                <Head title="History" />
                <Typography.Title level={2}>History</Typography.Title>
                <DataHistory data={props.history} />
            </Authenticated>
        </>
    );
}
