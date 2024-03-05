"use client";

import { PrismaClient } from "@prisma/client";
import type { User } from "@prisma/client";
import { useState } from "react";

const prisma = new PrismaClient();

export default function NewUser(props: { newUser: Function }) {
  const [displayToast, setDisplayToast] = useState(false);
  const [messageToast, setMessageToast] = useState("");

  async function addVendeur(formData: FormData) {
    // appel de l'api pour mettre le nouveau client en base
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        nom: formData.get("nom"),
        prenom: formData.get("prenom"),
        email: formData.get("email"),
        telephone: formData.get("telephone"),
        role: "vendeur", 
      }),
    });

    if (response.status === 200) {
      const user: User = await response.json();
      props.newUser(user);
      setMessageToast("Nouveau vendeur ajouté");
      setDisplayToast(true);
      setTimeout(() => {
        setDisplayToast(false);
      }, 2000);
    }
    else {
      setMessageToast("Erreur lors de l'ajout du vendeur");
      setDisplayToast(true);
      setTimeout(() => {
        setDisplayToast(false);
      }, 2000);
    }

  }

  return (
    <>
      <form className="m-20" action={addVendeur}>
        <label className="form-control w-full max-w-xs"></label>
          <div className="label">
            <span className="label-text">Nom du vendeur :</span>
          </div>
        <input
          required
          name="nom"
          type="text"
          placeholder="..."
          className="input input-bordered w-full max-w-xs"
        />
        <label className="form-control w-full max-w-xs"></label>
          <div className="label">
            <span className="label-text">Prenom du vendeur :</span>
          </div>
        <input
          required
          name="prenom"
          type="text"
          placeholder="..."
          className="input input-bordered w-full max-w-xs"
        />
        <label className="form-control w-full max-w-xs"></label>
          <div className="label">
            <span className="label-text">Email du vendeur :</span>
          </div>
        <input
          required
          name="email"
          type="email"
          placeholder="..."
          className="input input-bordered w-full max-w-xs"
        />
        <label className="form-control w-full max-w-xs"></label>
          <div className="label">
            <span className="label-text">Téléphone du vendeur :</span>
          </div>
        <input
          required
          name="telephone"
          type="text"
          placeholder="..."
          className="input input-bordered w-full max-w-xs"
        />
        <div className="label">
          <button type="submit" value="Submit" className="btn">
            Ajouter
          </button>
        </div>
      </form>
      {displayToast && (
        <div className="toast">
          <div className="alert alert-info">
            <span>{messageToast}</span>
          </div>
        </div>
      )}
    </>
  );
}
