<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Group;
use Illuminate\Http\Resources\Json\JsonResource;

class StatsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        
        return [
            "total"=>$this->totalUsers(),
            "vip"=>$this->vipUsers(),
            "regular"=>$this->regularUsers(),
            "totalGroups"=>$this->totalGroups(),
            "totalAverageExpensesInGroups"=>$this->totalAverageExpensesInGroups(),
            "totalExpenses"=>$this->totalExpenses(),



        ];
    }


    private function totalUsers(){
        return User::count();
    }

    private function vipUsers(){
       
       return User::where('role', 'vip')->count();
        
    }

    private function regularUsers(){
       
      return User::where('role', 'regular')->count();
       
    }

    private function totalGroups()
{
    return Group::count();
}



private function totalAverageExpensesInGroups()
{

    $totalAverageExpense = 0;
    $totalGroups = Group::count();

    if ($totalGroups > 0) {
        $groups = Group::all();

        foreach ($groups as $group) {
            $averageExpenseForGroup = $group->expenses()->avg('amount');
            $totalAverageExpense += $averageExpenseForGroup;
        }

       
        return $totalAverageExpense;
    }

    return 0;
}
    

private function totalExpenses(){
    $totalExpense = 0;
    $totalGroups = Group::count();

    if ($totalGroups > 0) {
        $groups = Group::all();

        foreach ($groups as $group) {
            $totalExpenseForGroup = $group->expenses()->sum('amount');
            $totalExpense += $totalExpenseForGroup;
        }

       
        return $totalExpense;
    }

    return 0;
}


}
