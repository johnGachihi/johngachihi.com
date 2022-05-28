import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PostListItem from './PostListItem';

export default {
  title: 'Components/Post-List/PostListItem',
  component: PostListItem,
} as ComponentMeta<typeof PostListItem>;


const Template: ComponentStory<typeof PostListItem> = (args) => <PostListItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Declarative and Imperative in UI",
  tags: ["UI Development"],
  slug: "#",
  date: "21 Jun 2022"
};
