import React, { useState } from "react";
import {
    Input,
    Modal,
    Popconfirm,
    Table,
    Tooltip,
    Button,
    Select,
    InputNumber,
    DatePicker,
    Typography,
    Flex,
    Row,
    Col,
    Form,
} from "antd";
import {
    PlusOutlined,
    CalculatorOutlined,
    DeleteOutlined,
    DownloadOutlined,
} from "@ant-design/icons";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";

import moment from "moment";
import { accounts } from "@/Data/Accounts";

export default function Accounting(props) {
    const [form] = Form.useForm();

    const [modalAdd, setModalAdd] = useState(false);
    const [modalCalculator, setModalCalculator] = useState(false);
    const [deleteData, setDeleteData] = useState(null);
    const [Date, setDate] = useState("");
    const [Name, setName] = useState("");
    const [Debit, setDebit] = useState("");
    const [Credit, setCredit] = useState("");
    const [Notes, setNotes] = useState("");
    const [countName, setCountName] = useState("");
    const [percentage, setPercentage] = useState("");
    const [value, setValue] = useState("");

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
        },
    ];

    const clearData = () => {
        setCountName("");
        setValue("");
        setPercentage("");
        setDate("");
        setName("");
        setDebit("");
        setCredit("");
        setNotes("");
    };

    const handleAdd = (e) => {
        setModalAdd(false);
        handleSubmit();
        form.resetFields();
        clearData();
    };
    const handleCancel = (e) => {
        setModalAdd(false);
        form.resetFields();
        clearData();
    };

    const handleClose = (e) => {
        setModalCalculator(false);
        form.resetFields();
        clearData();
    };

    const calculatePPN = (percentage, value) => {
        return value * (1 + percentage / 100);
    };
    const calculateDiscount = (percentage, value) => {
        return value * (1 - percentage / 100);
    };
    const handleSubmit = () => {
        const data = {
            id: props.accounting.id,
            Date,
            Name,
            Debit,
            Credit,
            Notes,
        };
        router.post("/new", data);
        clearData();
    };

    const handleDelete = (id) => {
        router.post("/delete", { id });
        clearData();
    };

    return (
        <>
            <Authenticated auth={props.auth} errors={props.errors}>
                <Head title="Accounting" />

                <Typography.Title level={2}>Accountings</Typography.Title>

                <Flex
                    justify="space-between"
                    align="center"
                    style={{ marginBottom: "1em" }}
                >
                    <Button
                        onClick={() => setModalCalculator(true)}
                        icon={<CalculatorOutlined />}
                        type="primary"
                    >
                        COUNT
                    </Button>
                    <Tooltip title="Download current year data">
                        <Button
                            onClick={() =>
                                (window.location.href = route("download_data"))
                            }
                            icon={<DownloadOutlined />}
                            type="primary"
                        >
                            DOWNLOAD
                        </Button>
                    </Tooltip>
                    <Button
                        onClick={() => setModalAdd(true)}
                        icon={<PlusOutlined />}
                        type="primary"
                    >
                        ADD
                    </Button>
                </Flex>

                <Table
                    rowKey={props.accounting.id}
                    size="small"
                    pagination={{
                        pageSize: 10,
                        position: ["bottomCenter"],
                        hideOnSinglePage: true,
                    }}
                    scroll={{
                        x: "max-content",
                    }}
                    columns={columns}
                    dataSource={props.accounting.map((data) => ({
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
                        action: (
                            <Popconfirm
                                title="Delete the data"
                                description="Are you sure to delete this data?"
                                okText="Yes"
                                okButtonProps={{ danger: true }}
                                cancelText="No"
                                onConfirm={() => {
                                    handleDelete(data.id);
                                }}
                                onCancel={() => setDeleteData(null)}
                            >
                                <Button
                                    onClick={() => setDeleteData(data.id)}
                                    icon={<DeleteOutlined />}
                                    danger
                                    type="primary"
                                />
                            </Popconfirm>
                        ),
                    }))}
                />

                {/* Calculator Modal */}
                <Modal
                    title="Calculator"
                    centered
                    open={modalCalculator}
                    onCancel={handleClose}
                    okButtonProps={{ style: { display: "none" } }}
                    cancelButtonProps={{ style: { display: "none" } }}
                >
                    <Form layout="vertical" form={form}>
                        <Form.Item name="select" label="">
                            <Select
                                style={{ width: "100%" }}
                                size="large"
                                onChange={(selectedValue) => {
                                    setCountName(selectedValue);
                                    setValue("");
                                    setPercentage("");
                                }}
                                placeholder="What do you want to count?"
                                value={countName}
                                options={[
                                    {
                                        value: "discount",
                                        label: "Discount",
                                    },
                                    {
                                        value: "ppn",
                                        label: "Value Added Tax (PPN)",
                                    },
                                ]}
                                showSearch
                            />
                        </Form.Item>
                        {countName == "ppn" ? (
                            <>
                                <Row gutter={[8, 8]}>
                                    <Col span={12}>
                                        <Form.Item
                                            name="percentage"
                                            label="Percentage"
                                        >
                                            <Select
                                                placeholder="Select percentage"
                                                style={{ width: "100%" }}
                                                size="large"
                                                onChange={(selectedValue) =>
                                                    setPercentage(selectedValue)
                                                }
                                                value={percentage}
                                                options={[
                                                    {
                                                        value: "10",
                                                        label: "10%",
                                                    },
                                                    {
                                                        value: "11",
                                                        label: "11%",
                                                    },
                                                ]}
                                                showSearch
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name="value" label="Value">
                                            <InputNumber
                                                style={{ width: "100%" }}
                                                placeholder="Enter value"
                                                size="large"
                                                value={value}
                                                formatter={(value) =>
                                                    `IDR ${value}`.replace(
                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                        ","
                                                    )
                                                }
                                                parser={(value) =>
                                                    value.replace(
                                                        /IDR\s?|(,*)/g,
                                                        ""
                                                    )
                                                }
                                                onChange={(value) =>
                                                    setValue(parseFloat(value))
                                                }
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Typography className="calculatedvalue">
                                    IDR{" "}
                                    {new Intl.NumberFormat("en-US").format(
                                        calculatePPN(percentage, value).toFixed(
                                            0
                                        )
                                    )}
                                </Typography>
                            </>
                        ) : (
                            ""
                        )}
                        {countName == "discount" ? (
                            <>
                                <Row gutter={[8, 8]}>
                                    <Col span={12}>
                                        <Form.Item
                                            name="percentage"
                                            label="Percentage"
                                        >
                                            <InputNumber
                                                placeholder="Enter percentage"
                                                style={{ width: "100%" }}
                                                size="large"
                                                formatter={(value) =>
                                                    `${value}%`
                                                }
                                                parser={(value) =>
                                                    value.replace("%", "")
                                                }
                                                onChange={(value) =>
                                                    setPercentage(value)
                                                }
                                                value={percentage}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name="value" label="Value">
                                            <InputNumber
                                                style={{ width: "100%" }}
                                                placeholder="Enter value"
                                                size="large"
                                                value={value}
                                                formatter={(value) =>
                                                    `IDR ${value}`.replace(
                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                        ","
                                                    )
                                                }
                                                parser={(value) =>
                                                    value.replace(
                                                        /IDR\s?|(,*)/g,
                                                        ""
                                                    )
                                                }
                                                onChange={(value) =>
                                                    setValue(parseFloat(value))
                                                }
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Typography className="calculatedvalue">
                                    IDR{" "}
                                    {new Intl.NumberFormat("en-US").format(
                                        calculateDiscount(
                                            percentage,
                                            value
                                        ).toFixed(0)
                                    )}
                                </Typography>
                            </>
                        ) : (
                            ""
                        )}
                    </Form>
                </Modal>

                {/* Add Modal */}
                <Modal
                    title="Add Accounting"
                    centered
                    okText={"ADD"}
                    cancelText={"CANCEL"}
                    open={modalAdd}
                    onOk={handleAdd}
                    onCancel={handleCancel}
                    cancelButtonProps={{
                        danger: true,
                    }}
                    okButtonProps={{
                        disabled:
                            Date !== "" &&
                            Name !== "" &&
                            Debit > "-1" &&
                            Credit > "-1" &&
                            Notes !== ""
                                ? false
                                : true,
                    }}
                >
                    <Form layout="vertical" form={form}>
                        <Row gutter={[8, 8]}>
                            <Col span={12}>
                                <Form.Item
                                    name="date"
                                    label="Audit Date"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <DatePicker
                                        onChange={(date, dateString) =>
                                            setDate(
                                                moment(dateString).format(
                                                    "YYYY-MM-DD"
                                                )
                                            )
                                        }
                                        size="large"
                                        style={{ width: "100%" }}
                                        placeholder="Select audit date"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="audit_name"
                                    label="Audit Name"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select
                                        style={{ width: "100%" }}
                                        size="large"
                                        onChange={(selectedValue) =>
                                            setName(selectedValue)
                                        }
                                        value={Name}
                                        placeholder="Select audit name"
                                        options={auditNames}
                                        showSearch
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="debit_value"
                                    label="Debit Value"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        style={{ width: "100%" }}
                                        placeholder="Enter debit value"
                                        size="large"
                                        value={Debit}
                                        formatter={(value) =>
                                            `IDR ${value}`.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                            )
                                        }
                                        parser={(value) =>
                                            value.replace(/IDR\s?|(,*)/g, "")
                                        }
                                        onChange={(value) =>
                                            setDebit(parseFloat(value))
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="credit_value"
                                    label="Credit Value"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        style={{ width: "100%" }}
                                        placeholder="Enter debit value"
                                        size="large"
                                        value={Credit}
                                        formatter={(value) =>
                                            `IDR ${value}`.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                            )
                                        }
                                        parser={(value) =>
                                            value.replace(/IDR\s?|(,*)/g, "")
                                        }
                                        onChange={(value) =>
                                            setCredit(parseFloat(value))
                                        }
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item
                            name="notes"
                            label="Notes"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input.TextArea
                                placeholder="Explanation"
                                style={{ width: "100%" }}
                                onChange={(Notes) =>
                                    setNotes(Notes.target.value)
                                }
                                value={Notes}
                                size="large"
                                rows={2}
                                autoSize={false}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </Authenticated>
        </>
    );
}
