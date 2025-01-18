<?php

namespace App\Http\Controllers;
use App\Http\Resources\GroupResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\StatsResource;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class UserController extends Controller
{
   

    public function stats(){
        try{
            $user = Auth::user();
            if($user->role!='admin'){
                    return response()->json([
                        'success' => false,
                        'message' => 'You are not admin.',
                    ], 403);
            }
    
            return new StatsResource(null);
        }
        catch (Exception $e) {
          
            return response()->json([
             'message' =>  'Failed to load stats',
                'error' => $e->getMessage()
            ], 500); 
        }
       
    }


    public function myProfile(){
        try{
            $user = Auth::user();
            $groupCount = $user->groups()->count();

  
    $totalClaims = $user->claims()
        ->where('status', 'unpaid')
        ->sum('amount');

    $totalDebts = $user->debts()
        ->where('status', 'unpaid')
        ->sum('amount');

    return response()->json([
            'user'=>new UserResource($user),
            'group_count' => $groupCount,
            'total_claims' => $totalClaims,
            'total_debts' => $totalDebts,
       ], 200); 
        } catch (Exception $e) {
          
            return response()->json([
             'message' =>  'Failed to load profile data',
                'error' => $e->getMessage()
            ], 500); 
        }
    }


    public function index()
    {
        try{
            $users = User::all();
            return UserResource::collection($users);
        }

        catch (Exception $e) {
          
            return response()->json([
             'message' =>  'Failed to load users',
                'error' => $e->getMessage()
            ], 500); 
        }
    }

    public function allWithoutAdmin()
    {
        try{
            $users = User::whereIn('role', ['vip', 'regular'])->paginate(5);
            return UserResource::collection($users);
        }

        catch (Exception $e) {
          
            return response()->json([
             'message' =>  'Failed to load users',
                'error' => $e->getMessage()
            ], 500); 
        }
    }

    public function changeUserRole(Request $request)
    {
        try{
            $validated = $request->validate([
                'user_id' => 'exists:users,id',
            ]);
      

        if(Auth::user()->role!='admin'){
            return response()->json([
                'error'=>'Nemate dozvolu da promenite rolu',
            ],403);
        }

        $user = User::findOrFail($validated['user_id']);
        if($user->role=='vip'){
            $user->role='regular';
        }
        else if($user->role=='regular'){
            $user->role='vip';
        }
        $user->save();
        return response()->json([
            'message'=>'Uspesno izmenjena rola usera'
        ]);
    }
        
        catch (Exception $e) {
          
            return response()->json([
             'message' =>  'Failed to load users',
                'error' => $e->getMessage()
            ], 500); 
        }
    }
}
