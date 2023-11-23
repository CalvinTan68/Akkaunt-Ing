<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        \App\Models\accounting::create([
            'Date'=>"2022-10-10",
            'Name'=>"123123",
            'Debit'=>'2138917623',
            'Credit'=>'123414283',
            'Notes'=>"12312",
            'User'=>'1'
        ]);
    }
}