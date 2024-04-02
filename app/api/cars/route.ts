// Import necessary modules
import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function POST(req: { formData: () => any; })  {
  const formData = await req.formData();
  
  const newCar = await prisma.car.create({
    data: {
      modele: formData.get("modele").toString(),
      marque: formData.get("marque").toString(),
      annee: parseInt(formData.get("annee").toString()),
      prixLocationParJour: parseInt(formData.get("prixLocationParJour").toString()),
      description: formData.get("description").toString(),
      statutDisponibilite: "disponible",
    },
  });

  const images = formData.getAll("images");

  const name = images[1].name;

  const buffer = Buffer.from(await images[1].arrayBuffer());

  try {
   await writeFile(
      path.join(process.cwd(), "public/tmp/" + newCar.id+".jpg"),
      buffer
    );

    return NextResponse.json({ Message: "Success", status: 201 });
  } catch (error) {
    console.log("Error occurred ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};

export async function GET (req: Request , res: any) {
  const car = await prisma.car.findMany()
  return new Response(JSON.stringify(car), {
      headers: { "Content-Type": "application/json" }
  });
};