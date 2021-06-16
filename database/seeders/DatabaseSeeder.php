<?php

namespace Database\Seeders;

use App\Models\Board;
use App\Models\CardList;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     * @throws \Exception
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

        collect([$board1, $board2, $board3])->each(static function (Board $board){
            $list1 = $board->lists()->create([
                'title' => 'To-Do'
            ]);
            $list2 = $board->lists()->create([
                'title' => 'In progress'
            ]);
            $list3 = $board->lists()->create([
                'title' => 'Done'
            ]);
            collect([$list1, $list2, $list3])->each(static function (CardList $list) use ($board) {
                $order = 1;
                collect([
                    'Buy groceries',
                    'Take the dog for a walk',
                    'Pay the bills',
                    'Get the car fixed',
                    'Write novel',
                    'Buy food',
                    'Paint a picture',
                    'Create a course'
                ])->random(random_int(2, 5))->each(static function(string $task) use ($board, $list, &$order) {
                    $list->cards()->create([
                        'title' => $task,
                        'owner_id' => $board->owner_id,
                        'order' => $order++,
                    ]);
                });
            });
        });
    }
}
