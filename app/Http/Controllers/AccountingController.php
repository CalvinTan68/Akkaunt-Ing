<?php

namespace App\Http\Controllers;

use App\Exports\DownloadController;
use App\Models\accounting;
use App\Models\CRUDHistory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Controllers\Controller;



class AccountingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Accounting $accounting)
    {
        $user = auth()->user()->id;
        $accounting = Accounting::where('User', $user)->orderBy('Date','desc')->get();
        return Inertia::render('Accounting', [
            'accounting' => $accounting,
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
        $accounting = new Accounting();
        $accounting->Date = $request->Date;
        $accounting->Name = $request->Name;
        $accounting->Debit = $request->Debit;
        $accounting->Credit = $request->Credit;
        $accounting->Notes = $request->Notes;
        $accounting->User = auth()->user()->id;
        $accounting->save();

        $crudhistory = new CRUDHistory();
        $crudhistory->Type = 'Add';
        $crudhistory->Description = "Date: $request->Date | Name: $request->Name | D: $request->Debit | C: $request->Credit";
        $crudhistory->User = auth()->user()->id;
        $crudhistory->save();
        return redirect()->back()->with('message', 'Accounting added');
    }
    
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\accounting  $accounting
     * @return \Illuminate\Http\Response
     */
    public function show(accounting $accounting, request $request)
    {
        //
    }
    
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\accounting  $accounting
     * @return \Illuminate\Http\Response
     */
    public function edit(Accounting $accounting, request $request)
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
    public function destroy(Request $request)
    {
        $id = $request->input('id');
        $accounting = Accounting::find($id);
    
        if (!$accounting) {
            return redirect()->back()->withErrors(['message' => 'Accounting record not found']);
        }
    
        $date = $accounting->Date;
        $name = $accounting->Name;
        $debit = $accounting->Debit;
        $credit = $accounting->Credit;
    
        $accounting->delete();
    
        $crudhistory = new CRUDHistory();
        $crudhistory->Type = 'Delete';
        $crudhistory->Description = "Date: $date | Name: $name | D: $debit | C: $credit";
        $crudhistory->User = auth()->user()->id;
        $crudhistory->save();
    
        return redirect()->back()->with('message', 'Accounting deleted');
    }

    public function download_data() {
        return Excel::download(new DownloadController, 'dataexports.xls', \Maatwebsite\Excel\Excel::XLS);
    }
    


}
