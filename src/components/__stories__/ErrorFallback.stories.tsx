import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ErrorFallback from '../ErrorFallback';

export default {
  title: 'Components/ErrorFallback',
  component: ErrorFallback,
} as ComponentMeta<typeof ErrorFallback>;


const Template: ComponentStory<typeof ErrorFallback> = (args) => <ErrorFallback {...args} />;

export const Default = Template.bind({});
Default.args = {
  error: new Error("Test error. No funny business")
};
