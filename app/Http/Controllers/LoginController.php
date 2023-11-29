<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
class LoginController extends Controller
{
    /**
     * Display login page.
     *
     * @return Renderable
     */
    public function show()
    {
        return view('auth.login');
    }

    public function login(Request $request)
    {
        $pwd = $request->password ?? null ;
        $id = $request->id ?? null ;

        $userInfo = Member::where('id',$id)->whereRaw("pwd = UPPER(SHA1(UNHEX(SHA1('" . $pwd . "'))))")->first();

        if (!empty($userInfo->seq)) {
            $request->session()->regenerate();
            $request->session()->put('member_id',$userInfo->id);
            $request->session()->put('member_seq',$userInfo->seq);
            $request->session()->put('member_name',$userInfo->name);
            Member::find($userInfo->seq)->update(['latest_date' => date("Y-m-d H:i:s")]);
            auth()->login($userInfo);
            return redirect('/management');
        }

        return back()->withErrors([
            'id' => '로그인 정보를 다시 확인해주세요.',
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/management/login');
    }

}
