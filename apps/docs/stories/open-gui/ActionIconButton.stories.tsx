import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { ActionIconButton } from "@people_and_robots/open-gui";
import { FiMoreHorizontal } from "react-icons/fi";

const meta: Meta<typeof ActionIconButton> = {
  component: ActionIconButton,
  decorators: [
    (Story) => (
      <ThemeProvider theme={createTheme()}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    )
  ]
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
