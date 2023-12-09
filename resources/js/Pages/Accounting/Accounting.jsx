import React, { useState } from "react";
import {
    Input,
    Modal,
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
    DownloadOutlined,
} from "@ant-design/icons";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";

import dayjs from "dayjs";
import { accounts } from "@/Data/Accounts";
import DataTable from "./DataTable";
import CalculatorModal from "./CalculatorModal";

export default function Accounting(props) {
    const [form] = Form.useForm();

    const [modalAdd, setModalAdd] = useState(false);
    const [modalCalculator, setModalCalculator] = useState(false);
    const [Date, setDate] = useState("");
    const [Name, setName] = useState("");
    const [Debit, setDebit] = useState("");
    const [Credit, setCredit] = useState("");
    const [Notes, setNotes] = useState("");

    const auditNames = accounts
        .map((name) => ({
            text: name,
            value: name,
            label: name,
        }))
        .sort((a, b) => a.text.localeCompare(b.text));

    const clearData = () => {
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

                <DataTable data={props.accounting} />

                <CalculatorModal
                    modalVisible={modalCalculator}
                    handleClose={handleClose}
                />

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
                                                dayjs(dateString).format(
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
                            <Input
                                placeholder="Explanation"
                                style={{ width: "100%" }}
                                onChange={(Notes) =>
                                    setNotes(Notes.target.value)
                                }
                                value={Notes}
                                size="large"
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </Authenticated>
        </>
    );
}
