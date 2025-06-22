import { getSettings } from "../services/settingService";

export const fetchSettings = async () => {

    try {
        const data = await getSettings();        
        let tbody = document.querySelector('.settings-table tbody');
        tbody.innerHTML = '';
        
        data.forEach(setting => {
            let settingElement = document.createElement('tr');
            settingElement.setAttribute('data-id', setting.id);
            let inputField = '';
            if (setting.type === 'text') {
                inputField = `<input type="text" value="${setting.value}" class="setting-input input u-w-100" />`;
            }

            settingElement.innerHTML = `
                <td class="u-fw-bold u-text-a-center" style="min-width: 40px;">${setting.id}</td>
                <td class="u-fw-bold">${setting.key}</td>
                <td>${inputField}</td>
                <td>${setting.type}</td>
                <td style="white-space: nowrap;width: 1px;" class="u-p-i-center">
                    <div class="lt-stack u-gap-2">
                        <button class="btn btn-variant-back-office save-btn" data-id="${setting.id}">Save</button>
                        <button class="btn btn-variant-back-office delete-btn" data-id="${setting.id}">Delete</button>
                    </div>
                </td>
            `;

            tbody.appendChild(settingElement);
        });

        // order keys by name 
        const tbodyRows = document.querySelectorAll('.settings-table tbody tr');
        const sortedRows = [...tbodyRows].sort((a, b) => {
            const keyA = a.querySelector('td:nth-child(2)').textContent;
            const keyB = b.querySelector('td:nth-child(2)').textContent;
            return keyA.localeCompare(keyB);
        });
        sortedRows.forEach(row => tbody.appendChild(row));
    } catch (error) {
        console.error('Error fetching settings:', error);
    }
};
