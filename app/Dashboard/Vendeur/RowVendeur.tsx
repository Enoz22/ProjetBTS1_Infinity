// import type { Client } from "@prisma/client";


// pour typer : export default function RowClient(props:{client:Client})
export default function RowUser(props:any) {
    return (
        <tr>
            <td>{props.user.id}</td>
            <td>{props.user.nom}</td>
            <td>{props.user.prenom}</td>
            <td>{props.user.email}</td>
            <td>{props.user.telephone}</td>
        </tr>
    );    
}