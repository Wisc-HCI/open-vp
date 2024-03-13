import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider, createTheme, CssBaseline, PaletteMode } from "@mui/material";
import { NumberSpinner } from "@people_and_robots/open-gui";
import { FiMoreHorizontal } from "react-icons/fi";

const meta: Meta<typeof NumberSpinner> = {
  component: NumberSpinner
};

export default meta;

type Story = StoryObj<typeof NumberSpinner>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (props) => (
    <NumberSpinner
        {...props}
    />
  ),
  name: "Text Button",
  args: {
    onClickUp: (_) => {console.log("Clicked Up")},
    onClickDown: (_) => {console.log("Clicked Down")},
    disabled: false,
    above: false,
    below: false,
  },
};