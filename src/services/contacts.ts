import { IContactsData, IFormData, IFormServer } from '@/interfaces';

export async function createContact(data: IFormServer) {
  await fetch('http://localhost:3001/contacts', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

}

export async function deleteContact(idContact: number) {
  await fetch(`http://localhost:3001/contacts/${idContact}`, {
    method: 'DELETE',
  });

}

export async function getContactList() {
  try {
    const response = await fetch('http://localhost:3001/contacts');
    const contactList: IFormServer[] = await response.json();
    contactList.sort((contactA, contactB) => contactA.name.localeCompare(contactB.name));

    return contactList;
  } catch (error) {
    console.error(error)
  }
}

export async function editContact(data: IFormServer, idContact: number) {
  await fetch(`http://localhost:3001/contacts/${idContact}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}