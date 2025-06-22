import { apiUrl } from "../config";
import { getToken } from "../utils/userUtils";

export const deleteMessage = () => {
    
    let messageTable = document.getElementById('contact-message-table');

    // HANDLE DELETE 
    messageTable.addEventListener('click', async (e) => {
        if (e.target.classList.contains('btn-variant-back-office')) {
            const messageId = e.target.dataset.messageId;
            try {
                const response = await fetch(`${apiUrl}/api/contact/${messageId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${getToken()}`
                    }
                });
                if (response.ok) {
                    alert('Message deleted successfully');
                    window.location.reload();
                } else {
                    alert('Error deleting message');
                }
            } catch (error) {
                console.error('Error deleting message:', error);
                alert('Error deleting message');
            }
        }
    });

}