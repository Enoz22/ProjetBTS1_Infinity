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

export async function POST(req: Request, res: any) {
    try {
        // const { userId, carId, dateDebut, dateFin, statutReservation, prixTotal } = req.body;
        const body = await req.json();
        console.log(body);
        const newReservation = await prisma.reservation.create({
            data: 
            {
                // userId: parseInt(body.userId),
                // carId: parseInt(carId),
                dateDebut: new Date(body.dateDebut),
                dateFin: new Date(body.dateFin),
                statutReservation: body.statutReservation,
                prixTotal: parseFloat(body.prixTotal),
                user: {
                    connect: { id: parseInt(body.userId) }
                },
                car: {
                    connect: { id: parseInt(body.carId) }
                }
            }
        });
        // res.status(201).json(newReservation);
        console.log(newReservation);
        return new Response(JSON.stringify(newReservation), {
            status:201,
            headers: { "content-type": "application/json" },
          });
    } catch (error) {
        console.error("Erreur lors de la création de la réservation", error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
}
