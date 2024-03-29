import type { Meta, StoryObj } from "@storybook/react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  PaletteMode,
} from "@mui/material";
import { TextInput } from "@people_and_robots/open-gui";
import { FiMoreHorizontal, FiCheck } from "react-icons/fi";
import React from "react";

const meta: Meta<typeof TextInput> = {
  component: TextInput
};

export default meta;

type Story = StoryObj<typeof TextInput>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (props) => <TextInput {...props} />,
  name: "Text Input",
  args: {
    wrapped: false,
    disabled: false,
    defaultValue: "Current Text",
    label: "Gas Price $",
    hideLabelPrefix: false,
    suffix: "/gal",
    extra: <FiCheck />,
  },
};
