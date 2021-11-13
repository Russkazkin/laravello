<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    public function viewOwnBoards(User $user, User $owner): bool
    {
        return $user->id === $owner->id;
    }
}
