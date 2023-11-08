import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider, createTheme, CssBaseline, PaletteMode } from "@mui/material";
import { Vector3Input } from "@people_and_robots/open-gui";
import { FiMoreHorizontal } from "react-icons/fi";

const meta: Meta<typeof Vector3Input> = {
  component: Vector3Input
};

export default meta;

type Story = StoryObj<typeof Vector3Input>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (props) => (
    <Vector3Input
        {...props}
    />
  ),
  name: "Vector 3 Input",
  args: {
    disabled: false,
    label: "Vector",
    value: [0, 0, 0],
    min: [
      Number.NEGATIVE_INFINITY,
      Number.NEGATIVE_INFINITY,
      Number.NEGATIVE_INFINITY,
    ],
    max: [
      Number.POSITIVE_INFINITY,
      Number.POSITIVE_INFINITY,
      Number.POSITIVE_INFINITY,
    ],
    step: 0.1,
  },
};