import { addUser } from "./addUser";
import { editUser } from "./editUser";
import { fetchUsers } from "./fetchUsers";
import { removeUser } from "./removeUser";

export const initUsers = () => {
    fetchUsers();
    addUser();
    removeUser();
    editUser();    
};