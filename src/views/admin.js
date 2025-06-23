import Footer from '../parts/footer.js';
import Navbar from '../parts/navbar.js';
import { getToken } from '../js/utils/userUtils.js';
import { initMessages } from '../js/messages/index.js';
import { initSettings } from '../js/settings/index.js';
import { initUsers } from '../js/users/index.js';
import { loadHtml } from '../js/utils/loadHtml.js';

export default async function Admin() {

    const html = await loadHtml('parts/admin.html');

    return `
        ${Navbar()}
        <main class="lt-page u-p-8 u-overflow-y-auto">
            ${html}
        </main>
        ${Footer()}
    `;
}

export async function AdminController() {
    
    if (!getToken()) {
        window.location.href = '/'; // rediriger le user sur home si pas de token 
        return;
    }

    // SETTINGS ADMIN 
    document.addEventListener('DOMContentLoaded', () => {
        initSettings();
        initUsers();
        initMessages();
    });



}