import React from "react";
import { Table } from "antd";

export default function DataHistory({ data }) {
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
            <Table
                rowKey="created_at"
                size="small"
                pagination={{
                    pageSize: 15,
                    position: ["bottomCenter"],
                    hideOnSinglePage: true,
                    showSizeChanger: false,
                }}
                columns={columns}
                dataSource={data}
            />
        </>
    );
}
