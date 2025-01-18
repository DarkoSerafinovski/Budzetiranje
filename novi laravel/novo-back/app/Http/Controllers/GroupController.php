<?php

namespace App\Http\Controllers;



use App\Models\Group;
use App\Http\Resources\GroupResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GroupController extends Controller
{
    public function index(Request $request)
    {
       
       try {
        $user = Auth::user();
        $groups = $user->groups()->paginate(5);
           return GroupResource::collection($groups);

       } catch (Exception $e) {
          
           return response()->json([
               'message' =>  'Failed to load groups',
               'error' => $e->getMessage()
           ], 500); 
       }
   }


   public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255|unique:groups,name',
        'users' => 'required|array',
        'users.*' => 'exists:users,id',
    ]);

    try {
       
        $group = Group::create([
            'name' => $validated['name'],
        ]);

        
        $group->users()->attach($validated['users']);

        return response()->json([
            'success' => true,
            'message' => 'Group created successfully and users have been added.',
            'data' => $group,
        ], 201);
    } catch (\Exception $e) {
       
        return response()->json([
            'success' => false,
            'message' => 'Failed to create the group. Please try again later.',
            'error' => $e->getMessage(),
        ], 500);
    }
}



public function show($id){
try{

    $group = Group::findOrFail($id);
    if (!$group->users->contains(Auth::user())) {
        return response()->json([
            'error'=> 'Nemate dozvolu za pregled ove grupe'
        ],403);
    }
    $group->expenses = $group->expenses->sortByDesc('date'); // Sortira u opadajućem redosledu
    return new GroupResource($group);

}catch (\Exception $e) {
       
        return response()->json([
            'success' => false,
            'message' => 'Failed to load the group. Please try again later.',
            'error' => $e->getMessage(),
        ], 500);
    }

}


}
