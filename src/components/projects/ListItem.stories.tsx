import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ListItem from './ListItem';

export default {
  title: 'Components/Blog/ListItem',
  component: ListItem,
} as ComponentMeta<typeof ListItem>;


const Template: ComponentStory<typeof ListItem> = (args) => <ListItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Kotlin KSP Example",
  startedOn: "12 Jan 2022",
  tags: ["Kotlin", "KSP", "CodeGen"],
  slug: "kotlin-ksp-example"
};
