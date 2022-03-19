import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ListItem, {LoadingListItem} from './ListItem';

export default {
  title: 'Components/Projects/ListItem',
  component: ListItem,
} as ComponentMeta<typeof ListItem>;


const args = {
  title: "Kotlin KSP Example",
  startedAt: "12 Jan 2022",
  tags: ["Kotlin", "KSP", "CodeGen"],
  slug: "kotlin-ksp-example"
};
export const Default: ComponentStory<typeof ListItem> = () => <ListItem {...args} />;

export const Loading = () => <LoadingListItem />
