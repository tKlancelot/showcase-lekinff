import { createSetting } from "../services/settingService";
import { initCustomSelect } from "../utils/initCustomSelect";

export const addSetting = () => {

    const form = document.getElementById('setting-form');
    initCustomSelect('type', 'hiddenType');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('key', document.getElementById('key').value);
        formData.append('value', document.getElementById('value').value);
        formData.append('type', document.getElementById('hiddenType').value);

        try {
            const response = await createSetting(formData);
            alert('Le paramètre a été ajouté avec succès.');
            form.reset();
            window.location.reload();
        } catch (error) {
            if (error.message === '401') {
                alert('Session expirée. Veuillez vous reconnecter.');
                localStorage.removeItem('token');
                window.location.href = '/login.html';
            } else {
                console.error('addSetting error:', error);
                alert('Erreur lors de l’ajout du paramètre. Veuillez réessayer.');
            }
        }
    });
} 