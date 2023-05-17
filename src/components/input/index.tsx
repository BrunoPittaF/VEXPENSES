import { InputHTMLAttributes, ReactNode, useState } from 'react';
import { Container } from './style';
import { DotsThreeOutlineVertical } from 'phosphor-react';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  id: string;
  register: any;
}

export default function Input({
  icon,
  placeholder,
  id,
  type,
  register,
  className,
  defaultValue,
}: IInputProps) {
  return (
    <Container className={className}>
      {icon}
      <div className="input-group">
        <input defaultValue={defaultValue} {...register(id)} type={type} id={id} />
        <label htmlFor={id}>{placeholder}</label>
      </div>
    </Container>
  );
}
