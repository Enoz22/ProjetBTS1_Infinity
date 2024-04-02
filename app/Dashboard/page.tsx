"use client";

import NavBarDashboard from "./NavBarDashboard/navbar";
import TabUsers from "./User/Client/TabUsers";
import NewUser from "./User/Client/NewUser";
import TabCar from "./Cars/TabCar";
import NewCar from "./Cars/NewCar";
import { useEffect, useState } from "react";
import type { User } from "@prisma/client";
import type { Car } from "@prisma/client";
import { useRouter } from 'next/navigation'

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [cars, setCars] = useState<Car[]>([]);
    const [chargementOk, setChargementOk] = useState(false);
    const router = useRouter();

    async function chargement() {
        const reponseUser = await fetch("/api/user", {
          method: "GET",
        });
        const dataUser = await reponseUser.json();
        setUsers(dataUser);
        const reponseCar = await fetch("/api/cars", {
            method: "GET",
        });
        const dataCar = await reponseCar.json();
        setCars(dataCar);
    }

    useEffect(() => {
        chargement();
        setChargementOk(true);
    }, []);

    function nouveauClient(user: User) {
        setUsers([...users, user]);
    }

    function nouveauCar(car: Car) {
        setCars([...cars, car]);
    }

    return(
        <>
            <NavBarDashboard/>
            <h1 className="m-10">Clients</h1>
            <div className="mx-20">
                {chargementOk ? (
                    <TabUsers users={users} />
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
                <NewCar newCar={nouveauCar} />
            </div>
        </>
    );
}