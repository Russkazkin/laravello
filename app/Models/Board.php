<?php

namespace App\Models;

use Auth;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class Board
 * @package App\Models
 * @mixin \Eloquent
 */
class Board extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'color', 'owner_id'];

    protected static function booted()
    {
        static::created(function(Board $board) {
            if (auth()->check()) {
                $board->owner()->associate(Auth::user());
            }
        });
    }

    public function lists(): HasMany
    {
        return $this->hasMany(CardList::class);
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }
}
