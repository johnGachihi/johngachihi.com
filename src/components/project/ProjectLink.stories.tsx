import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProjectLink from './ProjectLink';
import { GitHub } from "@mui/icons-material";

export default {
  title: 'Components/Project/ProjectLink',
  component: ProjectLink,
} as ComponentMeta<typeof ProjectLink>;


const Template: ComponentStory<typeof ProjectLink> = (args) => <ProjectLink {...args} />;

export const Default = Template.bind({});
Default.args = {
  icon: <GitHub />,
  text: "GitHub Link",
  link: "https://github.com/johngachihi"
};
