import { ContainerCard } from '@/style/home';
import { UserPlus } from 'phosphor-react';

interface ICardProps {
  image?: string;
  name: string;
  mode?: 'card' | 'button';
  onClick?: () => void;
}

export default function Card({ name, image, mode = 'card', onClick }: ICardProps) {
  const userHasImage = mode === 'card' && image;
  const isModeCard = mode === 'card';
  return (
    <ContainerCard onClick={onClick} mode={mode}>
      {mode === 'button' && <UserPlus size={36} color="#8047f8" weight="light" />}
      {isModeCard ? userHasImage ? <img src={image} alt={name} /> : <span>{name[0].toUpperCase()}</span> : ''}

      <p>{name}</p>
    </ContainerCard>
  );
}
