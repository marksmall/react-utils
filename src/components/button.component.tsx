import React, { FC, ReactElement, MouseEvent } from 'react';

interface Props {
  className?: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactElement;
}

export const Button: FC<Props> = ({
  onClick,
  className,
  children,
}): ReactElement => {
  return (
    <button
      onClick={onClick}
      className={`btn bg-blue-500 ${className ? className : ''}`}
    >
      {children}
    </button>
  );
};
