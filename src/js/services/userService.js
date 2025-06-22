// src/js/services/userService.js

import { apiUrl } from "../config";
import { getToken } from "../utils/userUtils";

const headersWithAuth = () => ({
  'Authorization': `Bearer ${getToken()}`
});

export async function getAllUsers() {
  const response = await fetch(`${apiUrl}/api/users`, {
    headers: headersWithAuth()
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return await response.json();
}

export async function createUser(formData) {
  try {
    const response = await fetch(`${apiUrl}/api/users`, {
      method: 'POST',
      headers: {
        ...headersWithAuth()
      },
      body: formData
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur lors de la création');
    }
    return await response.json();
  } catch (error) {
    console.error('addUser error:', error);
    throw error;
  }
}

export async function deleteUser(userId) {
  try {
    const response = await fetch(`${apiUrl}/api/users/${userId}`, {
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

export async function updateUser(userId, formData) {
  try {
    const response = await fetch(`${apiUrl}/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        ...headersWithAuth()
      },
      body: formData
    });
    if (!response.ok) throw new Error('Erreur lors de la mise à jour');
    return true;
  } catch (error) {
    console.error('updateUser error:', error);
    throw error;
  }
}

export async function getUserById(userId) {
  try {
    const response = await fetch(`${apiUrl}/api/users/${userId}`, {
      headers: headersWithAuth()
    });
    if (!response.ok) throw new Error('Erreur lors de la recherche');
    return await response.json();
  } catch (error) {
    console.error('getUserById error:', error);
    throw error;
  }
}
