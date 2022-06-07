import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ArticleContent from './ArticleContent';
import { createArticle } from "../../test/factory";

export default {
  title: 'Layout/ArticleContent',
  component: ArticleContent,
} as ComponentMeta<typeof ArticleContent>;


const Template: ComponentStory<typeof ArticleContent> = (args) => <ArticleContent {...args} />;

export const Default = Template.bind({})
Default.args = {
  _article: createArticle()
}

