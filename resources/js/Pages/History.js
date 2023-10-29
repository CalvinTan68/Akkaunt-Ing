import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from "@inertiajs/inertia-react";
import { Table } from "antd";

export default function Dashboard(props) {
    const columns = [
        {
            align: "center",
            width: "max-content",
            dataIndex: "type",
            key: "type",
            fixed: "left",
            className: "font-semibold",
        },
        {
            align: "left",
            width: "max-content",
            dataIndex: "description",
            key: "description",
        },
    ];

    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="History" />

            <div className="py-5">
                <div className="max-w-7xl mx-auto px-4 lg:px-10">
                    <h1 className="text-2xl font-semibold">History</h1>
                    <div className="overflow-x-auto pt-5">
                        <Table
                            size="small"
                            pagination={{
                                pageSize: 15,
                                position: ["bottomCenter"],
                                showSizeChanger: false,
                            }}
                            scroll={{
                                x: "max-content",
                            }}
                            columns={columns}
                            dataSource={props.history.map((data) => ({
                                key: data.id,
                                type: data.Type,
                                description: data.Description,
                            }))}
                        />
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
