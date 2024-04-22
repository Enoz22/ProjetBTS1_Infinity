// Fichier: /api/reservations/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        const reservations = await prisma.reservation.findMany({
            include: {
                user: true,
                car: true
            }
        });
        res.status(200).json(reservations);
    } catch (error) {
        console.error("Erreur lors de la récupération des réservations:", error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { userId, carId, dateDebut, dateFin, statutReservation, prixTotal } = req.body;
        const newReservation = await prisma.reservation.create({
            data: {
                userId: parseInt(userId),
                carId: parseInt(carId),
                dateDebut: new Date(dateDebut),
                dateFin: new Date(dateFin),
                statutReservation,
                prixTotal: parseFloat(prixTotal),
            },
        });
        res.status(201).json(newReservation);
    } catch (error) {
        console.error("Erreur lors de la création de la réservation", error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
}
