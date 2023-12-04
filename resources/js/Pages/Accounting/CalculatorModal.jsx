import React, { useState } from "react";
import { Modal, Form, Select, InputNumber, Row, Col, Typography } from "antd";

export default function CalculatorModal({ modalVisible, handleClose }) {
    const [form] = Form.useForm();
    const [countName, setCountName] = useState("");
    const [percentage, setPercentage] = useState("");
    const [value, setValue] = useState("");

    const calculatePPN = (percentage, value) => {
        return value * (1 + percentage / 100);
    };

    const calculateDiscount = (percentage, value) => {
        return value * (1 - percentage / 100);
    };

    const resetFields = () => {
        setValue("");
        setCountName("");
        setPercentage("");
    };

    const handleCancel = () => {
        form.resetFields();
        handleClose();
        resetFields();
    };

    return (
        <>
            <Modal
                title="Calculator"
                centered
                open={modalVisible}
                onCancel={handleCancel}
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
                                    calculatePPN(percentage, value).toFixed(0)
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
                                            formatter={(value) => `${value}%`}
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
        </>
    );
}
