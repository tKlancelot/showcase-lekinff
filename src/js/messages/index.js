import { deleteMessage } from './deleteMessage.js';
import { fetchMessages } from './fetchMessages.js';

export const initMessages = () => {
  fetchMessages();
  deleteMessage();
};