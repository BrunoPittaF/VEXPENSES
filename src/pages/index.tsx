import Card from '@/components/card';
import ModalExample from '@/components/contactDetails';
import Toastify from '@/components/toastify';
import { Search } from '@/style/home';
import { useEffect, useState } from 'react';

interface IContactsData {
  id?: number;
  name: string;
  lastname?: string;
  enterprise?: string;
  telephone: string;
  email?: string;
  birthday?: string;
  picture?: string;
  telephoneDynamic: {
    telephoneD: string;
  }[];
  enterpriseDynamic: {
    enterpriseD: string;
  }[];
}
export default function Home() {
  const [contacts, setContacts] = useState<IContactsData[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeContact, setActiveContact] = useState<IContactsData | undefined>();
  const [variantModal, setVariantModal] = useState<'create' | 'edit'>('create');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContacts, setFilteredContacts] = useState<IContactsData[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:3001/contacts');
        const contactList = await response.json();
        setContacts(contactList);
        setFilteredContacts(contactList);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  function openModal() {
    setActiveContact(undefined);
    setVariantModal('create');
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function openEditModal(data: IContactsData) {
    setActiveContact(data);
    setVariantModal('edit');
    setModalIsOpen(true);
  }

  function handleSearch(value: string) {
    setSearchTerm(value);
    const filtered = contacts.filter((contact) => contact.name.toLowerCase().includes(value.toLowerCase()));
    console.log(filteredContacts);
    setFilteredContacts(filtered);
  }

  function handleSelectContact(name: string) {
    setSearchTerm(name);
  }

  return (
    <main>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Search
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          type="search"
          placeholder="Pesquise seus contatos"
        />
      </header>

      <Card onClick={openModal} mode="button" name="Criar novo contato" />

      {filteredContacts.length > 0 &&
        filteredContacts.map((contact) => (
          <div key={contact.id}>
            <Card name={contact.name} idContact={contact.id} onClick={() => openEditModal(contact)} />
          </div>
        ))}

      {modalIsOpen && (
        <ModalExample
          variant={variantModal}
          contactDetails={activeContact}
          closeModal={closeModal}
          isOpen={modalIsOpen}
        />
      )}
      <Toastify />
    </main>
  );
}
