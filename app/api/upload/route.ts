import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, Fields, Files } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Utilisez "POST" en majuscules pour l'exportation
export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new IncomingForm();
  (form as any).uploadDir = "./public/uploads";
  (form as any).keepExtensions = true;

  form.parse(req, (err: any, fields: Fields, files: Files) => {
    if (err) {
      res.status(500).json({ error: "Erreur lors du parsing du fichier" });
      return;
    }

    const file = Array.isArray(files.image) ? files.image[0] : files.image;
    if (!file) {
      res.status(400).json({ error: "Aucun fichier fourni" });
      return;
    }

    const filename = Date.now() + '-' + file.originalFilename;
    const newPath = path.join((form as any).uploadDir, filename);

    fs.rename(file.filepath, newPath, (err) => {
      if (err) {
        res.status(500).json({ error: "Erreur lors de la sauvegarde du fichier" });
        return;
      }
      res.status(200).json({ path: newPath });
    });
  });
};

export default POST;