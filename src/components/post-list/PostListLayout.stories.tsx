import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import PostListLayout from './PostListLayout';
import ArticleList from "../articles/ArticleList";

export default {
  title: 'Layout/Post-List/PostListLayout',
  component: PostListLayout,
} as ComponentMeta<typeof PostListLayout>;


const Template: ComponentStory<typeof PostListLayout> = () => (
  <PostListLayout title="The List Title">
    <ArticleList _articles={[
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
    ]}/>
  </PostListLayout>
);

export const Default = Template.bind({});
