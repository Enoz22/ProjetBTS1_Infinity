import { PrismaClient } from "@prisma/client";
import RowCar from "./RowCar";
import type { Car } from "@prisma/client";
 
const prisma = new PrismaClient();

export default function TabCar(props: {cars:Car[]}) {
  
  return (
    <div className="overflow-x-auto">
      <table className="table text-primary">
        {/* head */}
        <thead className="text-accent">
          <tr>
            <th>ID</th>
            <th>Marque</th>
            <th>Modele</th>
            <th>Année</th>
            <th>Prix journée</th>
            <th>Status</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {props.cars.map((car) => {
            return <RowCar key={car.id} car={car} />;
          })}
        </tbody>
      </table>
    </div>
  );
}