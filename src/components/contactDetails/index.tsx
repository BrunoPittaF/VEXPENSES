import Modal from 'react-modal';
import { Container, Form, Header } from './style';
import { UploadSimple, User } from 'phosphor-react';
import Input from '../input';

interface IModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const customStyles = {
  content: {
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    padding: '10px 8px',
  },
};

Modal.setAppElement('#__next');

export default function ModalExample({ isOpen, closeModal }: IModalProps) {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <Header>
        <button onClick={closeModal}>X</button>
        <h1>Criar contato</h1>

        <button>Salvar</button>
      </Header>
      <Container>
        <div className="photo-group">
          <div className="photo">
            <label htmlFor="upload-photo">
              <UploadSimple size={36} color="#ffffff" weight="light" />
            </label>
            <input type="file" name="" id="upload-photo" />
          </div>
          <label htmlFor="upload-photo">Adicionar imagem</label>
        </div>

        <Form action="">
          <Input id="name" placeholder="Nome" icon={<User size={20} color="#242424" weight="light" />} />
          <Input id="sobrenome" placeholder="Sobrenome" />
          <Input id="sobrenome-fonetico" placeholder="Sobrenome fonético" />
          <Input id="meio-fonetico" placeholder="Nome do meio fonético" />
          <Input id="nome-fonetico" placeholder="Nome fonético" />
          <Input id="apelido" placeholder="Apelido" />
          <Input id="arquivar" placeholder="Arquivar como" />
        </Form>
      </Container>
    </Modal>
  );
}
