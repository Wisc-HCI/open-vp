import type { Meta, StoryObj } from "@storybook/react";
import { IconTextButton, Dialog } from "@people_and_robots/open-gui";
import { FiCheck } from "react-icons/fi";
import { useState } from "react";

const meta: Meta<typeof Dialog> = {
  component: Dialog,
};

export default meta;

type Story = StoryObj<typeof Dialog>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (props) => {
    const [isOpen, setIsOpen] = useState(props.isOpen);
    return (
      <>
        <IconTextButton onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Close' : 'Open'}
        </IconTextButton>
        <Dialog {...props} isOpen={isOpen} onStateChange={(open)=>setIsOpen(open)}/>
      </>
    );
  },
  name: "Fixed Dialog",
  args: {
    isOpen: false,
    onStateChange: (open: boolean) => alert("Dialog State Changed"),
    children: <div style={{padding:5, height: 100}}>Dialog Contents</div>,
    showOverlay: true,
    draggable: false,
    clickableOverlay: true,
  },
};

export const Draggable: Story = {
  render: (props) => {
    const [isOpen, setIsOpen] = useState(props.isOpen);
    return (
      <>
        <IconTextButton onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Close' : 'Open'}
        </IconTextButton>
        <Dialog {...props} isOpen={isOpen} onStateChange={(open)=>setIsOpen(open)}/>
      </>
    );
  },
  name: "Draggable Dialog",
  args: {
    isOpen: false,
    onStateChange: (open: boolean) => alert("Dialog State Changed"),
    children: <div style={{padding:5, height: 100}}>Dialog Contents</div>,
    showOverlay: false,
    draggable: true,
    clickableOverlay: false,
  },
};