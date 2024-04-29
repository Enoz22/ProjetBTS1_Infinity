import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET (req: Request , res: any) {
    const reservation = await prisma.reservation.findMany({
        include: {
            user: {
                select: {
                    nom: true,
                    prenom: true
                }
            },
            car: {
                select: {
                    marque: true,
                    modele: true
                }
            }
        }
    });
    return new Response(JSON.stringify(reservation), {
        headers: { "Content-Type": "application/json" }
    });
};