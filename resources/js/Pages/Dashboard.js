import React, { useState, useEffect, Component } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import './style.css';
import { Head } from '@inertiajs/inertia-react';
import { Pie } from 'react-chartjs-2';
import { Card, Carousel } from 'antd';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);


export default function Dashboard(props) {
    const greetings = new Date().toLocaleTimeString([],{hourCycle:'h23', hour:'2-digit'});
    const year = new Date().getFullYear();
    const current = new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});

    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

      const contentStyle = {
        margin: 0,
        height: 'auto',
        width: 'auto',
        color: '#fff',
        lineHeight: 'auto',
        textAlign: 'center',
      };

    const datatotal1 = {
        labels: ['Total Debit', 'Total Credit'],
        datasets: [
            {
                label: 'Value ',
                data: [props.accountingtotaldebit, props.accountingtotalcredit],
                backgroundColor: [
                    '#10b981', '#ff5e52'
                ],
                borderColor: [
                    'white'
                ],
                borderWidth: 1,
            },
        ],
    };
    const datatotal2 = {
        labels: ['Total Income', 'Total Expense'],
        datasets: [
            {
                label: 'Value ',
                data: [props.accountingtotalincome, props.accountingtotalexpense],
                backgroundColor: [
                    '#10b981', '#ff5e52'
                ],
                borderColor: [
                    'white'
                ],
                borderWidth: 1,
            },
        ],
    };
    const datathisyear1 = {
        labels: ['Total Debit', 'Total Credit'],
        datasets: [
            {
                label: 'Value ',
                data: [props.accountingthisyeardebit, props.accountingthisyearcredit],
                backgroundColor: [
                    '#10b981', '#ff5e52'
                ],
                borderColor: [
                    'white'
                ],
                borderWidth: 1,
            },
        ],
    };
    const datathisyear2 = {
        labels: ['Total Income', 'Total Expense'],
        datasets: [
            {
                label: 'Value ',
                data: [props.accountingthisyearincome, props.accountingthisyearexpense],
                backgroundColor: [
                    '#10b981', '#ff5e52'
                ],
                borderColor: [
                    'white'
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Dashboard" />

            <div className="py-5">
                <div className="max-w-7xl mx-auto px-4 lg:px-10">
                    <div className='mb-4'>
                    <h1 className={width >= 768 ? 'text-2xl font-semibold' : 'text-xl font-semibold'}>
                        {greetings >= 6 && greetings <= 10 ? 'Good Morning' : greetings > 10 && greetings <= 14 ? 'Good Afternoon' : 'Good Evening'}, {props.auth.user.name}
                    </h1>
                    <p>
                        Today is {current}
                    </p>
                    </div>

                    {props.accountingtotalfromyear > '' && width >= 768 ?
                    <>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2 mb-8">
                        <Card
                            title="Debit & Credit"
                            headStyle={{textAlign: 'center'}}
                            style={{
                                width: 'auto',
                            }}
                            >
                            <p className='text-center text-sm'>{props.accountingtotalfromyear.Date} - {props.accountingtotaltoyear.Date}</p>
                            <p className="text-center">
                                {props.accountingtotaldebit > '0' && props.accountingtotalcredit > '0' ?
                                <Pie data={datatotal1} />
                                : <p className='text-gray-400'>Graph unavailable</p>}
                            </p>
                        </Card>
                        <Card
                            title="Incomes & Expenses"
                            headStyle={{textAlign: 'center'}}
                            style={{
                                width: 'auto',
                            }}
                            >
                            <p className='text-center text-sm'>{props.accountingtotalfromyear.Date} - {props.accountingtotaltoyear.Date}</p>
                            <p className="text-center">
                                {props.accountingtotalincome > '0' && props.accountingtotalexpense > '0' ?
                                <Pie data={datatotal2} />
                                : <p className='text-gray-400'>Graph unavailable</p>}
                            </p>
                        </Card>
                        <Card
                            title="Debit & Credit"
                            headStyle={{textAlign: 'center'}}
                            style={{
                                width: 'auto',
                            }}
                            >
                            <p className='text-center text-sm'>{year}-01-01 - {year}-12-31</p>
                            <p className="text-center">
                                {props.accountingthisyeardebit > '0' && props.accountingthisyearcredit > '0' ?
                                <Pie data={datathisyear1} />
                                : <p className='text-gray-400'>Graph unavailable</p>}
                            </p>
                        </Card>
                        <Card
                            title="Incomes & Expenses"
                            headStyle={{textAlign: 'center'}}
                            style={{
                                width: 'auto',
                            }}
                            >
                            <p className='text-center text-sm'>{year}-01-01 - {year}-12-31</p>
                            <p className="text-center">
                                {props.accountingthisyearincome > '0' && props.accountingthisyearexpense > '0' ?
                                <Pie data={datathisyear2} />
                                : <p className='text-gray-400'>Graph unavailable</p>}
                            </p>
                        </Card>
                    </div>
                    </>
                    : props.accountingtotalfromyear > '' && width < 768 ?
                    <>
                    <Carousel swipe={true}>
                        <div>
                            <Card
                                title="Debit & Credit"
                                headStyle={{textAlign: 'center'}}
                                style={contentStyle}
                                >
                                <p className='text-center text-sm text-black'>{props.accountingtotalfromyear.Date} - {props.accountingtotaltoyear.Date}</p>
                                <p className="text-center">
                                    {props.accountingtotaldebit > '0' && props.accountingtotalcredit > '0' ?
                                    <Pie data={datatotal1} />
                                    : <p className='text-gray-400'>Graph unavailable</p>}
                                </p>
                            </Card>
                        </div>
                        <div>
                            <Card
                                title="Incomes & Expenses"
                                headStyle={{textAlign: 'center'}}
                                style={contentStyle}
                                >
                                <p className='text-center text-sm text-black'>{props.accountingtotalfromyear.Date} - {props.accountingtotaltoyear.Date}</p>
                                <p className="text-center">
                                    {props.accountingtotalincome > '0' && props.accountingtotalexpense > '0' ?
                                    <Pie data={datatotal2} />
                                    : <p className='text-gray-400'>Graph unavailable</p>}
                                </p>
                            </Card>
                        </div>
                        <div>
                            <Card
                                title="Debit & Credit"
                                headStyle={{textAlign: 'center'}}
                                style={contentStyle}
                                >
                                <p className='text-center text-sm text-black'>{year}-01-01 - {year}-12-31</p>
                                <p className="text-center">
                                    {props.accountingthisyeardebit > '0' && props.accountingthisyearcredit > '0' ?
                                    <Pie data={datathisyear1} />
                                    : <p className='text-gray-400'>Graph unavailable</p>}
                                </p>
                            </Card>
                        </div>
                        <div>
                            <Card
                                title="Incomes & Expenses"
                                headStyle={{textAlign: 'center'}}
                                style={contentStyle}
                                >
                                <p className='text-center text-sm text-black'>{year}-01-01 - {year}-12-31</p>
                                <p className="text-center">
                                    {props.accountingthisyearincome > '0' && props.accountingthisyearexpense > '0' ?
                                    <Pie data={datathisyear2} />
                                    : <p className='text-gray-400'>Graph unavailable</p>}
                                </p>
                            </Card>
                        </div>
                    </Carousel>
                    </>
                    :
                    <p className='text-center text-xl text-gray-400'>You don't have any data. Please add a new one in the accounting page</p>
                    }
                    </div>
                    </div>
        </Authenticated>
    );
}
