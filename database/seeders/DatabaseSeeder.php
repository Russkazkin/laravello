<?php

namespace Database\Seeders;

use App\Models\Board;
use App\Models\User;
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
        User::factory()->count(10)->create();

        $board1 = Board::create([
            'title' => 'Groceries', 'color' => 'teal', 'owner_id' => 1,
        ]);
        $board2 = Board::create([
            'title' => 'Work', 'color' => 'orange', 'owner_id' => 2,
        ]);
        $board3 = Board::create([
            'title' => 'Hobbies', 'color' => 'indigo', 'owner_id' => 1,
        ]);

        $boards = collect([$board1, $board2, $board3]);
    }
}
