import { updateSetting } from "../services/settingService";
import { toggleLoader } from "../utils/uiUtils";

export const editSetting = () => {

    // EDIT SETTINGS
    document.addEventListener('click', async (event) => {
        if (event.target && event.target.classList.contains('save-btn')) {
            const settingId = event.target.closest('tr').getAttribute('data-id');
            const textInput = event.target.closest('tr').querySelector('.setting-input');

            let formData = new FormData();
            formData.append('id', settingId);
            if (textInput) {
                const newTextValue = textInput.value;
                formData.append('value', newTextValue);
            }

            try {
                const data = await updateSetting(settingId, formData);
                toggleLoader(true);
                if (data) {
                    alert('Setting mis à jour');
                }

            } catch (error) {
                console.error('Error updating setting:', error);
            } finally {
                toggleLoader(false);
            }

        }
    });
}