import { createUser } from "../services/userService";
import { initCustomSelect } from "../utils/initCustomSelect";

export function addUser() {
  const addUserForm = document.getElementById('add-user-form');
  const password = document.getElementById('user-password');
  const confirmPassword = document.getElementById('user-confirm-password');

  // Initialiser le custom select pour le rôle
  initCustomSelect('role', 'hiddenRole');

  // Preview de l'image
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

  // Envoi du formulaire
  addUserForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (password.value !== confirmPassword.value) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    const formData = new FormData();
    formData.append('username', document.getElementById('user-username').value);
    formData.append('password', password.value);
    formData.append('role', document.getElementById('hiddenRole').value);

    const mainPicture = document.getElementById('main-picture').files[0];
    if (mainPicture) {
      formData.append('mainPicture', mainPicture);
    }

    try {
      const data = await createUser(formData);
      alert(`Utilisateur ${data.data.username} créé avec succès !`);
      window.location.href = '/admin';
    } catch (error) {
      alert(error.message || 'Erreur lors de la création de l’utilisateur');
    }
  });
}
