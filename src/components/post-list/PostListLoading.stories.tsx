import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PostListLoading from './PostListLoading';

export default {
  title: 'Components/Post-List/PostListLoading',
  component: PostListLoading,
} as ComponentMeta<typeof PostListLoading>;


const Template: ComponentStory<typeof PostListLoading> = () => <PostListLoading />;

export const Default = Template.bind({});
