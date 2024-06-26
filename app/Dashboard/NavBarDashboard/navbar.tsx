"use client";

import {  signOut } from "next-auth/react";
import Link from 'next/link';

export default function NavBarDashboard() {
    return(
        <>
            <div className="navbar bg-base-200">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">Infinity</a>
                </div>
                <div className="flex-none gap-2">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src="https://img.icons8.com/sf-black/64/FFFFFF/menu.png" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-52">
                        <li>
                            <Link href="../Dashboard">Dashboard</Link>
                        </li>  
                        <li>
                            <Link href="../Dashboard/Cars">Gestion voiture</Link>
                        </li>
                        <li>
                            <Link href="../Dashboard/User">Gestion client</Link>
                        </li>
                        <li>
                            <Link href="../Dashboard/UserCar">Gestion location</Link>
                        </li>
                        <li>
                            <Link href="../Dashboard/Admin">Administrateur</Link>
                        </li>
                            <li><a onClick={() => signOut()}>Déconnexion</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}