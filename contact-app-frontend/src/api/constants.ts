const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const CONTACTS_API = {
  GET_ALL: `${API_BASE_URL}/api/contacts/getcontacts`,
  CREATE: `${API_BASE_URL}/api/contacts/CreateContact`,
};
