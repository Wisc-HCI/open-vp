import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider, createTheme, CssBaseline, PaletteMode } from "@mui/material";
import { Toggle } from "@people_and_robots/open-gui";

const meta: Meta<typeof Toggle> = {
  component: Toggle
};

export default meta;

type Story = StoryObj<typeof Toggle>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (props) => (
    <Toggle
        {...props}
    />
  ),
  name: "Text Button",
  args: {
    disabled: false,
    defaultValue: false,
    label: "Toggle"
  },
};