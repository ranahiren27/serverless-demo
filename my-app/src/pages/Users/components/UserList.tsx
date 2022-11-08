import React from "react";
import ListComponent from "./ListComponent";

export default function UserList({
  users,
  setCurrentUser,
  deleteUser,
}: {
  users: { name: string; gender: string; _id: string }[];
  setCurrentUser: any;
  deleteUser: any;
}) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <ListComponent
              key={user._id}
              userData={user}
              setCurrentUser={setCurrentUser}
              deleteUser={deleteUser}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
