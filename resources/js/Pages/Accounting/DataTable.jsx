import React from "react";
import { Table, Typography, Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { router } from "@inertiajs/react";
import { accounts } from "@/Data/Accounts";

export default function DataTable({ data }) {
    const handleDelete = (id) => {
        router.post("/delete", { id });
    };

    const auditNames = accounts
        .map((name) => ({
            text: name,
            value: name,
            label: name,
        }))
        .sort((a, b) => a.text.localeCompare(b.text));

    const columns = [
        {
            align: "center",
            title: "Date",
            width: "max-content",
            dataIndex: "date",
            key: "date",
            fixed: "left",
        },
        {
            align: "center",
            title: "Name",
            width: "max-content",
            dataIndex: "name",
            key: "name",
            filters: [...auditNames],
            filterMode: "menu",
            filterSearch: true,
            onFilter: (value, record) => record.name.includes(value),
        },
        {
            align: "center",
            title: "Debit",
            width: "max-content",
            dataIndex: "debit",
            key: "debit",
            className: "debit",
        },
        {
            align: "center",
            title: "Credit",
            width: "max-content",
            dataIndex: "credit",
            key: "credit",
            className: "credit",
        },
        {
            align: "center",
            title: "Notes",
            width: "max-content",
            dataIndex: "notes",
            key: "notes",
        },
        {
            align: "center",
            title: "Action",
            width: "max-content",
            dataIndex: "action",
            key: "action",
            render: (_, record) => (
                <Popconfirm
                    title="Delete the data"
                    description="Are you sure to delete this data?"
                    okText="Yes"
                    okButtonProps={{ danger: true }}
                    cancelText="No"
                    onConfirm={() => {
                        handleDelete(record.key);
                    }}
                >
                    <Button icon={<DeleteOutlined />} danger type="primary" />
                </Popconfirm>
            ),
        },
    ];

    return (
        <>
            <Table
                rowKey={data.id}
                size="small"
                pagination={{
                    pageSize: 10,
                    position: ["bottomCenter"],
                    hideOnSinglePage: true,
                    showSizeChanger: false,
                }}
                scroll={{
                    x: "max-content",
                }}
                columns={columns}
                dataSource={data.map((data) => ({
                    key: data.id,
                    date: data.Date,
                    name: data.Name,
                    debit: (
                        <>
                            <Typography className="debit">
                                IDR{" "}
                                {new Intl.NumberFormat("en-US").format(
                                    data.Debit
                                )}
                            </Typography>
                        </>
                    ),
                    credit: (
                        <>
                            <Typography className="credit">
                                IDR{" "}
                                {new Intl.NumberFormat("en-US").format(
                                    data.Credit
                                )}
                            </Typography>
                        </>
                    ),
                    notes: data.Notes,
                }))}
            />
        </>
    );
}
