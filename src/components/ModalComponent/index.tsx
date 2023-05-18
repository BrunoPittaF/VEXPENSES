import Modal from 'react-modal';
import { ButtonRemove, Container, Form, Header, ImageContainer } from './style';
import { Buildings, Calendar, EnvelopeSimple, Phone, UploadSimple, User } from 'phosphor-react';
import Input from '../Input';
import { useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { createContact, editContact } from '@/services/contacts';
import { IFormData, IFormServer } from '@/interfaces';

interface IModalProps {
  isOpen: boolean;
  closeModal: () => void;
  variant: 'create' | 'edit';
  contactDetails?: IFormServer | undefined;
}

const customStyles = {
  content: {
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    padding: '12px',
  },
};

const contactSchema = yup.object().shape({
  email: yup.string().email('Email inválido'),
  name: yup.string().required('Campo obrigatório'),
  lastname: yup.string(),
  enterprise: yup.string(),
  birthday: yup.string().max(10),
  telephone: yup.string().max(11).required('Campo obrigatório'),
  picture: yup.mixed().test('fileList', 'Selecione pelo menos um arquivo', (value: any) => {
    if (value && value.length === 0) return true;

    if (value && value.length) {
      const filesArray = Array.from(value);
      return filesArray.length > 0;
    }
    return false;
  }),
});

Modal.setAppElement('#__next');

export default function ModalComponent({
  isOpen,
  closeModal,
  variant = 'create',
  contactDetails,
}: IModalProps) {
  const userPhoto = contactDetails && contactDetails.picture;
  const isEditVariant = variant === 'edit';
  const [photo, setPhoto] = useState<string>(userPhoto ? userPhoto : '');
  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(contactSchema),
  });

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

  const hasPhotoInInput = nameElement[6];

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
  }, [contactDetails]);

  useEffect(() => {
    if (hasPhotoInInput && hasPhotoInInput[0]) {
      setPhoto(URL.createObjectURL(hasPhotoInInput[0]));
    }
  }, [hasPhotoInInput]);

  const onSubmit = handleSubmit((data) =>
    contactSchema.isValid(data).then((valid) => {
      if (valid) {
        toast.success(`${isEditVariant ? 'Contato Editado com sucesso' : 'Contato salvo com sucesso'}`, {
          autoClose: 3000,
        });

        const newContact = {
          ...data,
          picture: photo,
        };

        isEditVariant && contactDetails && contactDetails.id
          ? editContact(newContact, contactDetails.id)
          : createContact(newContact);
        closeModal();
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
        <button type="button" onClick={closeModal}>
          X
        </button>
        <h1>{isEditVariant ? 'Editar Contato' : 'Criar contato'}</h1>
        <button form="createUser" type="submit" onClick={onSubmit}>
          Salvar
        </button>
      </Header>
      <Container>
        <Form id="createUser" onSubmit={onSubmit}>
          {photo && (
            <ImageContainer>
              <Image width={160} height={160} src={photo} alt="Foto da galeria" />
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
                <Input
                  error={errors.picture ? errors.picture.message : ''}
                  register={register}
                  type="file"
                  name="picture"
                  id="picture"
                />
              </div>
              <label htmlFor="picture">Adicionar imagem</label>
            </div>
          )}

          <Input
            error={errors.name ? errors.name.message : ''}
            className={`${nameElement[0] || contactDetails ? 'filled' : ''}`}
            id="name"
            type="text"
            defaultValue={contactDetails && contactDetails.name}
            placeholder="Nome"
            register={register}
            icon={<User size={24} color="#242424" weight="light" />}
          />
          <Input
            error={errors.lastname ? errors.lastname.message : ''}
            className={`${nameElement[1] || contactDetails ? 'filled' : ''}`}
            register={register}
            defaultValue={contactDetails && contactDetails.lastname}
            id="lastname"
            type="text"
            placeholder="Sobrenome"
          />
          <Input
            error={errors.enterprise ? errors.enterprise.message : ''}
            className={`${nameElement[2] || contactDetails ? 'filled' : ''}`}
            id="enterprise"
            placeholder="Endereço"
            defaultValue={contactDetails && contactDetails.enterprise}
            type="text"
            register={register}
            icon={<Buildings size={24} color="#242424" weight="light" />}
          />

          {enterpriseFields.map((field, index) => (
            <div style={{ width: '100%', position: 'relative' }} key={field.id}>
              <Input
                error={undefined}
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
            error={errors.telephone ? errors.telephone.message : ''}
            className={`${nameElement[4] || contactDetails ? 'filled' : ''}`}
            id="telephone"
            defaultValue={contactDetails && contactDetails.telephone}
            placeholder="Telefone"
            type="number"
            register={register}
            icon={<Phone size={24} color="#242424" weight="light" />}
          />

          {telephoneFields.map((field, index) => (
            <div style={{ width: '100%', position: 'relative' }} key={field.id}>
              <Input
                error={undefined}
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
            error={errors.email ? errors.email.message : ''}
            className={`${nameElement[4] || contactDetails ? 'filled' : ''}`}
            register={register}
            id="email"
            defaultValue={contactDetails && contactDetails.email}
            placeholder="E-mail"
            type="email"
            {...register('email')}
            icon={<EnvelopeSimple size={24} color="#242424" weight="light" />}
          />
          <Input
            error={errors.birthday ? errors.birthday.message : ''}
            className={`${nameElement[5] || contactDetails ? 'filled' : ''}`}
            register={register}
            defaultValue={contactDetails && contactDetails.birthday}
            id="birthday"
            placeholder="Data"
            type="date"
            {...register('birthday')}
            icon={<Calendar size={24} color="#242424" weight="light" />}
          />
        </Form>
      </Container>
    </Modal>
  );
}
