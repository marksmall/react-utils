import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button } from './button.component';

const Index = {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'fullscreen' },
} as ComponentMeta<typeof Button>;

export default Index;

// const Template: ComponentStory<typeof Button> = args => <Button {...args} />;

// export const Default = Template.bind({});
// Default.args = {};
export const Text = () => (
  <>
    <Button onClick={() => ({})}>
      <span>Primary</span>
    </Button>
    <Button onClick={() => ({})}>
      <span>Secondary</span>
    </Button>
  </>
);
