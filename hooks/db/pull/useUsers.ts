import { useState, useEffect } from "react";
import database from "@/db";
import UserDB from "@/db/models/user.model";
import { User as UserModel } from "@/models/User";

export const transformUserToModel = (userDB: UserDB): UserModel => {
  return {
    id: userDB.id,
    googleUid: userDB.googleUid,
    name: userDB.name,
    email: userDB.email,
    role: userDB.role,
    picture: userDB.picture,
    driverId: userDB.driverId,
  };
};

export const useUserModels = () => {
  const users = useUsers();

  return users.map(transformUserToModel);
};

export const useUsers = () => {
  const [users, setUsers] = useState<UserDB[]>([]);

  useEffect(() => {
    const query = database.get<UserDB>("users").query();

    const subscription = query.observe().subscribe((newUsers: UserDB[]) => {
      setUsers(newUsers);
    });

    return () => subscription.unsubscribe();
  }, []);

  return users;
};
