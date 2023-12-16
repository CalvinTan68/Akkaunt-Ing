import React, { useState, useEffect } from "react";
import {
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Modal,
    Row,
    Select,
} from "antd";
import dayjs from "dayjs";
import { accounts } from "@/Data/Accounts";
import { router } from "@inertiajs/react";

export default function AddModal({ modalVisible, handleClose }) {
    const [date, setDate] = useState("");
    const [name, setName] = useState("");
    const [debit, setDebit] = useState(0);
    const [credit, setCredit] = useState(0);
    const [note, setNote] = useState("");

    const [form] = Form.useForm();

    const auditNames = accounts
        .map((name) => ({
            text: name,
            value: name,
            label: name,
        }))
        .sort((a, b) => a.text.localeCompare(b.text));

    const addData = () => {
        const data = {
            Date: date,
            Name: name,
            Debit: debit,
            Credit: credit,
            Notes: note,
        };
        router.post("/new", data);
        form.resetFields();
        handleClose();
    };

    const handleCancel = () => {
        form.resetFields();
        handleClose();
    };

    return (
        <>
            <Modal
                title="Add Data"
                centered
                open={modalVisible}
                okText="ADD"
                cancelText="CANCEL"
                cancelButtonProps={{ danger: true }}
                okButtonProps={{
                    disabled:
                        date !== "" &&
                        name !== "" &&
                        debit > "-1" &&
                        credit > "-1" &&
                        note !== ""
                            ? false
                            : true,
                }}
                onOk={addData}
                onCancel={handleCancel}
            >
                <Form layout="vertical" form={form}>
                    <Row gutter={[8, 8]}>
                        <Col span={12}>
                            <Form.Item
                                name="date"
                                label="Audit Date"
                                rules={[{ required: true }]}
                            >
                                <DatePicker
                                    size="large"
                                    style={{ width: "100%" }}
                                    placeholder="Select audit date"
                                    onChange={(date, dateString) => {
                                        setDate(
                                            dayjs(dateString).format(
                                                "YYYY-MM-DD"
                                            )
                                        );
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="audit_name"
                                label="Audit Name"
                                rules={[{ required: true }]}
                            >
                                <Select
                                    size="large"
                                    style={{ width: "100%" }}
                                    placeholder="Select audit name"
                                    showSearch
                                    options={auditNames}
                                    onChange={(selectedValue) =>
                                        setName(selectedValue)
                                    }
                                    value={name}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="debit_value"
                                label="Debit Value"
                                rules={[{ required: true }]}
                            >
                                <InputNumber
                                    style={{ width: "100%" }}
                                    placeholder="Enter debit value"
                                    size="large"
                                    value={debit}
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
                                rules={[{ required: true }]}
                            >
                                <InputNumber
                                    style={{ width: "100%" }}
                                    placeholder="Enter credit value"
                                    size="large"
                                    value={credit}
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
                        rules={[{ required: true }]}
                    >
                        <Input
                            placeholder="Explanation"
                            style={{ width: "100%" }}
                            size="large"
                            value={note}
                            onChange={(note) => setNote(note.target.value)}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
