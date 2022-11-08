import React from "react";
import "../style.scss";

export default function UserForm({
  user,
  setCurrentUser,
  onUpdateOrCreate,
}: {
  user?: { name: string; gender: string; _id?: string };
  setCurrentUser: any;
  onUpdateOrCreate: any;
}) {
  return (
    <div className="user-form">
      <form>
        <input
          value={user?.name}
          type={"text"}
          required
          placeholder="Enter your name"
          onChange={(e) => {
            setCurrentUser((currentUser: any) => {
              return {
                ...currentUser,
                name: e.target.value,
              };
            });
          }}
        />
        <div>
          male:{" "}
          <input
            checked={user?.gender === "male"}
            type={"radio"}
            name="gender"
            onChange={(e) => {
              setCurrentUser((currentUser: any) => {
                return {
                  ...currentUser,
                  gender: "male",
                };
              });
            }}
          />
          female:{" "}
          <input
            checked={user?.gender === "female"}
            type={"radio"}
            name="gender"
            onChange={(e) => {
              setCurrentUser((currentUser: any) => {
                return {
                  ...currentUser,
                  gender: "female",
                };
              });
            }}
          />
          others:{" "}
          <input
            checked={user?.gender === "other"}
            type={"radio"}
            name="gender"
            onChange={(e) => {
              setCurrentUser((currentUser: any) => {
                return {
                  ...currentUser,
                  gender: "other",
                };
              });
            }}
          />
        </div>
        <input type="button" value="Submit" onClick={onUpdateOrCreate} />
      </form>
    </div>
  );
}
