import Card from '@/components/Card';
import ModalComponent from '@/components/ModalComponent';
import Toastify from '@/components/Toastify';
import { IFormServer } from '@/interfaces';
import { deleteContact, getContactList } from '@/services/contacts';
import { Main, Search } from '@/style/home';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Home() {
  const [contacts, setContacts] = useState<IFormServer[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeContact, setActiveContact] = useState<IFormServer | undefined>();
  const [variantModal, setVariantModal] = useState<'create' | 'edit'>('create');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContacts, setFilteredContacts] = useState<IFormServer[]>([]);

  async function handleDeleteContact(idContact: number) {
    try {
      deleteContact(idContact);
      toast.success('Contato deletado com sucesso', {
        autoClose: 3000,
      });
      const contactList = await getContactList();
      if (!contactList) return;
      setContacts(contactList);
      setFilteredContacts(contactList);
    } catch (error) {
      toast.warn('Usuário não pode ser deletado', {
        autoClose: 3000,
      });
      console.error(error);
    }
  }

  function openModal() {
    setActiveContact(undefined);
    setVariantModal('create');
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function openEditModal(data: IFormServer) {
    setActiveContact(data);
    setVariantModal('edit');
    setModalIsOpen(true);
  }

  function handleSearch(value: string) {
    setSearchTerm(value);
    const filtered = contacts.filter((contact) => contact.name.toLowerCase().includes(value.toLowerCase()));
    setFilteredContacts(filtered);
  }

  useEffect(() => {
    (async () => {
      try {
        const contactList = await getContactList();
        if (!contactList) return;
        setContacts(contactList);
        setFilteredContacts(contactList);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [modalIsOpen]);

  return (
    <Main>
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
          <Card
            key={contact.id}
            name={contact.name}
            idContact={contact.id}
            deleteContact={handleDeleteContact}
            onClick={() => openEditModal(contact)}
          />
        ))}

      {modalIsOpen && (
        <ModalComponent
          variant={variantModal}
          contactDetails={activeContact}
          closeModal={closeModal}
          isOpen={modalIsOpen}
        />
      )}
      <Toastify />
    </Main>
  );
}
