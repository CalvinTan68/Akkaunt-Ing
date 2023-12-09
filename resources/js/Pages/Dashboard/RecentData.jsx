import React from "react";
import { Divider, Table, Typography } from "antd";
import dayjs from "dayjs";

export default function RecentData({ data }) {
    const columns = [
        {
            title: "Name",
            dataIndex: "Name",
            key: "name",
            align: "center",
        },
        {
            title: "Debit",
            dataIndex: "Debit",
            key: "debit",
            className: "debit",
            align: "center",
            render: (debit) =>
                "IDR " + new Intl.NumberFormat("en-US").format(debit),
        },
        {
            title: "Credit",
            dataIndex: "Credit",
            key: "credit",
            className: "credit",
            align: "center",
            render: (credit) =>
                "IDR " + new Intl.NumberFormat("en-US").format(credit),
        },
        {
            title: "Added on",
            dataIndex: "created_at",
            key: "created_at",
            align: "center",
            render: (created_at) =>
                dayjs(created_at).format("YYYY-MM-DD HH:MM:ss"),
        },
    ];

    return (
        <>
            <Divider>Recent Data Entry</Divider>
            {data.length > 0 ? (
                <Table
                    rowKey="id"
                    dataSource={data}
                    columns={columns}
                    pagination={false}
                    size="small"
                />
            ) : (
                <Typography>No recent data</Typography>
            )}
        </>
    );
}
