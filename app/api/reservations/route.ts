import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      await getReservations(req, res);
      break;
    case 'POST':
      await createReservation(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function getReservations(req: NextApiRequest, res: NextApiResponse) {
  const reservations = await prisma.reservation.findMany({
    include: {
      user: true,
      car: true,
    },
  });
  res.status(200).json(reservations);
}

async function createReservation(req: NextApiRequest, res: NextApiResponse) {
  const { userId, carId, dateDebut, dateFin, prixTotal, statutReservation } = req.body;
  
  try {
    const reservation = await prisma.reservation.create({
      data: {
        userId,
        carId,
        dateDebut: new Date(dateDebut),
        dateFin: new Date(dateFin),
        prixTotal,
        statutReservation,
      },
    });

    await prisma.car.update({
      where: { id: carId },
      data: { statutDisponibilite: 'Indisponible' },
    });

    res.status(200).json(reservation);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création de la réservation", error });
  }
}
