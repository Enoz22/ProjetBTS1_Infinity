"use client";

import { PrismaClient } from "@prisma/client";
import type { User } from "@prisma/client";
import { useState, useEffect } from "react";

const prisma = new PrismaClient();

export default function NewAdmin(props: { newAdmin: Function }) {
  const [displayToast, setDisplayToast] = useState(false);
  const [messageToast, setMessageToast] = useState("");

  async function addAdmin(formData: FormData) {
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        nom: formData.get("nom"),
        prenom: formData.get("prenom"),
        email: formData.get("email"),
        motDePasse: formData.get("password"),
        role: "admin", 
      }),
    });

    if (response.status === 200) {
      const admin: User = await response.json();
      props.newAdmin(admin);
      setMessageToast("Nouveau admin ajouté");
      setDisplayToast(true);
      setTimeout(() => {
        setDisplayToast(false);
      }, 2000);
    }
    else {
      setMessageToast("Erreur lors de l'ajout de l'admin");
      setDisplayToast(true);
      setTimeout(() => {
        setDisplayToast(false);
      }, 2000);
    }

  }

  return (
    <>
      <form className="m-20" action={addAdmin}>
        <label className="form-control w-full max-w-xs"></label>
          <div className="label">
            <span className="label-text">Nom de l'admin :</span>
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
            <span className="label-text">Prenom de l'admin :</span>
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
            <span className="label-text">Email de l'admin :</span>
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
            <span className="label-text">Mot de passe de l'admin :</span>
          </div>
        <input
          required
          name="password"
          type="password"
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
