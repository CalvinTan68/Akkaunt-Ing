import React, { useState, useEffect } from 'react';
import { Input, Modal, FloatButton, Popconfirm, Table, Popover } from 'antd';
import { PlusOutlined, CalculatorOutlined, DeleteOutlined } from '@ant-design/icons';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link } from '@inertiajs/inertia-react';
import CurrencyFormat from 'react-currency-format';
import { Inertia } from '@inertiajs/inertia';
import './style.css';
import NProgress from 'nprogress'

export default function Accounting(props) {
    const columns = [
        {
          align: 'center',
          title: 'Date',
          width: 'max-content',
          dataIndex: 'date',
          key: 'date',
          fixed: 'left',
        },
        {
          align: 'center',
          title: 'Name',
          width: 'max-content',
          dataIndex: 'name',
          key: 'name',
          filters: [
            {
              text: 'Assets',
              value: 'Assets',
            },
            {
              text: 'Cash',
              value: 'Cash',
            },
            {
              text: 'Debits',
              value: 'Debits',
            },
            {
              text: 'Expenses',
              value: 'Expenses',
            },
            {
              text: 'Incomes',
              value: 'Incomes',
            },
            {
              text: 'Returns - Purchase',
              value: 'Returns - Purchase',
            },
            {
              text: 'Returns - Sales',
              value: 'Returns - Sales',
            },
            {
              text: 'Supplies',
              value: 'Supplies',
            },
            {
              text: 'Tax',
              value: 'Tax',
            },
          ],
          filterMode: 'menu',
          filterSearch: true,
          onFilter: (value, record) => record.name.includes(value),
        },
        {
          align: 'center',
          title: 'Debit',
          width: 'max-content',
          dataIndex: 'debit',
          key: 'debit',
          className: 'debit',
        },
        {
          align: 'center',
          title: 'Credit',
          width: 'max-content',
          dataIndex: 'credit',
          key: 'credit',
          className: 'credit',
        },
        {
          align: 'center',
          title: 'Notes',
          width: 'max-content',
          dataIndex: 'notes',
          key: 'notes',
        },
        {
          align: 'center',
          title: '',
          width: 'max-content',
          dataIndex: 'action',
          key: 'action',
        },
    ]

    const [modalAdd, setModalAdd] = useState(false);
    const handleAdd = (e) => {setModalAdd(false); clearData(); handleSubmit()};
    const handleCancel = (e) => {setModalAdd(false); clearData()};

    const [modalCalculator, setModalCalculator] = useState(false);
    const handleClose = (e) => {setModalCalculator(false); setCountName(''); setValue(''); setPercentage('')};

    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    const [Date, setDate] = useState("");
    const [Name, setName] = useState("");
    const [Debit, setDebit] = useState("");
    const [Credit, setCredit] = useState("");
    const [Notes, setNotes] = useState("");

    const [countName, setCountName] = useState("");
    const [percentage, setPercentage] = useState("");
    const [value, setValue] = useState("");
    const calculatePPN = (percentage, value) => {
        return parseFloat(value.replace('IDR ', '').replace(/,/g, '')) * (1 + (percentage / 100));
    }
    const calculateDiscount = (percentage, value) => {
        return parseFloat(value.replace('IDR ', '').replace(/,/g, '')) * (1 - (parseFloat(percentage.replace(/%/g,'')) / 100));
    }

    const [notification, setNotification] = useState(false)

    const clearData = () => {
        setCountName('')
        setValue('')
        setPercentage('')
        setDate('')
        setName('')
        setDebit('')
        setCredit('')
        setNotes('')
    }
    const showNotif = () => {
        Inertia.on('finish', () => {setNotification(true); NProgress.done();})
    }
    const handleSubmit = () => {
        const data = {
            id: props.accounting.id ,Date, Name, Debit, Credit, Notes
        };
        showNotif();
        setTimeout(() => {
            setNotification(false)
        }, 3500)
        Inertia.post('/new', data)
    }

    const [deleteData, setDeleteData] = useState(null);
    
    const handleDelete = (id) => {
        Inertia.post('/delete', { id }).then(() => {
          showNotif();
          setTimeout(() => {
            setNotification(false);
          }, 3500);
        });
      }
    


    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Accounting" />

            <div className="py-5">
                <div className="max-w-7xl mx-auto px-4 lg:px-10">
                <div className="flex justify-between">
                    {width >= 768 ?
                    <label onClick={() => setModalCalculator(true)} className="btn btn-sm btn-outline bg-orange-300 border hover:bg-orange-700">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calculator" viewBox="0 0 16 16">
                        <path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z"/>
                        <path d="M4 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-2zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-4z"/>
                        </svg>
                        &nbsp;
                        Count
                    </label>
                    : ''}
                    {width >= 768 ?
                    <Popover content={<div><p>Download current year data</p></div>}>
                        <label onClick={() => (window.location.href = route('download_data'))} className="btn btn-sm btn-outline bg-red-300 border hover:bg-red-700">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                        </svg>
                        &nbsp;
                        Download
                        </label>
                    </Popover>
                    : ''}
                    {width >= 768 ?
                    <label onClick={() => setModalAdd(true)} className="btn btn-sm btn-outline bg-emerald-400 border hover:bg-emerald-700">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                        </svg>
                        &nbsp;
                        Add
                    </label>
                    : ''}
                </div>
                {width < 768 ?
                    <h1 className='text-2xl font-semibold'>
                    Accounting
                    </h1>
                 : ''}

                <div className="overflow-x-auto pt-5">
                <Table
                size='small'
                pagination={{
                    pageSize: 10,
                    position: ['bottomCenter'],
                    showSizeChanger: false,
                }}
                scroll={{
                    x: 'max-content',
                  }}
                columns={columns}
                dataSource={props.accounting.map((data) => ({
                    key: data.id,
                    date: data.Date,
                    name: data.Name,
                    debit: (
                        <CurrencyFormat value={data.Debit} displayType={'text'} thousandSeparator={true} prefix={'IDR '} />
                    ),
                    credit: (
                        <CurrencyFormat value={data.Credit} displayType={'text'} thousandSeparator={true} prefix={'IDR '} />
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
                        showNotif();
                        setTimeout(() => {
                            setNotification(false);
                        }, 3500);
                        }}
                        onCancel={() => setDeleteData(null)}
                    >
                        <button
                        className="btn btn-error btn-sm text-white bg-red-500 hover:bg-red-700 border-0"
                        onClick={() => setDeleteData(data.id)}
                        >
                        <DeleteOutlined />
                        </button>
                    </Popconfirm>
                    ),
                }))}
                /> 
                </div>

                </div>
                </div>

            {width < 768 ?
                <FloatButton.Group
                    shape="circle"
                    style={{
                        right: 24,
                    }}
                    >
                    <FloatButton icon={<CalculatorOutlined />} onClick={() => setModalCalculator(true)} />
                    <FloatButton icon={<PlusOutlined />} onClick={() => setModalAdd(true)} />
                </FloatButton.Group>
                : ''}

                {/* Calculator Modal */}
                    <Modal
                    title="Calculator"
                    centered
                    open={modalCalculator}
                    onOk={handleAdd}
                    onCancel={handleClose}
                    okButtonProps={{style: {display: 'none'}}}
                    cancelButtonProps={{style: {display: 'none'}}}
                    >
                    <label className="label">
                        <span className="label-text">What do you want to count?</span>
                    </label>
                    <select className="select select-bordered w-full" onChange={(countName) => {setCountName(countName.target.value); setValue(''); setPercentage('')}} value={countName}>
                        <option selected>Choose options</option>
                        <option>Discount</option>
                        <option>Value Added Tax (PPN)</option>
                    </select>

                    {countName == 'Value Added Tax (PPN)' ? 
                    <>
                        <div className="grid grid-cols-2 gap-1">
                            <div>
                            <label className="label">
                                <span className="label-text">Percentage</span>
                            </label>
                            <select className="select select-bordered w-full" onChange={(e) => setPercentage(e.target.value)} value={percentage}>
                                    <option selected>Select Percentage</option>
                                    <option value={'10'}>10%</option>
                                    <option value={'11'}>11%</option>
                            </select>
                            </div>

                            <div>
                            <label className="label">
                                <span className="label-text">Value</span>
                            </label>
                            <CurrencyFormat thousandSeparator={true} className="input input-bordered w-full" onChange={(e) => setValue(e.target.value)} value={value} min="0" placeholder="Value" prefix='IDR ' />
                            </div>
                        </div>
                        <div className='flex justify-center text-2xl font-bold text-indigo-400 mt-5'>
                            <CurrencyFormat value={calculatePPN(percentage, value).toFixed(0)} displayType={'text'} thousandSeparator={true} prefix={'IDR '} className="calculatedvalue" as="value" />
                        </div>
                    </>
                    : ''}
                    {countName == 'Discount' ? 
                    <>
                        <div className="grid grid-cols-2 gap-1">
                            <div>
                            <label className="label">
                                <span className="label-text">Percentage</span>
                            </label>
                            <CurrencyFormat thousandSeparator={true} className="input input-bordered w-full" onChange={(e) => setPercentage(e.target.value)} value={percentage} min="0" placeholder="Percentage" suffix=' %' />
                            </div>

                            <div>
                            <label className="label">
                                <span className="label-text">Value</span>
                            </label>
                            <CurrencyFormat thousandSeparator={true} className="input input-bordered w-full" onChange={(e) => setValue(e.target.value)} value={value} min="0" placeholder="Value" prefix='IDR ' />
                            </div>
                        </div>
                        <div className='flex justify-center text-2xl font-bold text-indigo-400 mt-5'>
                            <CurrencyFormat value={calculateDiscount(percentage, value).toFixed(0)} displayType={'text'} thousandSeparator={true} prefix={'IDR '} className="calculatedvalue" as="value" />
                        </div>
                    </>
                    : ''}
                    </Modal>

                {/* Add Modal */}
                <Modal
                    title="Add Accounting"
                    centered
                    open={modalAdd}
                    onOk={handleAdd}
                    onCancel={handleCancel}
                    okButtonProps={{style: {display: 'none'}}}
                    cancelButtonProps={{style: {display: 'none'}}}
                >
                    <form>
                        <div className='grid grid-cols-2 gap-1'>
                            <div>
                                <label className="label">
                                    <span className="label-text">Audit Date</span>
                                </label>
                                <input type="date" placeholder="Audit Date" className="input input-bordered w-full" min={"2010-01-01"} max={"2030-12-31"} onChange={(Date) => setDate(Date.target.value)} value={Date} />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text">Audit Name</span>
                                </label>
                                <select className="select select-bordered w-full" onChange={(Name) => setName(Name.target.value)} value={Name}>
                                    <option selected>Select Audit Name</option>
                                    <option>Assets</option>
                                    <option>Cash</option>
                                    <option>Debits</option>
                                    <option>Expenses</option>
                                    <option>Incomes</option>
                                    <option>Returns - Purchase</option>
                                    <option>Returns - Sales</option>
                                    <option>Supplies</option>
                                    <option>Tax</option>
                                </select>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text">Debit Value</span>
                                </label>
                                <CurrencyFormat thousandSeparator={true} className="input input-bordered w-full" onChange={(Debit) => setDebit(parseFloat(Debit.target.value.replace('IDR ','').replace(/,/g, '')))} value={Debit} min="0" placeholder="Enter debit value" prefix='IDR ' />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text">Credit Value</span>
                                </label>
                                <CurrencyFormat thousandSeparator={true} className="input input-bordered w-full" onChange={(Credit) => setCredit(parseFloat(Credit.target.value.replace('IDR ','').replace(/,/g, '')))} value={Credit} min="0" placeholder="Enter credit value" prefix='IDR ' />
                            </div>
                        </div>
                        <label className="label">
                            <span className="label-text">Notes</span>
                        </label>
                        <Input placeholder="Detail (Keep it short but detailed" className="input input-bordered w-full" onChange={(Notes) => setNotes(Notes.target.value)} value={Notes} />
                        <div className="modal-action">
                            <label className="btn btn-sm bg-red-600 hover:bg-red-800 border-0" onClick={() => {handleCancel()}}>Cancel</label>
                            <label className={Date > '' && Name > '' && Debit > '-1' && Credit > '-1' && Notes > '' ? "btn btn-sm bg-emerald-400 border-0 hover:bg-emerald-700" : "btn btn-sm btn-disabled border-0" } onClick={() => {handleAdd()}}>Add</label>
                        </div>
                    </form>
                </Modal>
        </Authenticated>
    );
}
