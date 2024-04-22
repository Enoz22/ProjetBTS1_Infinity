"use client";

import NavBarDashboard from "../NavBarDashboard/navbar";
import React, { useState, useEffect } from "react";

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

interface Reservation {
    id: number;
    car: Car;
    client: Client;
    dateDebut: string;
    dateFin: string;
}

const ReservationsPage = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [cars, setCars] = useState<Car[]>([]);
    const [clients, setClients] = useState<Client[]>([]);
    const [selectedCarId, setSelectedCarId] = useState("");
    const [selectedClientId, setSelectedClientId] = useState("");
    const [dateDebut, setDateDebut] = useState("");
    const [dateFin, setDateFin] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchReservations();
        fetchCars();
        fetchClients();
    }, []);

    async function fetchClients() {
        try {
            const response = await fetch("/api/user");
            const data = await response.json();
            setClients(data);
        } catch (error) {
            console.error('Error fetching clients:', error);
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

    async function fetchCars() {
        try {
            const response = await fetch("/api/cars");
            const data = await response.json();
            setCars(data.filter((car: Car) => car.statutDisponibilite === "disponible"));
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    }

    async function handleReservationSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!selectedCarId || !selectedClientId || !dateDebut || !dateFin) {
            alert("Please fill in all fields before submitting.");
            return;
        }
        const reservation = {
            userId: selectedClientId,
            carId: selectedCarId,
            dateDebut,
            dateFin,
            statutReservation: "Réservé",
            prixTotal: 100 // Assurez-vous que ce champ est bien calculé ou saisi
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
                await fetchReservations();
                await fetchCars();
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
            <NavBarDashboard/>
            <h1>Réservations</h1>
            <form onSubmit={handleReservationSubmit}>
                <select value={selectedClientId} onChange={(e) => setSelectedClientId(e.target.value)}>
                    <option value="">Select Client</option>
                    {clients.map((client) => (
                        <option key={client.id} value={client.id}>
                            {client.nom} {client.prenom}
                        </option>
                    ))}
                </select>
                <select value={selectedCarId} onChange={(e) => setSelectedCarId(e.target.value)}>
                    <option value="">Select Car</option>
                    {cars.map((car) => (
                        <option key={car.id} value={car.id}>
                            {car.marque} {car.modele}
                        </option>
                    ))}
                </select>
                <input type="date" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} />
                <input type="date" value={dateFin} onChange={(e) => setDateFin(e.target.value)} />
                <button type="submit">Réserver</button>
            </form>
            <h2>Liste des Réservations</h2>
            {reservations.map((reservation) => (
                <div key={reservation.id}>
                    {reservation.car.marque} {reservation.car.modele} - {reservation.dateDebut} à {reservation.dateFin} - {reservation.client.nom} {reservation.client.prenom}
                </div>
            ))}
        </div>
    );
};

export default ReservationsPage;
