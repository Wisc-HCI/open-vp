import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { ScrollRegion } from "@people_and_robots/open-gui";
import { FiMoreHorizontal } from "react-icons/fi";

const meta: Meta<typeof ScrollRegion> = {
  component: ScrollRegion,
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

type Story = StoryObj<typeof ScrollRegion>;

const ITEMS = Array.from({ length: 50 }).map((_, i) => `Item at index ${i}`);

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (props) => (
    <ScrollRegion
        {...props}
    />
  ),
  name: "Text Button",
  args: {
    children: <div style={{backgroundColor:'red'}}>{ITEMS.map(item=><div key={item}>{item}</div>)}</div>,
    horizontal: false,
    vertical: true,
    height: "50vh",
    width: "100%",
  },
};