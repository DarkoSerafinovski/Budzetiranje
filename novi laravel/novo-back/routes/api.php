<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\PersonalExpenseController;
use App\Http\Controllers\GroupExpenseController;
use App\Http\Controllers\DebtClaimController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile',[UserController::class,'myProfile']);
    Route::get('/groups',[GroupController::class,'index']);
    Route::get('/groups/{id}',[GroupController::class,'show']);
    Route::post('/groups',[GroupController::class,'store']);
    Route::post('vip/personal-expenses',[PersonalExpenseController::class,'store']);
    Route::get('vip/personal-expenses',[PersonalExpenseController::class,'myPersonalExpenses']);
    Route::post('groups/group-expenses',[GroupExpenseController::class,'store']);
    Route::get('users/my-groups',[UserController::class,'myGroups']);
    Route::get('admin/stats',[UserController::class,'stats']);
    Route::put("groups/group-expenses/{id}/pay",[DebtClaimController::class,'paidDebt']);
    Route::get('users',[UserController::class,'index']);
    Route::get('users/edit',[UserController::class,'allWithoutAdmin']);
    Route::put('users/change-role',[UserController::class,'changeUserRole']);
});
