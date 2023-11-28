<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Member extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'member';
    protected $primaryKey = 'seq';


    protected $fillable = [
        "id",
        "pwd",
        "name",
        "email",
        "ip",
        "latest_date",
    ];

    protected $hidden = [
        'pwd',
    ];

    /**
     * 계정디테일
     * @param int seq
     * @return array
     */
    public function getMemberWithSeq(int $seq)
    {
        return $this->find($seq);
    }
}
