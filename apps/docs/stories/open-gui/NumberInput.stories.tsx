import { SyntheticEvent } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { NumberInput } from "@people_and_robots/open-gui";

const meta: Meta<typeof NumberInput> = {
  component: NumberInput,
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

type Story = StoryObj<typeof NumberInput>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (props) => (
    <NumberInput
      {...props}
    />
  ),
  name: "Text Button",
  args: {
    disabled: false,
    label: 'Enter Price',
    onChange: (value?: number) => console.log(event),
    step: 0.1,
    value: 1.1,
    onBlur: (event: SyntheticEvent) => console.log(event),
    onFocus: (event: SyntheticEvent) => console.log(event),
    onMouseEnter: (event: SyntheticEvent) => console.log(event),
    onMouseLeave: (event: SyntheticEvent) => console.log(event),
    suffix: "/gal",
    prefix: "$",
    min: 0,
    max: 10
  },
};
