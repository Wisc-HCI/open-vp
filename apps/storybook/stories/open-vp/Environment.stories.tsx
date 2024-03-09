import type { Meta, StoryObj } from "@storybook/react";
import { Environment } from "@people_and_robots/open-vp";
import React from "react";
import { flowDrawers, flowTypes } from "../typespecs/flow";
import { imperativeDrawers, imperativeTypes } from "../typespecs/imperative";
import { triggerDrawers, triggerTypes } from "../typespecs/trigger";

const meta: Meta<typeof Environment> = {
  component: Environment,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story, args) => {
      return (
          <div
            style={{
              display:'flex',
              minHeight: args.viewMode === 'docs' ? 400 : '100vh',//"calc(100vh - 55pt)",
              width: "100%",//"calc(100vw - 25pt)"
            }}
          >
          <Story {...args} />
          </div>
      )
    }
  ]
};

export default meta;

type Story = StoryObj<typeof Environment>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  name: "Imperative Programming",
  args: {
    initial: {
      programSpec: {
        objectTypes: imperativeTypes,
        drawers: imperativeDrawers,
      }
    },
    reactflowProOptions: {
      hideAttribution: true
    }
  },
};

export const Secondary: Story = {
  name: "Flow-Based Programming",
  args: {
    initial: {
      programSpec: {
        objectTypes: flowTypes,
        drawers: flowDrawers,
      }
    },
    reactflowProOptions: {
      hideAttribution: true
    }
  },
};

export const Tertiary: Story = {
  name: "SOBORO Programming",
  args: {
    initial: {
      programSpec: {
        objectTypes: triggerTypes,
        drawers: triggerDrawers,
      }
    },
    reactflowProOptions: {
      hideAttribution: true
    }
  },
};

