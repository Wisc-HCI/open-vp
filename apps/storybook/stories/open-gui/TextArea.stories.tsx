import type { Meta, StoryObj } from "@storybook/react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  PaletteMode,
} from "@mui/material";
import { TextArea } from "@people_and_robots/open-gui";
import { FiMoreHorizontal } from "react-icons/fi";
import React from "react";

const meta: Meta<typeof TextArea> = {
  component: TextArea
};

export default meta;

type Story = StoryObj<typeof TextArea>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (props) => <TextArea {...props} />,
  name: "Text Input",
  args: {
    wrapped: false,
    disabled: false,
    defaultValue: "Current Text",
    label: "#",
    hideLabelPrefix: false,
    extra: <FiMoreHorizontal />,
  },
};
