<?php

namespace App\Http\Controllers;
use App\Http\Resources\GroupResource;
use App\Http\Resources\StatsResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function myGroups(){

        try{

            $user = Auth::user();
            return GroupResource::Collection($user->groups);

        }catch (Exception $e) {
          
           return response()->json([
            'message' =>  'Failed to load users groups',
               'error' => $e->getMessage()
           ], 500); 
       }
    }


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
}
