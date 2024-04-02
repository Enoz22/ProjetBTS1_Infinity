"use client";

import NavBarDashboard from "../NavBarDashboard/navbar";
import TabUsers from "./Client/TabUsers";
import NewUser from "./Client/NewUser";
import { useEffect, useState } from "react";
import type { User } from "@prisma/client";
import { useRouter } from 'next/navigation'

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [chargementOk, setChargementOk] = useState(false);
    const router = useRouter();

    async function chargement() {
        const reponseUser = await fetch("/api/user", {
          method: "GET",
        });
        const dataUser = await reponseUser.json();
        setUsers(dataUser);
    }

    useEffect(() => {
        chargement();
        setChargementOk(true);
    }, []);

    function nouveauClient(user: User) {
        setUsers([...users, user]);
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
            <div className="flex space-x-4 mx-20 my-10">
                <NewUser newUser={nouveauClient} />
            </div>
        </>
    );
}