import { apiUrl } from '../js/config.js';
import { getRole, getToken, getUsername } from '../js/userUtils.js';
import Footer from '../parts/footer.js';
import Navbar from '../parts/navbar.js';

export default function Admin() {
  return `
    ${Navbar()}
    <main class="lt-page u-p-8 u-overflow-y-auto">
      <div class="lt-frame u-w-100">
        <h2 class="lt-page-title">Settings</h2>
        <div id="settings" class="lt-frame">
            <div class="settings-loading"><h2>Chargement des paramètres...</h2></div>
            <div class="settings-table">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Key</th>
                            <th style="width: 60%;">Value</th>
                            <th>Type</th>
                            <th class="u-text-a-center">Action</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>   
        </div> 
        <h2 class="lt-page-title">Users</h2>
        <div id="users-admin" class="lt-frame u-w-100">
            <div id="users-admin-no-access">You don't have access to this content</div>
            <div id="users-admin-access" class="lt-frame" style="display: none;">
                <h2>Admin your users</h2>
                <table id="user-table" class="table">
                    <thead>
                        <tr>
                            <th class="u-text-a-center" style="min-width: 40px;">id</th>
                            <th style="min-width: 144px;">username</th>
                            <th>role</th>
                            <th>main picture</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
      </div>
    </main>
    ${Footer()}
  `;
}

