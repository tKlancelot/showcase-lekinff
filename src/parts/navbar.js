import { getPageName } from "../js/utils/routerUtils.js";
import { getRole, getToken, getUsername } from "../js/utils/userUtils.js";

export default function Navbar() {

  let page = getPageName(window.location.href);
  let isAdmin = getRole() === 'admin';
  let isSuperAdmin = getRole() === 'super_admin';

  return `
    <nav class="navbar">
      <a href="/" data-link class="u-display-flex">
          <img  class="u-object-fit-cover" style="filter:invert(1)" src="./assets/pictures/logo.png" alt="logo" width="80" height="40">
      </a>
      <ul class="lt-stack u-a-i-center">
        <a href="/" data-link>
          <li>Home</li>
        </a>
        &ensp;|&ensp; 
        <a href="/about" data-link>
          <li>About</li>
        </a>
        &ensp;|&ensp;
        ${getToken() ? `<a href="/admin" data-link><li>Admin</li></a>` : '<li class="u-cursor-pointer" data-modal-ref="modal-login">Login</li>'}
        ${getToken() ? `&ensp;|&ensp;<li id="logout" class="u-cursor-pointer">Logout</li>` : ''}
      </ul> 
    </nav>
    ${(isAdmin || isSuperAdmin) && page === 'admin' ? `
      <nav class="navbar">
        <div>Welcome ${getUsername()}</div>
        <div class="lt-stack">
          <button class="btn btn-outline btn-size-sm btn-color-scheme-primary" data-modal-ref="modal-add-setting">Add setting</button>
          ${isSuperAdmin ? `<button class="btn btn-outline btn-size-sm btn-color-scheme-primary" data-modal-ref="modal-add-user">Add user</button>` : ''}
        </div>
      </nav>
      ` : ''}
  `;
}

// id="page-logotype"