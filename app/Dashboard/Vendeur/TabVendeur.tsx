import { PrismaClient } from "@prisma/client";
import RowVendeur from "./RowVendeur";
import type { User } from "@prisma/client";
 
const prisma = new PrismaClient();

export default function TabUsers(props: {users:User[]}) {

  const filteredUsers = props.users.filter((user) => user.role === 'vendeur');
  
  return (
    <div className="overflow-x-auto">
      <table className="table text-primary">
        {/* head */}
        <thead className="text-accent">
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Email</th>
            <th>Telephone</th>
          </tr>
        </thead>
        <tbody>
          {/* avec typage : clients.map((c:Client)=>...) */}
          {filteredUsers.map((user) => (
            <RowVendeur key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
}