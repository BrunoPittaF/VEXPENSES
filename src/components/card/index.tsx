import { ContainerCard, FloatingMenu } from '@/style/home';
import { DotsThreeOutlineVertical, UserPlus } from 'phosphor-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';

interface ICardProps {
  image?: string;
  name: string;
  mode?: 'card' | 'button';
  onClick?: () => void;
  idContact?: number;
}

export default function Card({ name, image, mode = 'card', onClick, idContact }: ICardProps) {
  const [menu, setMenu] = useState(false);

  const userHasImage = mode === 'card' && image;
  const isModeCard = mode === 'card';

  function openMenu(e: any) {
    e.stopPropagation();
    setMenu(!menu);
  }

  async function deleteContact(idContact: number) {
    try {
      await fetch(`http://localhost:3001/contacts/${idContact}`, {
        method: 'DELETE',
      });

      toast.success('Contato deletado com sucesso', {
        autoClose: 3000,
      });
    } catch (error) {
      toast.warn('Usuário não pode ser deletado', {
        autoClose: 3000,
      });
      console.error(error);
    }
  }
  return (
    <ContainerCard onClick={onClick} mode={mode}>
      {mode === 'button' && <UserPlus size={36} color="#8047f8" weight="light" />}
      {isModeCard ? (
        userHasImage ? (
          <Image src={image} alt={name} />
        ) : (
          <span>{name[0].toUpperCase()}</span>
        )
      ) : (
        ''
      )}

      <p>{name}</p>

      {isModeCard && idContact && (
        <div className="action-button" onClick={openMenu}>
          <DotsThreeOutlineVertical size={20} color="#000000" weight="light" />
          {menu && (
            <FloatingMenu>
              <ul>
                <li>
                  <button onClick={() => deleteContact(idContact)}>Excluir</button>
                </li>
              </ul>
            </FloatingMenu>
          )}
        </div>
      )}
    </ContainerCard>
  );
}
