import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import { Table, Typography } from "antd";

export default function Dashboard(props) {
    const data = props.history;
    const columns = [
        {
            key: "Type",
            title: "Type",
            dataIndex: "Type",
            align: "center",
            className: "font-semibold",
            width: "max-content",
        },
        {
            key: "Description",
            title: "Description",
            dataIndex: "Description",
            align: "left",
        },
    ];

    return (
        <>
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
                                columns={columns}
                                dataSource={data}
                            />
                        </div>
                    </div>
                </div>
            </Authenticated>
        </>
    );
}
