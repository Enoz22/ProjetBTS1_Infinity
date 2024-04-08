import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        const reservations = await prisma.reservation.findMany();
        res.status(200).json(reservations);
    } catch (error) {
        console.error("Erreur lors de la récupération des réservations", error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
}

// Traitement des requêtes POST
export async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { userId, carId, dateDebut, dateFin, statutReservation } = req.body;
        const newReservation = await prisma.reservation.create({
            data: {
                userId,
                carId,
                dateDebut,
                dateFin,
                statutReservation,
                prixTotal: 0, // Provide a default value for prixTotal
                user: { connect: { id: userId } }, // Connect the user by their ID
                car: { connect: { id: carId } }, // Connect the car by its ID
            },
        });
        res.status(201).json(newReservation);
    } catch (error) {
        console.error("Erreur lors de la création de la réservation", error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
}
