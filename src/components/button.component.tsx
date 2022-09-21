import React, { FC, MouseEvent, ReactElement } from 'react';

interface Props {
  className?: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactElement;
}

export const Button: FC<Props> = ({ onClick, className, children }): ReactElement => {
  return (
    <button className={`astrosat-btn astrosat-bg-green-500 ${className ? className : ''}`} onClick={onClick}>
      {children}
    </button>
  );
};
