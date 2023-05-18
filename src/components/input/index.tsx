import { InputHTMLAttributes, ReactNode } from 'react';
import { Container } from './style';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  id: string;
  register: any;
  error: string | undefined;
}

export default function Input({
  icon,
  placeholder,
  id,
  type,
  register,
  className,
  defaultValue,
  error,
}: IInputProps) {
  const hasError = !!error;
  return (
    <Container hasError={hasError} className={className}>
      {icon}
      <div className="input-group">
        <input defaultValue={defaultValue} {...register(id)} type={type} id={id} />
        <label htmlFor={id}>{placeholder}</label>
        <span>{error}</span>
      </div>
    </Container>
  );
}
