import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET (req: Request , res: any) {
    const user = await prisma.user.findMany()
    return new Response(JSON.stringify(user), {
        headers: { "Content-Type": "application/json" }
    });
};

export async function POST(req : Request, res: any) {
    const body = await req.json();
    const user = await prisma.user.create({ data: body });
    return new Response(JSON.stringify(user), {
      headers: { "content-type": "application/json" },
    });
}
