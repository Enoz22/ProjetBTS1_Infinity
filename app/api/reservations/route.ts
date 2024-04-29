import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request, res: any) {
    try {
        const body = await req.json();
        const newReservation = await prisma.reservation.create({
            data: 
            {
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
        return new Response(JSON.stringify(newReservation), {
            status:201,
            headers: { "content-type": "application/json" },
        });
    } catch (error) {
        console.error("Erreur lors de la création de la réservation", error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
}
