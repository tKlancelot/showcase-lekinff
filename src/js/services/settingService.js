// src/js/services/settingService.js

import { apiUrl } from "../config";
import { getToken } from "../utils/userUtils";

const headersWithAuth = () => ({
  'Authorization': `Bearer ${getToken()}`
});

export async function getSettings() {
  const response = await fetch(`${apiUrl}/api/pagesettings`, {
    headers: headersWithAuth()
  });
  if (!response.ok) {
    throw new Error("Failed to fetch settings");
  }
  return await response.json();
}


export async function createSetting(formData) {
  const response = await fetch(`${apiUrl}/api/pagesettings`, {
    method: 'POST',
    headers: {
      ...headersWithAuth()
    },
    body: formData
  });

  if (response.status === 401) {
    throw new Error('401');
  }

  if (!response.ok) {
    throw new Error('Failed to create setting');
  }

  return await response.json();
}

export async function deleteSetting(userId) {
  try {
    const response = await fetch(`${apiUrl}/api/pagesettings/${userId}`, {
      method: 'DELETE',
      headers: headersWithAuth()
    });
    if (!response.ok) throw new Error('Erreur lors de la suppression');
    return true;
  } catch (error) {
    console.error('deleteUser error:', error);
    throw error;
  }
}

export async function updateSetting(userId, formData) {
  try {
    const response = await fetch(`${apiUrl}/api/pagesettings/${userId}`, {
      method: 'PUT',
      headers: {
        ...headersWithAuth()
      },
      body: formData
    });
    if (!response.ok) throw new Error('Erreur lors de la mise à jour');
    return true;
  } catch (error) {
    console.error('updateSetting error:', error);
    throw error;
  }
}