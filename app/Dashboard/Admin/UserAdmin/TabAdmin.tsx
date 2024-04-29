import { PrismaClient } from "@prisma/client";
import RowAdmin from "./RowAdmin";
import type { User } from "@prisma/client";
 
const prisma = new PrismaClient();

export default function TabAdmin(props: {admins:User[]}) {

  const filteredAdmins = props.admins.filter((admin) => admin.role === 'admin');
  
  return (
    <div className="overflow-x-auto">
      <table className="table text-primary">
        <thead className="text-accent">
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Email</th>
            <th>Mot de passe</th>
          </tr>
        </thead>
        <tbody>
          {/* avec typage : clients.map((c:Client)=>...) */}
          {filteredAdmins.map((admin) => (
            <RowAdmin key={admin.id} user={admin} />
          ))}
        </tbody>
      </table>
    </div>
  );
}