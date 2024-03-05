// import type { Client } from "@prisma/client";


// pour typer : export default function RowClient(props:{client:Client})
export default function RowCar(props:any) {
    return (
        <tr>
            <td>{props.car.id}</td>
            <td>{props.car.marque}</td>
            <td>{props.car.modele}</td>
            <td>{props.car.annee}</td>
            <td>{props.car.prixLocationParJour}</td>
            <td>{props.car.statutDisponibilite}</td>
        </tr>
    );    
}