import React from 'react';

import { render, screen } from '~/test/utils';

import { Button } from './button.component';

describe('Button', () => {
  it('should render a basic button', () => {
    const onClick = vi.fn();
    render(
      <Button onClick={onClick}>
        <span>Click Me</span>
      </Button>,
    );
    expect(
      screen.getByRole('button', { name: /click\sme/i }),
    ).toBeInTheDocument();
  });
});
