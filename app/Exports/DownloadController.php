<?php

namespace App\Exports;

use App\Models\accounting;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

class DownloadController implements FromCollection, WithHeadings, WithMapping
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection(): Collection
    {
        $user = auth()->user()->id;
        $currentYear = date('Y');
        $startDate = $currentYear.'-01-01';
        $endDate = $currentYear.'-12-31';

        return Accounting::where('User', $user)
                         ->whereBetween('Date', [$startDate, $endDate])
                         ->orderBy('Date', 'desc')
                         ->get();
    }
    public function headings(): array
    {
        return [
            'ID',
            'Date',
            'Name',
            'Debit',
            'Credit',
            'Notes',
        ];
    }
    public function map($row): array
    {
        static $rowNumber = 0;

        $rowNumber++;

        return [
            $rowNumber,
            $row->Date,
            $row->Name,
            $row->Debit,
            $row->Credit,
            $row->Notes,
        ];
    }
}
