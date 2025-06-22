// src/js/users/fetchUsers.js

import { ModalService } from "../../serviceModals";
import { getRole } from "../utils/userUtils";
import { getAllUsers } from "../services/userService";

export const fetchUsers = async () => {
  let noAccess = document.getElementById('users-admin-no-access');
  let access = document.getElementById('users-admin-access');

  if (getRole() !== 'super_admin') return;

  noAccess.style.display = 'none';
  access.style.display = 'flex';

  try {
    const users = await getAllUsers();
    const userTable = document.getElementById('user-table');

    users.forEach(user => {
      if (user.role === 'super_admin') return;

      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="u-text-a-center" style="min-width: 40px;width: 40px;">${user.id}</td>
        <td class="u-fw-bold" style="width: 100%;">${user.username}</td>
        <td style="min-width: 160px;">${user.role}</td>
        <td style="min-width: 40px;width: 40px;">
          <div class="lt-avatar">
            <img class="lt-avatar-img" src="${user.mainPicture}" alt="avatar"/>
          </div>
        </td>
        <td style="width:auto;min-width: 160px;" class="u-p-i-center">
          <div class="lt-stack u-gap-2">
            <button class="btn btn-variant-back-office edit-user" data-modal-ref="modal-edit-user" data-user-id="${user.id}">Edit</button>
            <button class="btn btn-variant-back-office delete-user" data-user-id="${user.id}" data-user-username="${user.username}">Delete</button>
          </div>
        </td>
      `;
      userTable.querySelector('tbody').appendChild(row);
    });

    const modalService = new ModalService();
    modalService.initModals();

  } catch (error) {
    console.error("Error fetching users:", error);
    alert("Impossible de charger les utilisateurs.");
  }
};
