import { Pie } from "react-chartjs-2";
import { Card, Carousel, Col, Divider, Row, Typography } from "antd";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import React from "react";
import moment from "moment";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DataGraphs({ data }) {
    const date = new Date();
    const year = moment(date).format("YYYY");

    const pieStyle = {
        label: "Value ",
        backgroundColor: ["#10b981", "#ff5e52"],
        borderColor: ["white"],
        borderWidth: 1,
    };

    const datatotal1 = {
        labels: ["Total Debit", "Total Credit"],
        datasets: [
            {
                data: [data.accountingtotaldebit, data.accountingtotalcredit],
                ...pieStyle,
            },
        ],
    };
    const datatotal2 = {
        labels: ["Total Income", "Total Expense"],
        datasets: [
            {
                data: [data.accountingtotalincome, data.accountingtotalexpense],
                ...pieStyle,
            },
        ],
    };
    const datathisyear1 = {
        labels: ["Total Debit", "Total Credit"],
        datasets: [
            {
                data: [
                    data.accountingthisyeardebit,
                    data.accountingthisyearcredit,
                ],
                ...pieStyle,
            },
        ],
    };
    const datathisyear2 = {
        labels: ["Total Income", "Total Expense"],
        datasets: [
            {
                data: [
                    data.accountingthisyearincome,
                    data.accountingthisyearexpense,
                ],
                ...pieStyle,
            },
        ],
    };
    return (
        <>
            <Divider>Mini Graphs</Divider>
            {data.accountingtotalfromyear !== "" ? (
                <Carousel draggable="true" accessibility="true">
                    <Card
                        title={`${data.accountingtotalfromyear?.Date} - ${data.accountingtotaltoyear?.Date}`}
                        headStyle={{ textAlign: "center" }}
                        style={{
                            width: "auto",
                        }}
                    >
                        <Row>
                            <Col xs={12}>
                                {data.accountingtotaldebit > "0" &&
                                data.accountingtotalcredit > "0" ? (
                                    <>
                                        <Pie data={datatotal1} />
                                    </>
                                ) : (
                                    <Typography.Text>
                                        Graph unavailable
                                    </Typography.Text>
                                )}
                            </Col>
                            <Col xs={12}>
                                {data.accountingtotalincome > "0" &&
                                data.accountingtotalexpense > "0" ? (
                                    <Pie data={datatotal2} />
                                ) : (
                                    <Typography.Text>
                                        Graph unavailable
                                    </Typography.Text>
                                )}
                            </Col>
                        </Row>
                    </Card>
                    <Card
                        title={`${year}-01-01 - ${year}-12-31`}
                        headStyle={{ textAlign: "center" }}
                        style={{
                            width: "auto",
                        }}
                    >
                        <Row>
                            <Col xs={12}>
                                {data.accountingthisyeardebit > "0" &&
                                data.accountingthisyearcredit > "0" ? (
                                    <Pie data={datathisyear1} />
                                ) : (
                                    <Typography.Text>
                                        Graph unavailable
                                    </Typography.Text>
                                )}
                            </Col>
                            <Col xs={12}>
                                {data.accountingthisyearincome > "0" &&
                                data.accountingthisyearexpense > "0" ? (
                                    <Pie data={datathisyear2} />
                                ) : (
                                    <Typography.Text>
                                        Graph unavailable
                                    </Typography.Text>
                                )}
                            </Col>
                        </Row>
                    </Card>
                </Carousel>
            ) : (
                <Typography.Text>
                    You don't have any data. Please add a new one in the
                    accounting page
                </Typography.Text>
            )}
        </>
    );
}
