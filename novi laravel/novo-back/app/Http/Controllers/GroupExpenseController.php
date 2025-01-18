<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Group;
use App\Models\GroupExpense;
use App\Models\DebtClaim;
use Illuminate\Http\Request;
use App\Mail\GroupExpenseNotification;
use Illuminate\Support\Facades\Mail;


class GroupExpenseController extends Controller
{
    public function store(Request $request)
{
    try {
        $validated = $request->validate([
            'group_id' => 'required|exists:groups,id',
            'purpose' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0.01',
        ]);

        $user = Auth::user(); 
        $group = Group::findOrFail($validated['group_id']); 

        
        if (!$group->users->contains($user->id)) {
            return response()->json([
                'success' => false,
                'message' => 'You are not a member of this group.',
            ], 403);
        }

        
        $groupExpense = GroupExpense::create([
            'group_id' => $validated['group_id'],
            'payer_id' => $user->id,
            'date' => now(),
            'purpose' => $validated['purpose'],
            'amount' => $validated['amount'],
        ]);

        
        $groupMembers = $group->users->where('id', '!=', $user->id);

        
        if ($groupMembers->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'No other members in the group to create debt claims.',
            ], 400);
        }

        
        $debtAmount = $validated['amount'] / ($groupMembers->count()+1);

       
        foreach ($groupMembers as $member) {
            DebtClaim::create([
                'expense_id' => $groupExpense->id,
                'creditor_id' => $user->id,
                'debtor_id' => $member->id,
                'amount' => $debtAmount,
                'status' => 'unpaid',
            ]);



            
        Mail::to($member->email)->send(new GroupExpenseNotification(
            $user->username,
            $validated['amount'],
            $validated['purpose'],
            now()->toDateString(),
            $debtAmount
        ));

        }



       
        return response()->json([
            'success' => true,
            'message' => 'Group expense and debt claims created successfully.',
            'data' => $groupExpense,
        ], 201);

    } catch (Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'An error occurred while creating the group expense.',
            'error' => $e->getMessage(),
        ], 500);
    }
}

}
