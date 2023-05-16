import Card from '@/components/card';
import ModalExample from '@/components/contactDetails';
import { useState } from 'react';
export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }
  return (
    <main>
      <Card onClick={openModal} mode="button" name="Criar novo contato" />

      <Card name="caio bruno" />
      <Card name="caio bruno" />
      <Card name="caio bruno" />

      {modalIsOpen && <ModalExample closeModal={closeModal} isOpen={modalIsOpen} />}
    </main>
  );
}
