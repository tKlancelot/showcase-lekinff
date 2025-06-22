import Footer from '../parts/footer.js';
import Navbar from '../parts/navbar.js';
import { apiUrl } from '../js/config.js';
import { getToken } from '../js/utils/userUtils.js';
import { initMessages } from '../js/messages/index.js';
import { initSettings } from '../js/settings/index.js';
import { initUsers } from '../js/users/index.js';

export default function Admin() {
    return `
        ${Navbar()}
        <main class="lt-page u-p-8 u-overflow-y-auto">
        <div class="lt-frame u-w-100">


            <lt-tabs data-id="tabs-1">
                <div class="lt-tab-header">
                    <div class="lt-tab-item">
                        <span>Page Settings</span>
                    </div>
                    <div class="lt-tab-item">
                        <span>Users</span>
                    </div>
                    <div class="lt-tab-item">
                        <span>Contact Messages</span>
                    </div>
                </div>
                <div class="lt-tab-content">
                    <div class="lt-tab-panel">
                        <div id="settings" class="lt-frame">
                            <div class="settings-table">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th class="u-text-a-center" style="min-width: 40px;width: 40px;">Id</th>
                                            <th>Key</th>
                                            <th style="width: 60%;">Value</th>
                                            <th>Type</th>
                                            <th class="u-text-a-center" style="width: 160px;">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>   
                        </div> 
                    </div>
                    <div class="lt-tab-panel">
                        <div id="users-admin" class="lt-frame u-w-100">
                            <div id="users-admin-no-access">You don't have access to this content</div>
                            <div id="users-admin-access" class="lt-frame" style="display: none;">
                                <table id="user-table" class="table">
                                    <thead>
                                        <tr>
                                            <th class="u-text-a-center" style="min-width: 40px;width: 40px;">Id</th>
                                            <th style="width: 160px;">username</th>
                                            <th>role</th>
                                            <th class="u-text-a-center">avatar</th>
                                            <th class="u-text-a-center" style="width: 160px;">action</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="lt-tab-panel">
                        <div id="messages-admin" class="lt-frame u-w-100">
                            <div id="messages-admin-no-access">You don't have access to this content</div>
                            <div id="messages-admin-access" class="lt-frame" style="display: none;">
                                <table id="contact-message-table" class="table">
                                    <thead>
                                        <tr>
                                            <th class="u-text-a-center" style="min-width: 40px;width: 40px;">Id</th>
                                            <th>username</th>
                                            <th>email</th>
                                            <th style="width: 100%;">message</th>
                                            <th class="u-text-a-center" style="width: 160px;">action</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </lt-tabs>
        </div>
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