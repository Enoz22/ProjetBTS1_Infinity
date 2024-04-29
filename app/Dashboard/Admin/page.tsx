"use client";

import NavBarDashboard from "../NavBarDashboard/navbar";
import TabAdmin from "./UserAdmin/TabAdmin";
import NewAdmin from "./UserAdmin/NewAdmin";
import { useEffect, useState } from "react";
import type { User } from "@prisma/client";
import { useRouter } from 'next/navigation'

export default function Admins() {
    const [admins, setAdmins] = useState<User[]>([]);
    const [chargementOk, setChargementOk] = useState(false);
    const router = useRouter();

    async function chargement() {
        const reponseAdmin = await fetch("/api/user", {
          method: "GET",
        });
        const dataAdmin = await reponseAdmin.json();
        setAdmins(dataAdmin);
    }

    useEffect(() => {
        chargement();
        setChargementOk(true);
    }, []);

    function nouveauAdmin(admin: User) {
        setAdmins([...admins, admin]);
    }

    return(
        <>
            <NavBarDashboard/>
            <h1 className="m-10">Administrateur</h1>
            <div className="mx-20">
                {chargementOk ? (
                    <TabAdmin admins={admins} />
                ) : (
                    <div className="skeleton w-150 h-32"></div>
                )}
            </div>
            <div className="flex space-x-4 mx-20 my-10">
                <NewAdmin newAdmin={nouveauAdmin} />
            </div>
        </>
    );
}