import { ContainerCard, FloatingMenu } from './style';
import { DotsThreeOutlineVertical, UserPlus } from 'phosphor-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';

interface ICardProps {
  image?: string;
  name: string;
  mode?: 'card' | 'button';
  onClick?: () => void;
  deleteContact?: (idContact: number) => void;
  idContact?: number;
}

export default function Card({ name, image, mode = 'card', onClick, idContact, deleteContact }: ICardProps) {
  const [menu, setMenu] = useState(false);

  const userHasImage = mode === 'card' && image;
  const isModeCard = mode === 'card';

  function openMenu(e: any) {
    e.stopPropagation();
    setMenu(!menu);
  }

  return (
    <ContainerCard onClick={onClick} mode={mode}>
      {mode === 'button' && <UserPlus size={36} color="#215990" weight="light" />}
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
          <DotsThreeOutlineVertical size={20} color="#242424" weight="light" />
          {menu && (
            <FloatingMenu>
              <ul>
                <li>
                  <button onClick={() => deleteContact && deleteContact(idContact)}>Excluir</button>
                </li>
              </ul>
            </FloatingMenu>
          )}
        </div>
      )}
    </ContainerCard>
  );
}
