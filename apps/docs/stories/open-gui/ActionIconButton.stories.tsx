import type { Meta, StoryObj } from "@storybook/react";
import { ActionIconButton, type IconName } from "@people_and_robots/open-gui";
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
  name: "Add Button",
  args: {
    title: "Button Title",
    onClick: () => alert("Button Was Clicked"),
    disabled: false,
    placement: 'bottom',
    toggled: false,
    canToggle: false,
    size: 'small',
    icon: "CheckRounded" as IconName
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
    icon: "CheckRounded"
  },
};
