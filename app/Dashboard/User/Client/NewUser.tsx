"use client";

import { PrismaClient } from "@prisma/client";
import type { User } from "@prisma/client";
import { useState, useEffect } from "react";

const prisma = new PrismaClient();

export default function NewUser(props: { newUser: Function }) {
  const [displayToast, setDisplayToast] = useState(false);
  const [messageToast, setMessageToast] = useState("");

  async function addUser(formData: FormData) {
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        nom: formData.get("nom"),
        prenom: formData.get("prenom"),
        email: formData.get("email"),
        role: "client", 
      }),
    });

    if (response.status === 200) {
      const user: User = await response.json();
      props.newUser(user);
      setMessageToast("Nouveau client ajouté");
      setDisplayToast(true);
      setTimeout(() => {
        setDisplayToast(false);
      }, 2000);
    }
    else {
      setMessageToast("Erreur lors de l'ajout du client");
      setDisplayToast(true);
      setTimeout(() => {
        setDisplayToast(false);
      }, 2000);
    }

  }

  return (
    <>
      <form className="m-20" action={addUser}>
        <label className="form-control w-full max-w-xs"></label>
          <div className="label">
            <span className="label-text">Nom du client :</span>
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
            <span className="label-text">Prenom du client :</span>
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
            <span className="label-text">Email du client :</span>
          </div>
        <input
          required
          name="email"
          type="email"
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
