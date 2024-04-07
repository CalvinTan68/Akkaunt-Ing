<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class accounting extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'accountings';
    protected $fillable = [
        'Date', 'Name', 'Debit', 'Credit', 'Notes',
    ];
}
