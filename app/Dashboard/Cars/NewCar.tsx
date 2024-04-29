import React, { useState, FormEvent, use } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImagePreview);

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [displayToast, setDisplayToast] = useState(false);
  const [messageToast, setMessageToast] = useState("");
  const [images, setImages] = useState<any[]>([]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      if (images.length > 0) {
        formData.append("images", images[0].file);
      }
      const response = await fetch("/api/cars", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMessageToast("Véhicule ajouté avec succès !");
        setDisplayToast(true);
      } else {
        throw new Error('Échec de l\'ajout du véhicule');
      }
    } catch (error) {
      console.error(error);
      setMessageToast("Erreur lors de l'ajout du véhicule");
      setDisplayToast(true);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <form className="m-20" onSubmit={onSubmit}>
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
            files={images}
            onupdatefiles={setImages}
            allowMultiple={false}
            name="images"
            credits={false}
            labelIdle='Glissez et déposez votre image ou <span class="filepond--label-action"> Parcourir </span>'
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