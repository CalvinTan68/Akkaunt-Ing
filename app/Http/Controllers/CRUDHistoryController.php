<?php

namespace App\Http\Controllers;

use App\Models\CRUDHistory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Carbon;

class CRUDHistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = auth()->user()->id;
        $history = CRUDHistory::select(['Description', 'Type', 'created_at'])->where('User', '=', $user)->orderBy('created_at', 'desc')->limit(100)->get();
        return Inertia::render('History/History', [
            'history' => $history,
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
     * @param  \App\Models\CRUDHistory  $cRUDHistory
     * @return \Illuminate\Http\Response
     */
    public function show(CRUDHistory $cRUDHistory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\CRUDHistory  $cRUDHistory
     * @return \Illuminate\Http\Response
     */
    public function edit(CRUDHistory $cRUDHistory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CRUDHistory  $cRUDHistory
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CRUDHistory $cRUDHistory)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CRUDHistory  $cRUDHistory
     * @return \Illuminate\Http\Response
     */
    public function destroy(CRUDHistory $cRUDHistory)
    {
        //
    }
}
