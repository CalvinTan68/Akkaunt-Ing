import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import { Table, Typography } from "antd";

export default function Dashboard(props) {
    const data = props.history;
    const columns = [
        {
            key: "Type",
            title: "TYPE",
            dataIndex: "Type",
            align: "center",
            className: "table-index",
            width: "max-content",
        },
        {
            key: "Description",
            title: "DESCRIPTION",
            dataIndex: "Description",
            align: "left",
        },
    ];

    return (
        <>
            <Authenticated auth={props.auth} errors={props.errors}>
                <Head title="History" />
                <Typography.Title level={2}>History</Typography.Title>
                <Table
                    rowKey="created_at"
                    size="small"
                    pagination={{
                        pageSize: 15,
                        position: ["bottomCenter"],
                        showSizeChanger: false,
                    }}
                    columns={columns}
                    dataSource={data}
                />
            </Authenticated>
        </>
    );
}
