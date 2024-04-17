import React, { InputHTMLAttributes, SelectHTMLAttributes } from 'react';
import styles from './styles.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  type?: 'text' | 'number' | 'email' | 'checkbox';
  error?: string;
}

const Input: React.FC<InputProps> = (props) => {
  const {
    onChange,
    value,
    className,
    type = 'text',
    label,
    name,
    error,
    ...rest
  } = props;

  return (
    <>
      {label && <label className={styles.label}>{label} </label>}
      <input
        required
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`${styles.input} ${className || ''}`}
        {...rest}
      />
      {error && <p className={styles.error}>{error}</p>}
    </>
  );
};

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  id?: string;
  error?: string;
  options: { value: string; label: string }[];
}

const Select: React.FC<SelectProps> = (props) => {
  const { onChange, value, label, name, error, options, ...rest } = props;

  return (
    <div className='rounded-full pr-2 md:px-4 border border-black/35  bg-gray/15 backdrop-blur-sm min-w-36'>
      {label && (
        <label className='w-20' htmlFor={name}>
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={styles.input}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export { Input, Select };
