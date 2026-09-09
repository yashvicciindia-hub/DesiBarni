import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

export default function Button({
  children,
  onClick,
  secondary = false,
  type = 'button',
}: {
  children: ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  type?: 'button' | 'submit' | 'reset';
}) {
  return (
    <button className={`button ${secondary ? 'button-secondary' : ''}`} onClick={onClick} type={type}>
      {children}
      <ArrowRight size={16} />
    </button>
  );
}
