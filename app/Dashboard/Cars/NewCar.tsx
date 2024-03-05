"use client";

import { PrismaClient } from "@prisma/client";
import type { Car } from "@prisma/client";
import { useState, useEffect } from "react";

import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType);

const prisma = new PrismaClient();

export default function NewCar(props: { newCar: Function }) {
  const [cars, setCars] = useState([]);
  const [displayToast, setDisplayToast] = useState(false);
  const [messageToast, setMessageToast] = useState("");
  const [carImages, setCarImages] = useState<any[]>([]);


  useEffect(() => {
    async function fetchCars() {
      const response = await fetch('/api/cars');
      const data = await response.json();
      setCars(data);
    }
    fetchCars();
  }, []);

  async function addCar(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  
    const formData = new FormData(event.currentTarget);
    const carData = {
      marque: formData.get("marque"),
      modele: formData.get("modele"),
      annee: parseInt(formData.get("annee")?.toString() || "0"),
      prixLocationParJour: parseFloat(formData.get("prixLocationParJour")?.toString() || "0"),
      description: formData.get("description"),
      statutDisponibilite: formData.get("statutDisponibilite"),
      cheminImage: formData.get("carImages"),
    };

    const carResponse = await fetch("/api/cars", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(carData),
    });
  
    if (carResponse.status === 200) {
      const car: Car = await carResponse.json();
      props.newCar(car);
      setMessageToast("Nouveau véhivule ajouté");
      setDisplayToast(true);
      setTimeout(() => {
        setDisplayToast(false);
      }, 2000);
    }
    else {
      setMessageToast("Erreur lors de l'ajout du véhicule");
      setDisplayToast(true);
      setTimeout(() => {
        setDisplayToast(false);
      }, 2000);
    }
  }

  return (
    <>
      <form className="m-20" onSubmit={addCar}>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Marque du vehicule :</span>
          </div>
          <input
            required
            name="marque"
            type="text"
            placeholder="..."
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Modele du vehicule :</span>
          </div>
          <input
            required
            name="modele"
            type="text"
            placeholder="..."
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Année du vehivule :</span>
          </div>
          <input
            required
            name="annee"
            type="text"
            placeholder="..."
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Prix jour :</span>
          </div>
          <input
            required
            name="prixLocationParJour"
            type="number"
            step="0.01"
            placeholder="..."
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Description :</span>
          </div>
          <textarea
            required
            name="description"
            placeholder="..."
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Status :</span>
          </div>
          <select
            required
            name="statutDisponibilite"
            className="select select-bordered w-full max-w-xs"
          >
            <option value="">Sélectionnez un status</option>
            <option value="Disponible">Disponible</option>
            <option value="Indisponible">Indisponible</option>
          </select>
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Image :</span>
          </div>
          <FilePond
            files={carImages}
            allowMultiple={true}
            onupdatefiles={setCarImages}
            acceptedFileTypes={['image/*']}
            name="carImages"
            labelIdle='Glissez-déposez vos images ici ou <span class="filepond--label-action">Parcourir</span>'
            credits={false}
          />
        </label>
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
