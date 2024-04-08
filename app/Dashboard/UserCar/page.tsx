"use client";

import React, { useState, useEffect } from "react";

interface Car {
    id: number;
    marque: string;
    modele: string;
    statutDisponibilite: string;
}
  
interface Reservation {
    id: number;
    car: Car;
    dateDebut: string;
    dateFin: string;
}
  

const ReservationsPage = () => {

    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [cars, setCars] = useState<Car[]>([]);
    const [selectedCarId, setSelectedCarId] = useState("");
    const [userId, setUserId] = useState("");
    const [dateDebut, setDateDebut] = useState("");
    const [dateFin, setDateFin] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchReservations();
        fetchCars();
    }, []);

    async function fetchReservations() {
        setIsLoading(true);
        const response = await fetch("/api/reservations");
        const data = await response.json();
        setReservations(data);
        setIsLoading(false);
    }

    async function fetchCars() {
        const response = await fetch("/api/cars");
        const data = await response.json();
        setCars(data.filter((car: Car) => car.statutDisponibilite === "Disponible"));
    }

    async function handleReservationSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const reservation = {
        userId,
        carId: selectedCarId,
        dateDebut,
        dateFin,
        statutReservation: "Réservé",
        };

        const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservation),
        });

        if (response.ok) {
        fetchReservations();
        fetchCars();
        }
    }

    if (isLoading) return <p>Chargement...</p>;

    return (
        <div>
        <h1>Réservations</h1>
        <form onSubmit={handleReservationSubmit}>
            <select value={selectedCarId} onChange={(e) => setSelectedCarId(e.target.value)}>
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
            {reservation.car.marque} {reservation.car.modele} - {reservation.dateDebut} à {reservation.dateFin}
            </div>
        ))}
        </div>
    );
};

export default ReservationsPage;
