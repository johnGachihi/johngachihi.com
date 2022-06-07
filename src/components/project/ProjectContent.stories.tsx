import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProjectContent from "./ProjectContent";
import { createProject } from "../../test/factory";

export default {
  title: 'Layout/ProjectContent',
  component: ProjectContent,
} as ComponentMeta<typeof ProjectContent>;


const Template: ComponentStory<typeof ProjectContent> = (args) => <ProjectContent {...args} />;

export const Default = Template.bind({});
Default.args = {
  slug: "",
  _project: createProject()
};

export const NoShowcaseMedia = Template.bind({});
NoShowcaseMedia.args = {
  ...Default.args,
  _project: createProject({ showcaseMedia: undefined })
};
