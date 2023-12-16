import React, { useState } from "react";
import { Tooltip, Button, Typography, Flex } from "antd";
import {
    PlusOutlined,
    CalculatorOutlined,
    DownloadOutlined,
} from "@ant-design/icons";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/react";

import DataTable from "./DataTable";
import CalculatorModal from "./CalculatorModal";
import AddModal from "./AddModal";

export default function Accounting(props) {
    const [modalAdd, setModalAdd] = useState(false);
    const [modalCalculator, setModalCalculator] = useState(false);

    const openAdd = () => {
        setModalAdd(true);
    };

    const closeAdd = () => {
        setModalAdd(false);
    };

    const openCalculator = () => {
        setModalCalculator(true);
    };

    const closeCalculator = () => {
        setModalCalculator(false);
    };

    const downloadData = () => {
        window.location.href = route("download_data");
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
                        onClick={openCalculator}
                        icon={<CalculatorOutlined />}
                        type="primary"
                    >
                        COUNT
                    </Button>
                    <Tooltip title="Download current year data">
                        <Button
                            onClick={downloadData}
                            icon={<DownloadOutlined />}
                            type="primary"
                        >
                            DOWNLOAD
                        </Button>
                    </Tooltip>
                    <Button
                        onClick={openAdd}
                        icon={<PlusOutlined />}
                        type="primary"
                    >
                        ADD
                    </Button>
                </Flex>

                <DataTable data={props.accounting} />

                <CalculatorModal
                    modalVisible={modalCalculator}
                    handleClose={closeCalculator}
                />

                <AddModal modalVisible={modalAdd} handleClose={closeAdd} />
            </Authenticated>
        </>
    );
}
