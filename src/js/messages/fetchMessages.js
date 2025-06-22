import { apiUrl } from "../config";
import { getToken } from "../utils/userUtils";

export const fetchMessages = async () => {

    // FIND ALL CONTACT MESSAGES 
    let messageNoAccess = document.getElementById('messages-admin-no-access');
    let messageAccess = document.getElementById('messages-admin-access');
    let messageTable = document.getElementById('contact-message-table');

    fetch(`${apiUrl}/api/contact`, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })
    .then(res => res.json())
    .then(messages => {
        if (messages.data.length === 0) {
            messageNoAccess.style.display = 'block';
            messageAccess.style.display = 'none';
        } else {
            messageNoAccess.style.display = 'none';
            messageAccess.style.display = 'block';
            messages.data.forEach(message => {
                let row = document.createElement('tr');
                row.innerHTML = `
                    <td class="u-text-a-center" style="min-width: 40px;width: 40px;">${message.id}</td>
                    <td style="min-width: 240px;" class="u-fw-bold">${message.name}</td>
                    <td style="min-width: 240px;">${message.email}</td>
                    <td>${message.message}</td>
                    <td class="u-p-i-center"><button class="btn btn-variant-back-office" data-message-id="${message.id}">Delete</button></td>
                `;
                messageTable.querySelector('tbody').appendChild(row);
            });
        }
    });

}