"use client";

import NavBarDashboard from "../NavBarDashboard/navbar";
import React, { useState, useEffect } from "react";
import TabReservation from "./TabReservation";
import { Reservation } from "@prisma/client";
import { useRouter } from 'next/navigation'

interface Car {
    id: number;
    marque: string;
    modele: string;
    statutDisponibilite: string;
}

interface Client {
    id: number;
    nom: string;
    prenom: string;
}

const ReservationsPage = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [cars, setCars] = useState<Car[]>([]);
    const [clients, setClients] = useState<Client[]>([]);
    const [selectedCarId, setSelectedCarId] = useState("");
    const [selectedClientId, setSelectedClientId] = useState("");
    const [dateDebut, setDateDebut] = useState("");
    const [prixTotal, setPrixTotal] = useState("");
    const [dateFin, setDateFin] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [chargementOk, setChargementOk] = useState(false);
    const router = useRouter();

    async function chargement() {
        const reponseReservation = await fetch("/api/reservations/getReservations", {
            method: "GET",
        });
        const dataReservation = await reponseReservation.json();
        setReservations(dataReservation);
    }

    useEffect(() => {
        fetchReservations();
        fetchCars();
        fetchClients();
        chargement();
        setChargementOk(true);
    }, []);

    interface Client {
        id: number;
        nom: string;
        prenom: string;
        role: string; // Add the 'role' property
    }

    async function fetchClients() {
        try {
            const response = await fetch("/api/user");
            const data = await response.json();
            const clientsWithRoleClient = data.filter((client: Client) => client.role === "client");
            setClients(clientsWithRoleClient);
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    }

    async function fetchCars() {
        try {
            const response = await fetch("/api/cars");
            const data = await response.json();
            setCars(data.filter((car: Car) => car.statutDisponibilite === "disponible"));
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    }

    async function fetchReservations() {
        setIsLoading(true);
        try {
            const response = await fetch("/api/reservations");
            const data = await response.json();
            setReservations(data);
        } catch (error) {
            console.error('Error fetching reservations:', error);
        } finally {
            setIsLoading(false);
        }
    }


    async function handleReservationSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!selectedCarId || !selectedClientId || !dateDebut || !dateFin || !prixTotal) {
            return;
        }
        const reservation = {
            userId: selectedClientId,
            carId: selectedCarId,
            dateDebut,
            dateFin,
            prixTotal,
            statutReservation: "Réservé",
        };
    
        try {
            const response = await fetch("/api/reservations", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservation),
            });
    
            if (response.ok) {
                const updateCarResponse = await fetch(`/api/cars/${selectedCarId}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: selectedCarId }),
                });
    
                if (updateCarResponse.ok) {
                    await fetchReservations();
                    await fetchCars();
                    await chargement();
                } else {
                    throw new Error('Failed to update car status');
                }
            } else {
                const errorText = await response.text();
                throw new Error(`Failed to post reservation: ${response.status} ${errorText}`);
            }
        } catch (error) {
            console.error("Failed to post reservation:", error);
        }
    }

    if (isLoading) return <p>Chargement...</p>;

    return (
        <div>
            <NavBarDashboard />
            <h2 className="text-2xl font-bold text-center mb-8">Réservations</h2>

            <div className="mb-8">
                {chargementOk ? (
                    <TabReservation reservations={reservations} />
                ) : (
                    <div className="skeleton w-full h-32"></div>
                )}
            </div>
            <form onSubmit={handleReservationSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 container mx-auto my-10">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="client">
                        Sélectionner le client :
                    </label>
                    <select
                        id="client"
                        className="shadow border rounded w-full py-2 px-3 text-gray-100"
                        value={selectedClientId}
                        onChange={(e) => setSelectedClientId(e.target.value)}
                    >
                        <option value="">...</option>
                        {clients.map((client) => (
                            <option key={client.id} value={client.id}>
                                {client.nom} {client.prenom}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="car">
                        Sélectionner la voiture :
                    </label>
                    <select
                        id="car"
                        className="shadow border rounded w-full py-2 px-3 text-gray-100"
                        value={selectedCarId}
                        onChange={(e) => setSelectedCarId(e.target.value)}
                    >
                        <option value="">...</option>
                        {cars.map((car) => (
                            <option key={car.id} value={car.id}>
                                {car.marque} {car.modele}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateDebut">
                        Date de début :
                    </label>
                    <input
                        type="date"
                        id="dateDebut"
                        className="shadow border rounded w-full py-2 px-3 text-gray-100 leading-tight"
                        value={dateDebut}
                        onChange={(e) => setDateDebut(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateFin">
                        Date de fin :
                    </label>
                    <input
                        type="date"
                        id="dateFin"
                        className="shadow border rounded w-full py-2 px-3 text-gray-100 leading-tight"
                        value={dateFin}
                        onChange={(e) => setDateFin(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prixTotal">
                        Prix total :
                    </label>
                    <input
                        type="number"
                        id="prixTotal"
                        className="shadow border rounded w-full py-2 px-3 text-gray-100 leading-tight"
                        value={prixTotal}
                        onChange={(e) => setPrixTotal(e.target.value)}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Réserver
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReservationsPage;
