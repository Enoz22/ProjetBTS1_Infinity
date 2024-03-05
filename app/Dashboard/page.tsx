"use client";

import TabUsers from "./User/TabUsers";
import NewUser from "./User/NewUser";
import NewVendeur from "./Vendeur/NewVendeur";
import TabVendeur from "./Vendeur/TabVendeur";
import TabCar from "./Cars/TabCar";
import NewCar from "./Cars/NewCar";
import { useEffect, useState } from "react";
import type { User } from "@prisma/client";
import type { Car } from "@prisma/client";
import { useRouter } from 'next/navigation'
import {  signOut } from "next-auth/react";

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [cars, setCars] = useState<Car[]>([]);
    const [chargementOk, setChargementOk] = useState(false);
    const router = useRouter();

    async function chargement() {
        const reponse = await fetch("/api/user", {
          method: "GET",
        });
        const data = await reponse.json();
        setUsers(data);
    }

    useEffect(() => {
        chargement();
        setChargementOk(true);
    }, []);

    function nouveauClient(user: User) {
        setUsers([...users, user]);
    }

    function nouveauVendeur(user: User) {
        setUsers([...users, user]);
    }

    function nouveauCar(car: Car) {
        setCars([...cars, car]);
    }

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
                                <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-52">
                            <li><a onClick={() => signOut()}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <h1 className="m-10">Clients</h1>
            <div className="mx-20">
                {chargementOk ? (
                    <TabUsers users={users} />
                ) : (
                    <div className="skeleton w-150 h-32"></div>
                )}
            </div>
            <h1 className="m-10">Vendeurs</h1>
            <div className="mx-20">
                {chargementOk ? (
                    <TabVendeur users={users} />
                ) : (
                    <div className="skeleton w-150 h-32"></div>
                )}
            </div>
            <h1 className="m-10">Vehicules</h1>
            <div className="mx-20">
                {chargementOk ? (
                    <TabCar cars={cars} />
                ) : (
                    <div className="skeleton w-150 h-32"></div>
                )}
            </div>
            <div className="flex space-x-4 mx-20 my-10">
                <NewUser newUser={nouveauClient} />
                <NewVendeur newUser={nouveauVendeur} />
                <NewCar newCar={nouveauCar} />
            </div>
        </>
    );
}