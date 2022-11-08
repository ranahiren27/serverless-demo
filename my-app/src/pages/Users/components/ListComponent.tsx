import React from "react";

export default function ListComponent({
  userData,
  setCurrentUser,
  deleteUser,
}: {
  userData: { name: string; gender: string; _id: string };
  setCurrentUser: (user: any) => void;
  deleteUser: (_id: any) => void;
}) {
  return (
    <tr>
      <td>{userData.name}</td>
      <td>{userData.gender}</td>
      <td>
        <button onClick={() => setCurrentUser(userData)}>Update</button>
      </td>
      <td>
        <button onClick={() => deleteUser(userData._id)}>Delete</button>
      </td>
    </tr>
  );
}
