import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import styles from './styles.module.css';

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant: 'fill-blue' | 'fill-white' | 'outline-blue' | 'transparent';
}

const Button = (props: ButtonProps) => {
  const { onClick, variant, children, className } = props;
  return (
    <>
      <button
        {...props}
        className={`${className} ${styles.btn} ${styles[`btn--${variant}`]} `}
        onClick={(e) => {
          e.preventDefault();
          onClick && onClick(e);
        }}
      >
        {children}{' '}
      </button>
    </>
  );
};

export { Button };
