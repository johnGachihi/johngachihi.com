import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProjectList from './ProjectList';
import { createProject } from "../../test/factory";

export default {
  title: 'Components/Project/ProjectList',
  component: ProjectList,
} as ComponentMeta<typeof ProjectList>;


const Template: ComponentStory<typeof ProjectList> = (args) => <ProjectList {...args} />;

export const Default = Template.bind({});
Default.args = {
  _projects: [...Array(4)].map(() => createProject())
};
