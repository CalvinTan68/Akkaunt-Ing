<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\accounting;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = auth()->user()->id;
        $currentyear = date('Y');

        $recentdata = Accounting::where('User', $user)->orderBy('Date', 'desc')->take(10)->get();

        $accountingtotaldebit = Accounting::select(['Debit'])->where('User', $user)->sum('Debit');
        $accountingtotalcredit = Accounting::select(['Credit'])->where('User', $user)->sum('Credit');

        $accountingtotalincome = Accounting::select(['Debit'])->where('User', $user)->where('Name', 'Incomes')->sum('Debit');
        $accountingtotalexpense = Accounting::select(['Credit'])->where('User', $user)->where('Name', 'Expenses')->sum('Credit');

        $accountingtotalfromyear = Accounting::where('User', $user)->orderBy('Date', 'desc')->get()->last();
        $accountingtotaltoyear = Accounting::where('User', $user)->orderBy('Date', 'desc')->get()->first();

        $accountingthisyeardebit = Accounting::select(['Debit'])->where('User', $user)->whereBetween('Date', [$currentyear.'-01-01', $currentyear.'-12-31'])->sum('Debit');
        $accountingthisyearcredit = Accounting::select(['Credit'])->where('User', $user)->whereBetween('Date', [$currentyear.'-01-01', $currentyear.'-12-31'])->sum('Credit');

        $accountingthisyearincome = Accounting::where('User', $user)->whereBetween('Date', [$currentyear.'-01-01', $currentyear.'-12-31'])->where('Name','Incomes')->sum('Debit');
        $accountingthisyearexpense = Accounting::select(['Credit'])->where('User', $user)->whereBetween('Date', [$currentyear.'-01-01', $currentyear.'-12-31'])->where('Name','Expenses')->sum('Credit');

        return Inertia::render('Dashboard', [
            'accountingtotaldebit' => $accountingtotaldebit,
            'accountingtotalcredit' => $accountingtotalcredit,
            'accountingtotalincome' => $accountingtotalincome,
            'accountingtotalexpense' => $accountingtotalexpense,
            'accountingtotalfromyear' => $accountingtotalfromyear,
            'accountingtotaltoyear' => $accountingtotaltoyear,
            'accountingthisyeardebit' => $accountingthisyeardebit,
            'accountingthisyearcredit' => $accountingthisyearcredit,
            'accountingthisyearincome' => $accountingthisyearincome,
            'accountingthisyearexpense' => $accountingthisyearexpense,
            'recentdata' => $recentdata,
        ]);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\accounting  $accounting
     * @return \Illuminate\Http\Response
     */
    public function show(accounting $accounting)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\accounting  $accounting
     * @return \Illuminate\Http\Response
     */
    public function edit(accounting $accounting)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\accounting  $accounting
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, accounting $accounting)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\accounting  $accounting
     * @return \Illuminate\Http\Response
     */
    public function destroy(accounting $accounting)
    {
        //
    }
}