export async function AdminController() {
    
    // rediriger le user sur home si pas de token 
    if (!getToken()) {
        window.location.href = '/';
        return;
    }

    // SETTINGS ADMIN 

    const settingsLoading = document.querySelector('.settings-loading');

    try {
        // Récupération des données depuis l'API
        const response = await fetch(`${apiUrl}/api/pagesettings`);
        if (response.ok) {
            const data = await response.json();
            // console.log('data:', data);
            
            // Supprimer le loader
            settingsLoading.style.display = 'none';  // Masquer le loader
            
            // Récupérer le tbody du tableau
            let tbody = document.querySelector('.settings-table tbody');
            
            data.forEach(setting => {
                let settingElement = document.createElement('tr');
                settingElement.setAttribute('data-id', setting.id);

                let inputField;
                if (setting.type === 'text') {
                    inputField = `<input type="text" value="${setting.value}" class="setting-input input u-w-100" />`;
                }

                // Si c'est une image
                if (setting.image) {
                    // Créer un input type file
                    inputField = `
                        <div class="lt-box form-row-upload form-row-upload-small">
                        <input type="file" class="image-input" data-id="${setting.id}" />
                        <img class="u-object-fit-cover" src="${apiUrl}/uploads/${setting.image}" width="100%" height="64" alt="Image de fond" />
                        </div>
                    `;
                }

                settingElement.innerHTML = `
                <td class="u-fw-bold">${setting.id}</td>
                <td class="u-fw-bold">${setting.key}</td>
                <td>${inputField}</td>
                <td>${setting.type}</td>
                <td style="white-space: nowrap;width: 1px;">
                    <div class="lt-stack u-gap-2">
                        <button class="btn btn-variant-back-office save-btn" data-id="${setting.id}">Save</button>
                        <button class="btn btn-variant-back-office delete-btn" data-id="${setting.id}">Delete</button>
                    </div>
                </td>
                `;
                tbody.appendChild(settingElement);
            });
        } else {
            console.error('Error fetching settings:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching settings:', error);
    }

    document.addEventListener('change', (event) => {
        if (event.target && event.target.classList.contains('image-input')) {
            const img = event.target.closest('tr').querySelector('img');
            console.log('inputElement:', img);
            img.src = URL.createObjectURL(event.target.files[0]);
        }
    })

    // Fonction de gestion du clic sur le bouton "Enregistrer"
    document.addEventListener('click', async (event) => {
        // Vérifier si le clic se fait sur un bouton "Enregistrer"
        if (event.target && event.target.classList.contains('save-btn')) {
            const settingId = event.target.closest('tr').getAttribute('data-id');
            const imageInput = event.target.closest('tr').querySelector('.image-input');
            const textInput = event.target.closest('tr').querySelector('.setting-input');

            let formData = new FormData();
            formData.append('id', settingId);

            // Si une image est sélectionnée, ajouter l'image au FormData
            if (imageInput && imageInput.files.length > 0) {
                formData.append('image', imageInput.files[0]);
                // et mettre a jour l'input file 
                imageInput.value = '';

            }

            // Si l'utilisateur modifie une valeur de texte
            if (textInput) {
                const newTextValue = textInput.value;
                formData.append('value', newTextValue);
            }

            try {
                // Envoi de la requête PUT avec le FormData
                const response = await fetch(`${apiUrl}/api/pagesettings/${settingId}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${getToken()}`,
                    },
                    body: formData
                });

                if (response.ok) {
                    console.log('Setting updated successfully');
                    alert('Paramètre mis à jour');
                } else {
                    console.error('Error updating setting:', response.statusText);
                }
            } catch (error) {
                console.error('Error updating setting:', error);
            }
        }
    });

    // delete function 
    document.addEventListener('click', async (event) => {
        if (event.target && event.target.classList.contains('delete-btn')) {
            const settingId = event.target.closest('tr').getAttribute('data-id');
            try {
                const response = await fetch(`${apiUrl}/api/pagesettings/${settingId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${getToken()}`,
                    },
                });
                if (response.ok) {
                    console.log('Setting deleted successfully');
                    alert('Paramètre supprimé');
                    window.location.reload();
                } else {
                    console.error('Error deleting setting:', response.statusText);
                }
            } catch (error) {
                console.error('Error deleting setting:', error);
            }
        }
    });

    // ADD SETTING
    
    const form = document.getElementById('setting-form');
    const typeSelect = document.getElementById('type');  // <custom-select> remplace ici un simple select
    const imageUploadDiv = document.getElementById('image-upload');

    // Remplacer l'écouteur d'événement du select natif par celui du custom-select
    typeSelect.addEventListener('change', function(e) {
        let value = e.target.querySelector('.custom-select-trigger').dataset.value;
        let selectedType = document.getElementById('hiddenType').value;

        selectedType = value; 
        selectedType === 'image' ? imageUploadDiv.style.display = 'block' : imageUploadDiv.style.display = 'none';
    });

    // Gérer l'upload de l'image
    document.getElementById("image-settings").addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const preview = document.getElementById("preview-settings");
                preview.src = e.target.result;
                preview.style.display = "block";
                preview.alt = file.name;
                preview.title = file.name;
            };
            reader.readAsDataURL(file);
        }
    });

    // Soumettre le formulaire avec FormData
    form.addEventListener('submit', async function(event) {
        event.preventDefault();  // Empêche l'envoi normal du formulaire

        const key = document.getElementById('key').value;
        const value = document.getElementById('value').value;
        const type = document.getElementById('hiddenType').value; // Utilise la valeur du champ caché
        const image = document.getElementById('image-settings').files[0];  // Récupérer l'image si elle existe

        // Créer un FormData pour envoyer les données du formulaire (y compris l'image si présente)
        const formData = new FormData();
        formData.append('key', key);
        formData.append('value', value);
        formData.append('type', type);  // Envoie le type depuis le custom-select
        if (image) {
            formData.append('image', image);
        }

        console.log(formData);

        // Envoyer les données au backend
        try {
            const response = await fetch(`${apiUrl}/api/pagesettings`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData
            });

            if (response.ok) {
                alert('Le paramètre a été ajouté avec succès.');
                // Optionnel : Réinitialiser le formulaire après soumission
                form.reset();
                imageUploadDiv.style.display = 'none';  // Cacher l'input image après soumission
                window.location.reload();
            } else {
                console.error('Erreur lors de l\'ajout du paramètre:', response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire:', error);
        }
    });


    // USER ADMIN 

    let noAccess = document.getElementById('users-admin-no-access');
    let access = document.getElementById('users-admin-access');


    if (getToken() && getRole() === 'super_admin') {
        noAccess.style.display = 'none';
        access.style.display = 'flex';

        fetch(`${apiUrl}/api/users`)
            .then(response => response.json())
            .then(users => {
                const userTable = document.getElementById('user-table');
                users.forEach(user => {
                    if(user.role === 'super_admin') return;
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td class="u-text-a-center">${user.id}</td>
                        <td class="u-fw-bold">${user.username}</td>
                        <td>${user.role}</td>
                        <td><div class="lt-avatar"><img class="lt-avatar-img" src="${apiUrl}/uploads/${user.mainPicture}"/></div></td>
                        <td><button class="btn btn-variant-back-office" data-user-id="${user.id}" data-user-username="${user.username}">Delete</button></td>
                    `;
                    userTable.querySelector('tbody').appendChild(row);
                });
            });

    }

    // delete users 
    document.addEventListener('click', async (event) => {
        if (event.target && event.target.classList.contains('btn-variant-back-office')) {
            const userId = event.target.getAttribute('data-user-id');
            const username = event.target.getAttribute('data-user-username');

            // il faut un confirm 
            if (!confirm(`Are you sure you want to delete user ${username}?`)) {
                return;
            }

            try {
                const response = await fetch(`${apiUrl}/api/users/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${getToken()}`,
                    },
                });
                if (response.ok) {
                    console.log(`User ${username} deleted successfully`);
                    alert(`Utilisateur ${username} supprimé`);
                    window.location.reload();
                } else {
                    console.error(`Error deleting user ${username}:`, response.statusText);
                }
            } catch (error) {
                console.error(`Error deleting user ${username}:`, error);
            }
        }
    });

    // add user 
    let addUserForm = document.getElementById('add-user-form');
    let password = document.getElementById('user-password');
    let confirmPassword = document.getElementById('user-confirm-password');
    let roleSelect = document.getElementById('role');

    roleSelect.addEventListener('change', function(e) {
        let value = e.target.querySelector('.custom-select-trigger').dataset.value;
        document.getElementById('hiddenRole').value = value;
    });

    addUserForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('add user', e);
        console.log(password.value, confirmPassword.value);

        // Vérifier si les mots de passe correspondent
        if (password.value !== confirmPassword.value) {
            alert('Les mots de passe ne correspondent pas');
            return;
        }

        // Créer un FormData pour envoyer les données du formulaire, y compris l'image
        const formData = new FormData();

        formData.append('username', document.getElementById('user-username').value);
        formData.append('password', password.value);
        formData.append('role', document.getElementById('hiddenRole').value);

        // Récupérer l'image et l'ajouter au FormData si un fichier est sélectionné
        const mainPicture = document.getElementById('main-picture').files[0];
        if (mainPicture) {
            formData.append('mainPicture', mainPicture);
        }

        try {
            const response = await fetch(`${apiUrl}/api/users`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                },
                body: formData // Utiliser FormData au lieu de JSON
            });

            const data = await response.json();
            
            if (response.ok) {
                alert(`Utilisateur ${data.data.username} créé avec succès !`);
                window.location.href = '/admin';
            } else {
                alert(data.message || 'Erreur lors de la création de l’utilisateur');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Une erreur est survenue.');
        }
    });

    // Gérer l'aperçu de l'image (comme dans add-post.js)
    document.getElementById("main-picture").addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const preview = document.getElementById("preview");
                preview.src = e.target.result;
                preview.style.display = "block";
                preview.alt = file.name;
                preview.title = file.name;
            };
            reader.readAsDataURL(file);
        }
    });


}