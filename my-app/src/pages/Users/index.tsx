import React, { useEffect, useState } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import Axios from "axios";
import "./style.scss";

export default function Users() {
  const [users, setUsers]: [
    { name: string; gender: string; _id: string }[],
    any
  ] = useState([]);

  const [currentUser, setCurrentUser]: [
    {
      name: string;
      gender: string;
      _id: string;
    },
    any
  ] = useState({ name: "", gender: "", _id: "" });

  useEffect(() => {
    try {
      Axios.get("http://localhost:3000/user").then((response) => {
        if (response.status === 200) {
          setUsers(response.data.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onUpdateOrCreate = () => {
    if (currentUser?._id) {
      Axios.put(
        `http://localhost:3000/user/${currentUser._id}`,
        currentUser
      ).then((response) => {
        if (response.status === 200) {
          setUsers((users: any) => {
            return users.map((user: any) => {
              if (user._id === response.data.data._id)
                return response.data.data;
              return user;
            });
          });
        }
      });
    } else {
      Axios.post(`http://localhost:3000/user/`, currentUser).then(
        (response) => {
          if (response.status === 200) {
            setUsers((users: any) => {
              return [...users, response.data.data];
            });
          }
        }
      );
    }
    setCurrentUser({ name: "", gender: "", _id: "" });
  };
  const deleteUser = (id: string) => {
    try {
      Axios.delete(`http://localhost:3000/user/${id}`).then((response) => {
        if (response.status === 200) {
          setUsers((users: any) => {
            return users.filter((user: any) => user._id !== id);
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
    setCurrentUser({ name: "", gender: "", _id: "" });
  };
  return (
    <div className="user-page">
      <UserForm
        user={currentUser}
        setCurrentUser={setCurrentUser}
        onUpdateOrCreate={onUpdateOrCreate}
      />
      <UserList
        users={users}
        setCurrentUser={setCurrentUser}
        deleteUser={deleteUser}
      />
    </div>
  );
}
