import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ArticleList from './ArticleList';

export default {
  title: 'Components/Articles/ArticleList',
  component: ArticleList,
} as ComponentMeta<typeof ArticleList>;


const Template: ComponentStory<typeof ArticleList> = (args) => <ArticleList {...args} />;

export const Default = Template.bind({});
Default.args = {
  _articles: [
    {
      id: "1",
      title: "Lorem ipsum dolor sit amet",
      slug: "#",
      publishedOn: "21 Jan 2022",
      tags: ["kotlin", "AI", "ProgrammingConcepts"]
    },
    {
      id: "2",
      title: "Enim ut tellus elementum sagittis vitae",
      slug: "#",
      publishedOn: "02 Nov 2022",
      tags: ["Java", "Python"]
    },
    {
      id: "3",
      title: "Non nisi est sit amet facilisis",
      slug: "#",
      publishedOn: "01 Dec 2022",
      tags: ["WebDevelopment"]
    }
  ]
};
