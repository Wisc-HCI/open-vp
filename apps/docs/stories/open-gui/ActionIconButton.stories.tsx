import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ThemeProvider, createTheme, CssBaseline, PaletteMode } from "@mui/material";
import { ActionIconButton } from "@people_and_robots/open-gui";
import { FiMoreHorizontal, FiPlay } from "react-icons/fi";

const meta: Meta<typeof ActionIconButton> = {
  component: ActionIconButton
};


export default meta;

type Story = StoryObj<typeof ActionIconButton>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (props) => (
    <ActionIconButton
      {...props}
    />
  ),
  name: "Text Button",
  args: {
    title: "Button Title",
    onClick: () => alert("Button Was Clicked"),
    disabled: false,
    placement: 'bottom',
    toggled: false,
    canToggle: false,
    size: 'small',
    children: "Button Contents"
  },
};

export const Secondary: Story = {
  render: (props) => (
    <ActionIconButton
      {...props}
    />
  ),
  name: "Icon Button",
  args: {
    title: "Button Title",
    onClick: () => alert("Button Was Clicked"),
    disabled: false,
    placement: 'bottom',
    toggled: false,
    canToggle: false,
    children: <FiMoreHorizontal />
  },
};

export const Toggle: Story = {
  render: (props) => (
    <ActionIconButton
      {...props}
    />
  ),
  name: "Toggle Button",
  args: {
    title: "Button Title",
    // onClick: () => alert("Button Was Clicked"),
    disabled: false,
    placement: 'bottom',
    toggled: false,
    canToggle: true,
    children: <FiPlay />
  },
};
