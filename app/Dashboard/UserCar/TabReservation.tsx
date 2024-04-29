import { PrismaClient } from "@prisma/client";
import RowReservation from "./RowReservation";
import type { Reservation } from "@prisma/client";
 
const prisma = new PrismaClient();

export default function TabReservation(props: {reservations:Reservation[]}) {

  return (
    <div className="overflow-x-auto">
      <table className="table text-primary">
        {/* head */}
        <thead className="text-accent">
          <tr>
            <th>ID</th>
            <th>Nom/Prenom</th>
            <th>Vehicule</th>
            <th>Date de début</th>
            <th>Date de fin</th>
            <th>Prix Total</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {props.reservations.map((reservation) => {
            return <RowReservation key={reservation.id} reservation={reservation} />;
          })}
        </tbody>
      </table>
    </div>
  );
}