import { deleteSetting } from "../services/settingService";

export const removeSetting = () => {

  document.addEventListener('click', async (event) => {
    if (event.target && event.target.classList.contains('delete-btn')) {
      const settingId = event.target.closest('tr').getAttribute('data-id');

      if (!confirm('Confirmer la suppression du paramètre ?')) return;

      try {
        await deleteSetting(settingId);
        alert('Paramètre supprimé');
        window.location.reload();
      } catch (error) {
        console.error('Erreur réseau:', error);
      }
    }
  });
};