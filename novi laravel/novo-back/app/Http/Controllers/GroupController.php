<?php

namespace App\Http\Controllers;



use App\Models\Group;
use App\Http\Resources\GroupResource;
use Illuminate\Http\Request;

class GroupController extends Controller
{
    public function index(Request $request)
    {
       
       try {
          
           $groups = Group::paginate(5); 
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
        'description' => 'nullable|string',
        'users' => 'required|array',
        'users.*' => 'exists:users,id',
    ]);

    try {
       
        $group = Group::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
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
