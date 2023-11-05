import React, { useState, useEffect } from "react";
import {
    Input,
    Modal,
    FloatButton,
    Popconfirm,
    Table,
    Popover,
    message,
    Button,
    Select,
    InputNumber,
    DatePicker,
} from "antd";
import {
    PlusOutlined,
    CalculatorOutlined,
    DeleteOutlined,
    DownloadOutlined,
} from "@ant-design/icons";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from "@inertiajs/inertia-react";
import CurrencyFormat from "react-currency-format";
import { Inertia } from "@inertiajs/inertia";
import "./style.css";
import NProgress from "nprogress";
import moment from "moment";

export default function Accounting(props) {
    const data = props.accounting;
    const auditNames = [
        "Assets",
        "Cash",
        "Debits",
        "Expenses",
        "Incomes",
        "Returns - Purchase",
        "Returns - Sales",
        "Supplies",
        "Tax",
    ].map((name) => ({ text: name, value: name, label: name }));

    const columns = [
        {
            align: "center",
            title: "Date",
            width: "max-content",
            dataIndex: "Date",
            key: "Date",
            fixed: "left",
        },
        {
            align: "center",
            title: "Name",
            width: "max-content",
            dataIndex: "Name",
            key: "Name",
            filters: [...auditNames],
            filterMode: "menu",
            filterSearch: true,
            onFilter: (value, record) => record.name.includes(value),
        },
        {
            align: "center",
            title: "Debit",
            width: "max-content",
            dataIndex: "Debit",
            key: "Debit",
            className: "debit",
            render: (text, record) => (
                <CurrencyFormat
                    value={record.Debit}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"IDR "}
                />
            ),
        },
        {
            align: "center",
            title: "Credit",
            width: "max-content",
            dataIndex: "Credit",
            key: "Credit",
            className: "credit",
            render: (text, record) => (
                <CurrencyFormat
                    value={record.Credit}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"IDR "}
                />
            ),
        },
        {
            align: "center",
            title: "Notes",
            width: "max-content",
            dataIndex: "Notes",
            key: "Notes",
        },
        {
            align: "center",
            title: "Action",
            width: "max-content",
            dataIndex: "Action",
            key: "Action",
            render: (text, record) => (
                <Popconfirm
                    title="Delete the data"
                    description="Are you sure to delete this data?"
                    okText="Yes"
                    okButtonProps={{ danger: true }}
                    cancelText="No"
                    onConfirm={() => {
                        handleDelete(record.id);
                    }}
                    onCancel={() => setDeleteData(null)}
                >
                    <Button
                        onClick={() => setDeleteData(record.id)}
                        icon={<DeleteOutlined />}
                        className="btn btn-error btn-sm text-white bg-red-500 hover:bg-red-700 border-0 button"
                    />
                </Popconfirm>
            ),
        },
    ];

    const [modalAdd, setModalAdd] = useState(false);
    const handleAdd = (e) => {
        setModalAdd(false);
        clearData();
        handleSubmit();
    };
    const handleCancel = (e) => {
        setModalAdd(false);
        clearData();
    };

    const [modalCalculator, setModalCalculator] = useState(false);
    const handleClose = (e) => {
        setModalCalculator(false);
        setCountName("Choose Options");
        setValue("");
        setPercentage("Percentages");
    };

    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const [Date, setDate] = useState("");
    const [Name, setName] = useState("Assets");
    const [Debit, setDebit] = useState("");
    const [Credit, setCredit] = useState("");
    const [Notes, setNotes] = useState("");

    const [countName, setCountName] = useState("Choose Options");
    const [percentage, setPercentage] = useState("Percentages");
    const [value, setValue] = useState("");
    const calculatePPN = (percentage, value) => {
        return (
            parseFloat(value.replace("IDR ", "").replace(/,/g, "")) *
            (1 + percentage / 100)
        );
    };
    const calculateDiscount = (percentage, value) => {
        return (
            parseFloat(value.replace("IDR ", "").replace(/,/g, "")) *
            (1 - parseFloat(percentage.replace(/%/g, "")) / 100)
        );
    };

    const [notification, setNotification] = useState(false);

    const clearData = () => {
        setCountName("Choose Options");
        setValue("");
        setPercentage("Percentages");
        setDate("");
        setName("Assets");
        setDebit("");
        setCredit("");
        setNotes("");
    };
    const showNotif = () => {
        Inertia.on("finish", () => {
            setNotification(true);
            NProgress.done();
        });
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
        showNotif();
        setTimeout(() => {
            setNotification(false);
        }, 3500);
        Inertia.post("/new", data);
    };

    const [deleteData, setDeleteData] = useState(null);

    const handleDelete = (id) => {
        Inertia.post("/delete", { id }).then(() => {
            showNotif();
            setTimeout(() => {
                setNotification(false);
            }, 3500);
        });
    };
    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Accounting" />

            <div className="py-5">
                <div className="max-w-7xl mx-auto px-4 lg:px-10">
                    {width >= 768 ? (
                        <>
                            <div className="flex justify-between">
                                <Button
                                    onClick={() => setModalCalculator(true)}
                                    icon={<CalculatorOutlined />}
                                    className="bg-orange-300 hover:bg-orange-700 border btn-outline uppercase"
                                >
                                    Count
                                </Button>
                                <Popover
                                    content={
                                        <div>
                                            <p>Download current year data</p>
                                        </div>
                                    }
                                >
                                    <Button
                                        onClick={() =>
                                            (window.location.href =
                                                route("download_data"))
                                        }
                                        icon={<DownloadOutlined />}
                                        className="bg-red-300 hover:bg-red-700 border btn-outline uppercase"
                                    >
                                        Download
                                    </Button>
                                </Popover>
                                <Button
                                    onClick={() => setModalAdd(true)}
                                    icon={<PlusOutlined />}
                                    className="btn-outline bg-emerald-400 hover:bg-emerald-700 border uppercase"
                                >
                                    Add
                                </Button>
                            </div>
                        </>
                    ) : (
                        <h1 className="text-2xl font-semibold">Accounting</h1>
                    )}

                    <div className="overflow-x-auto pt-5">
                        <Table
                            size="small"
                            pagination={{
                                pageSize: 10,
                                position: ["bottomCenter"],
                                showSizeChanger: false,
                            }}
                            scroll={{
                                x: "max-content",
                            }}
                            columns={columns}
                            dataSource={data}
                        />
                    </div>
                </div>
            </div>

            {width < 768 ? (
                <FloatButton.Group
                    shape="circle"
                    style={{
                        right: 24,
                    }}
                >
                    <FloatButton
                        icon={<CalculatorOutlined />}
                        onClick={() => setModalCalculator(true)}
                    />
                    <FloatButton
                        icon={<PlusOutlined />}
                        onClick={() => setModalAdd(true)}
                    />
                </FloatButton.Group>
            ) : (
                ""
            )}

            {/* Calculator Modal */}
            <Modal
                title="Calculator"
                centered
                open={modalCalculator}
                onOk={handleAdd}
                onCancel={handleClose}
                okButtonProps={{ style: { display: "none" } }}
                cancelButtonProps={{ style: { display: "none" } }}
            >
                <label className="label">
                    <span className="label-text">
                        What do you want to count?
                    </span>
                </label>
                <Select
                    className="w-full"
                    size="large"
                    onChange={(selectedValue) => {
                        setCountName(selectedValue);
                        setValue("");
                        setPercentage("Percentages");
                    }}
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
                />

                {countName == "ppn" ? (
                    <>
                        <div className="grid grid-cols-2 gap-1">
                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Percentage
                                    </span>
                                </label>
                                <Select
                                    className="w-full"
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
                                />
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text">Value</span>
                                </label>
                                <CurrencyFormat
                                    thousandSeparator={true}
                                    className="input input-bordered w-full"
                                    onChange={(e) => setValue(e.target.value)}
                                    value={value}
                                    min="0"
                                    placeholder="Value"
                                    prefix="IDR "
                                />
                            </div>
                        </div>
                        <div className="flex justify-center text-2xl font-bold text-indigo-400 mt-5">
                            <CurrencyFormat
                                value={calculatePPN(percentage, value).toFixed(
                                    0
                                )}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"IDR "}
                                className="calculatedvalue"
                                as="value"
                            />
                        </div>
                    </>
                ) : (
                    ""
                )}
                {countName == "discount" ? (
                    <>
                        <div className="grid grid-cols-2 gap-1">
                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Percentage
                                    </span>
                                </label>
                                <CurrencyFormat
                                    thousandSeparator={true}
                                    className="input input-bordered w-full"
                                    onChange={(e) =>
                                        setPercentage(e.target.value)
                                    }
                                    value={percentage}
                                    min="0"
                                    placeholder="Percentage"
                                    suffix=" %"
                                />
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text">Value</span>
                                </label>
                                <CurrencyFormat
                                    thousandSeparator={true}
                                    className="input input-bordered w-full"
                                    onChange={(e) => setValue(e.target.value)}
                                    value={value}
                                    min="0"
                                    placeholder="Value"
                                    prefix="IDR "
                                />
                            </div>
                        </div>
                        <div className="flex justify-center text-2xl font-bold text-indigo-400 mt-5">
                            <CurrencyFormat
                                value={calculateDiscount(
                                    percentage,
                                    value
                                ).toFixed(0)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"IDR "}
                                className="calculatedvalue"
                                as="value"
                            />
                        </div>
                    </>
                ) : (
                    ""
                )}
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
                    className:
                        "bg-red-600 hover:bg-red-800 border-0 button text-white",
                }}
                okButtonProps={{
                    className:
                        Date !== "" &&
                        Name !== "" &&
                        Debit > "-1" &&
                        Credit > "-1" &&
                        Notes !== ""
                            ? "bg-emerald-400 border-0 hover:bg-emerald-700 button button-ok"
                            : "btn-disabled border-0 button",
                }}
            >
                <form>
                    <div className="grid grid-cols-2 gap-1">
                        <div>
                            <label className="label">
                                <span className="label-text">Audit Date</span>
                            </label>
                            <DatePicker
                                onChange={(date, dateString) =>
                                    setDate(
                                        moment(dateString).format("YYYY-MM-DD")
                                    )
                                }
                                size="large"
                                className="w-full"
                                placeholder="Select audit date"
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text">Audit Name</span>
                            </label>
                            <Select
                                className="w-full"
                                size="large"
                                onChange={(selectedValue) =>
                                    setName(selectedValue)
                                }
                                value={Name}
                                defaultValue="Assets"
                                options={auditNames}
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text">Debit Value</span>
                            </label>
                            <InputNumber
                                className="w-full"
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
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text">Credit Value</span>
                            </label>
                            <InputNumber
                                className="w-full"
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
                        </div>
                    </div>
                    <label className="label">
                        <span className="label-text">Notes</span>
                    </label>
                    <Input.TextArea
                        placeholder="Detail (Keep it short but detailed"
                        className="w-full"
                        onChange={(Notes) => setNotes(Notes.target.value)}
                        value={Notes}
                        size="large"
                        rows={2}
                        autoSize={false}
                    />
                </form>
            </Modal>
        </Authenticated>
    );
}
