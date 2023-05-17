import Modal from 'react-modal';
import { ButtonRemove, Container, Form, Header, ImageContainer } from './style';
import { Buildings, Calendar, EnvelopeSimple, Phone, UploadSimple, User } from 'phosphor-react';
import Input from '../input';
import { useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useEffect, Dispatch, SetStateAction, useState } from 'react';

interface IModalProps {
  isOpen: boolean;
  closeModal: () => void;
  variant: 'create' | 'edit';
  contactDetails?: IContactDetails | undefined;
  setContacts: Dispatch<SetStateAction<IFormData[]>>;
}

interface IFormData {
  name: string;
  lastname?: string;
  enterprise?: string;
  email?: string;
  telephone: string;
  birthday?: string;
  picture?: FileList;
  telephoneDynamic: {
    telephoneD: string;
  }[];
  enterpriseDynamic: {
    enterpriseD: string;
  }[];
}

interface IContactDetails extends IFormData {
  id?: number;
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

const addressSchema = yup.object().shape({
  email: yup.string().email(),
  name: yup.string().required(),
  lastname: yup.string(),
  enterprise: yup.string(),
  birthday: yup.string().max(10),
  telephone: yup.string().max(11).required(),
  picture: yup.mixed().test('fileList', 'Selecione pelo menos um arquivo', (value: any) => {
    if (value.length === 0) return true;

    if (value && value.length) {
      const filesArray = Array.from(value);
      return filesArray.length > 0;
    }
    return false;
  }),
});

Modal.setAppElement('#__next');

export default function ModalExample({
  isOpen,
  closeModal,
  variant = 'create',
  contactDetails,
  setContacts,
}: IModalProps) {
  const userPhoto = contactDetails?.picture ? contactDetails.picture[0] : '';
  const [photo, setPhoto] = useState(userPhoto);
  const isEditVariant = variant === 'edit';

  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormData>();

  const {
    fields: enterpriseFields,
    append: appendEnterprise,
    remove: removeEnterprise,
  } = useFieldArray({
    control,
    name: 'enterpriseDynamic',
  });
  const {
    fields: telephoneFields,
    append: appendTelephone,
    remove: removeTelephone,
  } = useFieldArray({
    control,
    name: 'telephoneDynamic',
  });

  async function createContact(data: IFormData) {
    await fetch('http://localhost:3001/contacts', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    closeModal();
    setContacts((oldState) => [...oldState, data]);
  }

  const handleAddTelephoneField = () => {
    appendTelephone({ telephoneD: '' });
  };

  const handleRemoveTelephoneField = (index: number) => {
    removeTelephone(index);
  };

  const handleAddEnterpriseField = () => {
    appendEnterprise({ enterpriseD: '' });
  };

  const handleRemoveEnterpriseField = (index: number) => {
    removeEnterprise(index);
  };

  const removePhoto = () => {
    setPhoto('');
  };

  const nameElement = watch([
    'name',
    'lastname',
    'enterprise',
    'email',
    'telephone',
    'birthday',
    'picture',
    'enterpriseDynamic',
    'telephoneDynamic',
  ]);

  const hasPhoto = nameElement[6];

  useEffect(() => {
    if (contactDetails && contactDetails.enterpriseDynamic.length > 0) {
      contactDetails.enterpriseDynamic.forEach(() => {
        handleAddEnterpriseField();
      });
    }
    if (contactDetails && contactDetails.telephoneDynamic.length > 0) {
      contactDetails.telephoneDynamic.forEach(() => {
        handleAddTelephoneField();
      });
    }
  }, []);

  useEffect(() => {
    if (hasPhoto && hasPhoto[0]) {
      setPhoto(URL.createObjectURL(hasPhoto[0]));
    }
  }, [hasPhoto]);
  const onSubmit = handleSubmit((data) =>
    addressSchema.isValid(data).then((valid) => {
      if (valid) {
        toast.success('Contato salvo com sucesso', {
          autoClose: 3000,
        });
        createContact(data);
      } else {
        toast.warn('Erro no formulário', {
          autoClose: 3000,
        });
        console.log('erro', data);
      }
    })
  );

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <Header>
        <button onClick={closeModal}>X</button>
        <h1>{isEditVariant ? 'Editar Contato' : 'Criar contato'}</h1>
        <button form="createUser" type="submit" onClick={onSubmit}>
          Salvar
        </button>
      </Header>
      <Container>
        <Form id="createUser" onSubmit={onSubmit}>
          {photo && (
            <ImageContainer>
              <img src={photo} alt="Foto da galeria" />
              <button type="button" onClick={removePhoto}>
                Remover
              </button>
            </ImageContainer>
          )}
          {!photo && (
            <div className="photo-group">
              <div className="photo">
                <label htmlFor="picture">
                  <UploadSimple size={36} color="#ffffff" weight="light" />
                </label>
                <Input register={register} type="file" name="picture" id="picture" />
              </div>
              <label htmlFor="picture">Adicionar imagem</label>
            </div>
          )}

          <Input
            className={`${nameElement[0] || contactDetails ? 'filled' : ''}`}
            id="name"
            type="text"
            defaultValue={contactDetails && contactDetails.name}
            placeholder="Nome"
            register={register}
            icon={<User size={20} color="#242424" weight="light" />}
          />
          <Input
            className={`${nameElement[1] || contactDetails ? 'filled' : ''}`}
            register={register}
            defaultValue={contactDetails && contactDetails.lastname}
            id="lastname"
            type="text"
            placeholder="Sobrenome"
          />
          <Input
            className={`${nameElement[2] || contactDetails ? 'filled' : ''}`}
            id="enterprise"
            placeholder="Endereço"
            defaultValue={contactDetails && contactDetails.enterprise}
            type="text"
            register={register}
            icon={<Buildings size={20} color="#242424" weight="light" />}
          />

          {enterpriseFields.map((field, index) => (
            <div style={{ width: '100%', position: 'relative' }} key={field.id}>
              <Input
                className={`${nameElement[7][index] || contactDetails ? 'filled' : ''}`}
                register={register}
                defaultValue={contactDetails && contactDetails.enterpriseDynamic[index].enterpriseD}
                id={`enterpriseDynamic.${index}.enterpriseD`}
                placeholder="Endereço"
              />
              <ButtonRemove type="button" onClick={() => handleRemoveEnterpriseField(index)}>
                X
              </ButtonRemove>
            </div>
          ))}

          <button onClick={handleAddEnterpriseField} type="button">
            Adicionar Endereço
          </button>
          <Input
            className={`${nameElement[3] || contactDetails ? 'filled' : ''}`}
            id="telephone"
            defaultValue={contactDetails && contactDetails.telephone}
            placeholder="Telefone"
            type="number"
            register={register}
            icon={<Phone size={20} color="#242424" weight="light" />}
          />

          {telephoneFields.map((field, index) => (
            <div style={{ width: '100%', position: 'relative' }} key={field.id}>
              <Input
                className={`${nameElement[8][index] || contactDetails ? 'filled' : ''}`}
                register={register}
                defaultValue={contactDetails && contactDetails.telephoneDynamic[index].telephoneD}
                id={`telephoneDynamic.${index}.telephoneD`}
                placeholder="Telefone"
              />
              <ButtonRemove type="button" onClick={() => handleRemoveTelephoneField(index)}>
                X
              </ButtonRemove>
            </div>
          ))}

          <button onClick={handleAddTelephoneField} type="button">
            Adicionar Telefone
          </button>
          <Input
            className={`${nameElement[4] || contactDetails ? 'filled' : ''}`}
            register={register}
            id="email"
            defaultValue={contactDetails && contactDetails.email}
            placeholder="E-mail"
            type="email"
            {...register('email')}
            icon={<EnvelopeSimple size={20} color="#242424" weight="light" />}
          />
          <Input
            className={`${nameElement[5] || contactDetails ? 'filled' : ''}`}
            register={register}
            defaultValue={contactDetails && contactDetails.birthday}
            id="birthday"
            placeholder="Data"
            type="date"
            {...register('birthday')}
            icon={<Calendar size={20} color="#242424" weight="light" />}
          />
        </Form>
      </Container>
    </Modal>
  );
}
