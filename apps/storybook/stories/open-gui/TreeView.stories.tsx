import type { Meta, StoryObj } from "@storybook/react";
import { TreeView } from "@people_and_robots/open-gui";

const meta: Meta<typeof TreeView> = {
  component: TreeView
};

export default meta;

type Story = StoryObj<typeof TreeView>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Treee: Story = {
  name: "Tree View",
  args: {
    data: {
        arbitraryKey: "arbitraryValue",
        hatCount: 4,
        lilac: false,
        nestedData: {
          evenDeeper: {
            a: 1,
            b: 2,
            c: 3,
          },
          valueArray: [
            "a",
            "b",
            "c"
          ]
        }
    },
    enclose: false
  },
};