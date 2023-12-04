import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/react";
import { Col, Row } from "antd";

import RecentData from "./RecentData";
import DataGraphs from "./DataGraphs";
import Greetings from "./Greetings";

export default function Dashboard(props) {
    return (
        <>
            <Authenticated auth={props.auth} errors={props.errors}>
                <Head title="Dashboard" />
                <Greetings data={props.auth.user} />
                <Row gutter={[8, 8]}>
                    <Col xs={24} lg={12}>
                        <RecentData data={props.recentdata} />
                    </Col>
                    <Col xs={24} lg={12}>
                        <DataGraphs data={props} />
                    </Col>
                </Row>
            </Authenticated>
        </>
    );
}
