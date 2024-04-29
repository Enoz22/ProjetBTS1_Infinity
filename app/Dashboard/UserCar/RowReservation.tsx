export default function RowReservation(props: any) {
    const { user, car, id, dateDebut, dateFin, prixTotal, statutReservation } = props.reservation;

    return (
        <tr>
            <td>{id}</td>
            <td>{`${user.nom} ${user.prenom}`}</td>
            <td>{`${car.marque} ${car.modele}`}</td>
            <td>{new Date(dateDebut).toLocaleDateString()}</td>
            <td>{new Date(dateFin).toLocaleDateString()}</td>
            <td>{prixTotal.toFixed(2)}€</td>
            <td>{statutReservation}</td>
        </tr>
    );    
}
