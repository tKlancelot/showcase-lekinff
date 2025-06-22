import { deleteUser } from "../services/userService";

export function removeUser() {
  document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-user')) {
      const userId = event.target.getAttribute('data-user-id');
      const username = event.target.getAttribute('data-user-username');

      if (!confirm(`Supprimer ${username} ?`)) return;

      try {
        await deleteUser(userId);
        alert(`Utilisateur ${username} supprimé`);
        window.location.reload();
      } catch {
        alert("Erreur lors de la suppression");
      }
    }
  });
}
