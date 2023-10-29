<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class accounting extends Model
{
    use HasFactory;
    protected $table='accountings';
    protected $fillable = [
        'Date','Name','Debit','Credit','Notes',
     ];
}
