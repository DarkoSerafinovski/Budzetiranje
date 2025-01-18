<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\DebtClaim;
use Illuminate\Http\Request;
use App\Mail\DebtPaidNotification;
use Illuminate\Support\Facades\Mail;

class DebtClaimController extends Controller
{
    public function paidDebt($id){
        try {
            $debt = DebtClaim::findOrFail($id);
            $user = Auth::user();
    
            if ($debt->debtor->id != $user->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'You are not a debtor in this debt.',
                ], 403);
            }
    
           
            $debt->status = "paid";
            $debt->save();
    
     
            $creditor = $debt->creditor;
            $expense = $debt->expense;
    
           
            Mail::to($creditor->email)->send(new DebtPaidNotification($user, $expense, $debt));
    
            return response()->json([
                'success' => true,
                'message' => 'Debt marked as paid and notification sent to creditor.',
            ], 200);
    
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update status or send email. Please try again later.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
