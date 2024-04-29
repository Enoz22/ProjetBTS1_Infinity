import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Exportez une fonction nommée PUT pour la mise à jour
export async function PUT(req: Request, res: any) {
    try {
        const body = await req.json();
        const updatedCar = await prisma.car.update({
            where: { id: parseInt(body.id) },
            data: {
                id: parseInt(body.id),
                statutDisponibilite: "Indisponible"
            }
        });
        return new Response(JSON.stringify(updatedCar), {
            status:201,
            headers: { "content-type": "application/json" },
        });
    } catch (error) {
        console.error("Erreur lors de la création de la réservation", error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
}