import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Header from './Header';

export default {
  title: 'Components/Post/Header',
  component: Header,
} as ComponentMeta<typeof Header>;


const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "How to Sing Like Elvis Presley",
  date: "21 Jan 2021"
};
