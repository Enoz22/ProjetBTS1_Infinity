"use client";

import NavBarDashboard from "../NavBarDashboard/navbar";
import TabCar from "./TabCar";
import NewCar from "./NewCar";
import { useEffect, useState } from "react";
import type { Car } from "@prisma/client";
import { useRouter } from 'next/navigation'

export default function Users() {
    const [cars, setCars] = useState<Car[]>([]);
    const [chargementOk, setChargementOk] = useState(false);
    const router = useRouter();

    async function chargement() {
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

    function nouveauCar(car: Car) {
        setCars([...cars, car]);
    }

    return(
        <>
            <NavBarDashboard/>
            <h1 className="m-10">Vehicules</h1>
            <div className="mx-20">
                {chargementOk ? (
                    <TabCar cars={cars} />
                ) : (
                    <div className="skeleton w-150 h-32"></div>
                )}
            </div>
            <div className="flex space-x-4 mx-20 my-10">
                <NewCar newCar={nouveauCar} />
            </div>
        </>
    );
}