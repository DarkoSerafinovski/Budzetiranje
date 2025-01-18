<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\PersonalExpense;
use App\Http\Resources\PersonalExpenseResource;
use Illuminate\Http\Request;

class PersonalExpenseController extends Controller
{
    public function store(Request $request)
    {
        try {

            if(Auth::user()->role!='vip'){
                return response()->json([
                    'success' => false,
                  'message' => 'Unauthorized user. You must have a VIP role to add a personal expense!!!',
                ], 401);
            }
            $validated = $request->validate([
                'name' => 'required|string|max:255|unique:personal_expenses,name',
                'amount' => 'required|numeric|min:0.01',
            ]);
            $personalExpense = PersonalExpense::create([
                'name' => $validated['name'],
                'date' => now(),
                'amount'=>$validated['amount'] ,
                'user_id'=>Auth::user()->id
            ]);

          
            return response()->json([
                'message' => 'The personal expense has been successfully added.',
                'data' => $personalExpense,
            ], 201); 
        } catch (\Exception $e) {
         
            return response()->json([
                'error' => 'Failed to add the personal expense. Please try again.',
            ], 500); 
        }
    }



    public function myPersonalExpenses(Request $request)
    {
        try {

            
            if(Auth::user()->role!='vip'){
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized user. You must have a VIP role to load personal expenses!!!',
                ], 401);
            }
           
          $myExpenses = Auth::user()->personalExpenses;
          return PersonalExpenseResource::collection($myExpenses);
          
        } catch (\Exception $e) {
         
            return response()->json([
                'error' => 'Failed to load personal expenses. Please try again later.',
            ], 500); 
        }
    }

    




}
