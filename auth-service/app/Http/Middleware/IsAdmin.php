<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Cek user sudah login DAN levelnya adalah 1 (admin)
        if (auth()->check() && auth()->user()->level == 1) {
            return $next($request); 
        }

        return response()->json(['message' => 'Unauthorized. Admin access required.'], 403);
    }
}