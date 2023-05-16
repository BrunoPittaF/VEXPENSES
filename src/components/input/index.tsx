import { InputHTMLAttributes, ReactNode } from 'react';
import { Container } from './style';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  id: string;
}

export default function Input({ icon, placeholder, id }: IInputProps) {
  return (
    <Container>
      {icon}
      <div className="input-group">
        <input type="text" id={id} />
        <label htmlFor={id}>{placeholder}</label>
      </div>
    </Container>
  );
}
