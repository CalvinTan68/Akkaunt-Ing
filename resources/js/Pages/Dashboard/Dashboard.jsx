import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/react";
import { Pie } from "react-chartjs-2";
import { Card, Carousel, Col, Divider, Row, Table, Typography } from "antd";
import { Tooltip as Tippy } from "antd";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import moment from "moment";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard(props) {
    const date = new Date();

    const year = moment(date).format("YYYY");
    const greetings = moment(date).format("HH");

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
                data: [props.accountingtotaldebit, props.accountingtotalcredit],
                ...pieStyle,
            },
        ],
    };
    const datatotal2 = {
        labels: ["Total Income", "Total Expense"],
        datasets: [
            {
                data: [
                    props.accountingtotalincome,
                    props.accountingtotalexpense,
                ],
                ...pieStyle,
            },
        ],
    };
    const datathisyear1 = {
        labels: ["Total Debit", "Total Credit"],
        datasets: [
            {
                data: [
                    props.accountingthisyeardebit,
                    props.accountingthisyearcredit,
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
                    props.accountingthisyearincome,
                    props.accountingthisyearexpense,
                ],
                ...pieStyle,
            },
        ],
    };

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
                moment(created_at).format("YYYY-MM-DD HH:MM:ss"),
        },
    ];

    return (
        <>
            <Authenticated auth={props.auth} errors={props.errors}>
                <Head title="Dashboard" />
                <Typography.Title level={2}>
                    {greetings >= 6 && greetings <= 10
                        ? "Good Morning"
                        : greetings > 10 && greetings <= 14
                        ? "Good Afternoon"
                        : "Good Evening"}
                    , {props.auth.user.name}
                </Typography.Title>
                <Row gutter={[8, 8]}>
                    <Col xs={24} lg={12}>
                        <Divider>Recent Data Entry</Divider>
                        {props.recentdata.length > 0 ? (
                            <Table
                                rowKey="id"
                                dataSource={props.recentdata}
                                columns={columns}
                                pagination={false}
                                size="small"
                            />
                        ) : (
                            <Typography>No recent data</Typography>
                        )}
                    </Col>
                    <Col xs={24} lg={12}>
                        <Divider>Mini Graphs</Divider>
                        {props.accountingtotalfromyear !== "" ? (
                            <Carousel draggable="true" accessibility="true">
                                <Tippy title="Swipe to view more">
                                    <Card
                                        title={`${props.accountingtotalfromyear?.Date} - ${props.accountingtotaltoyear?.Date}`}
                                        headStyle={{ textAlign: "center" }}
                                        style={{
                                            width: "auto",
                                        }}
                                    >
                                        <Row>
                                            <Col xs={12}>
                                                {props.accountingtotaldebit >
                                                    "0" &&
                                                props.accountingtotalcredit >
                                                    "0" ? (
                                                    <>
                                                        <Pie
                                                            data={datatotal1}
                                                        />
                                                    </>
                                                ) : (
                                                    <Typography.Text>
                                                        Graph unavailable
                                                    </Typography.Text>
                                                )}
                                            </Col>
                                            <Col xs={12}>
                                                {props.accountingtotalincome >
                                                    "0" &&
                                                props.accountingtotalexpense >
                                                    "0" ? (
                                                    <Pie data={datatotal2} />
                                                ) : (
                                                    <Typography.Text>
                                                        Graph unavailable
                                                    </Typography.Text>
                                                )}
                                            </Col>
                                        </Row>
                                    </Card>
                                </Tippy>
                                <Card
                                    title={`${year}-01-01 - ${year}-12-31`}
                                    headStyle={{ textAlign: "center" }}
                                    style={{
                                        width: "auto",
                                    }}
                                >
                                    <Row>
                                        <Col xs={12}>
                                            {props.accountingthisyeardebit >
                                                "0" &&
                                            props.accountingthisyearcredit >
                                                "0" ? (
                                                <Pie data={datathisyear1} />
                                            ) : (
                                                <Typography.Text>
                                                    Graph unavailable
                                                </Typography.Text>
                                            )}
                                        </Col>
                                        <Col xs={12}>
                                            {props.accountingthisyearincome >
                                                "0" &&
                                            props.accountingthisyearexpense >
                                                "0" ? (
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
                                You don't have any data. Please add a new one in
                                the accounting page
                            </Typography.Text>
                        )}
                    </Col>
                </Row>
            </Authenticated>
        </>
    );
}
