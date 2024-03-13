import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "@people_and_robots/open-gui";

const meta: Meta<typeof Select> = {
  component: Select
};

export default meta;

type Story = StoryObj<typeof Select>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (props) => (
    <Select
        {...props}
    />
  ),
  name: "Standard Select",
  args: {
    disabled: false,
    label: "Select",
    value: "1",
    wrapped: false,
    options: [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
      { value: "3", label: "Option 3" },
    ]
  },
};

export const Secondary: Story = {
  render: (props) => (
    <Select
        {...props}
    />
  ),
  name: "No Label",
  args: {
    disabled: false,
    value: "1",
    wrapped: false,
    options: [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
      { value: "3", label: "Option 3" },
    ]
  },
};