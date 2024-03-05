// Import necessary modules
import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";


export async function POST(req: any)  {
  console.log("Request received",req);
  
  const formData = await req.formData();

  console.log(formData.get("nomFichier"));
  // le formData.get("nomFichier") me donne le contenu de l'input texte


  const images = formData.getAll("images");

  const name = images[1].name;
  
  console.log(name);

  // Convert the file data to a Buffer
  const buffer = Buffer.from(await images[1].arrayBuffer());

  const filename = name.replaceAll(" ", "_");
  console.log(filename);

  try {
   await writeFile(
      path.join(process.cwd(), "public/tmp/" + filename),
      buffer
    );

    return NextResponse.json({ Message: "Success", status: 201 });
  } catch (error) {
    console.log("Error occurred ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};