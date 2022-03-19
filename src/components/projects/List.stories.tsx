import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import List from './List';

export default {
  title: 'Components/Projects/List',
  component: List,
} as ComponentMeta<typeof List>;


const Template: ComponentStory<typeof List> = (args) => <List {...args} />;

export const Default = Template.bind({});
Default.args = {
  projects: [
    {
      title: "Kotlin Symbol Processing (KSP) Example",
      slug: "",
      startedAt: "21 Jan 2022",
      tags: ["Kotlin", "KSP", "CodeGen"]
    },
    {
      title: "Kotlin Symbol Processing (KSP) Example",
      slug: "",
      startedAt: "21 Jan 2022",
      tags: ["Kotlin", "KSP", "CodeGen"]
    },
    {
      title: "Kotlin Symbol Processing (KSP) Example",
      slug: "",
      startedAt: "21 Jan 2022",
      tags: ["Kotlin", "KSP", "CodeGen"]
    }
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true
};