import { getUserById, updateUser } from "../services/userService";
import { initCustomSelect } from "../utils/initCustomSelect";
import { previewImage } from "../utils/previewImage";
import { toggleLoader } from "../utils/uiUtils";

export const editUser = () => {
    
    // EDIT USER 
    document.addEventListener('click', async (e) => {
        const editBtn = e.target.closest('.edit-user');
        if (!editBtn) return;

        const userId = editBtn.dataset.userId;
        if (!userId) return;

        let customSelectRole = document.getElementById('edit-role');

        try {

            const user = await getUserById(userId);

            // Pré-remplir le formulaire
            document.getElementById('edit-user-id').value = user.id;
            document.getElementById('edit-user-username').value = user.username;
            document.getElementById('hiddenEditRole').value = user.role;

            // dans la modal , afficher comme  selected option du custom select le user.role 
            customSelectRole.querySelector('.custom-select-trigger').dataset.value = user.role;

            const preview = document.getElementById('edit-preview');
            preview.src = user.mainPicture || '';
            preview.style.display = user.mainPicture ? 'block' : 'none';
        } catch (err) {
            console.error(err);
            alert("Impossible de charger les données de l'utilisateur");
        }
    });

    initCustomSelect('edit-role', 'hiddenEditRole');
    previewImage('edit-main-picture', 'edit-preview');

    // SUBMIT EDIT USER FORM 
    document.getElementById('edit-user-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('id', document.getElementById('edit-user-id').value);
        formData.append('username', document.getElementById('edit-user-username').value);
        formData.append('role', document.getElementById('hiddenEditRole').value);
        const mainPicture = document.getElementById('edit-main-picture').files[0];
        if (mainPicture) {
            formData.append('mainPicture', mainPicture);
        }
        
        const userId = formData.get('id');

        try {
            const data = await updateUser(userId, formData);
            if (data) {
                toggleLoader(true);
                alert('Utilisateur mis à jour');
                window.location.reload();
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Une erreur est survenue lors de la mise à jour');
        } finally {
            toggleLoader(false);
        }
    });


};