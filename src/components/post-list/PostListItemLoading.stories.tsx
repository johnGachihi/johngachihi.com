import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PostListItemLoading } from './PostListItem';

export default {
  title: 'Components/Post-List/PostListItemLoading',
  component: PostListItemLoading,
} as ComponentMeta<typeof PostListItemLoading>;


const Template: ComponentStory<typeof PostListItemLoading> = () => <PostListItemLoading />;

export const Default = Template.bind({});
