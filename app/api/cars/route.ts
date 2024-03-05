import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET (req: Request , res: any) {
    const car = await prisma.car.findMany()
    return new Response(JSON.stringify(car), {
        headers: { "Content-Type": "application/json" }
    });
};

export async function POST(req : Request, res: any) {
    const body = await req.json();
    const car = await prisma.car.create({ data: body });
    return new Response(JSON.stringify(car), {
      headers: { "content-type": "application/json" },
    });
}
