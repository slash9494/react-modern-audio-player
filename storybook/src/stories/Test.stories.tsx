import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';


import {Test} from './Test'
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Test',
  component: Test,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Test>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Test> = (args) => <Test  />;

export const PlayerTest = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args


