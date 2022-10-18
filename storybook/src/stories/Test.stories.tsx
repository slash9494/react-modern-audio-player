import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Test } from "./Test";

export default {
  title: "Example/Test",
  component: Test,
  argTypes: {
    playerPlacement: {
      options: [
        "bottom",
        "top",
        "bottom-left",
        "bottom-right",
        "top-left",
        "top-right",
      ],
      control: { type: "select" },
    },
    mode: {
      options: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      control: { type: "select" },
      defaultValue: "0",
    },
    progressType: {
      options: ["bar", "waveform"],
      control: { type: "select" },
    },
  },
} as ComponentMeta<typeof Test>;

const Template: ComponentStory<typeof Test> = (args) => <Test {...args} />;

export const PlayerTest = Template.bind({});
