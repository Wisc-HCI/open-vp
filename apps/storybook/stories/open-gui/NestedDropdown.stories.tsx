import type { Meta, StoryObj } from "@storybook/react";
import { NestedDropdown } from "@people_and_robots/open-gui";
import type { IconName } from "@people_and_robots/open-gui";

const meta: Meta<typeof NestedDropdown> = {
  component: NestedDropdown,
};

export default meta;

type Story = StoryObj<typeof NestedDropdown>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
interface DataType {
  name: string;
  color: string;
}

export const Primary: Story = {
  render: (props) => (
    <NestedDropdown
      {...props}
    />
  ),
  name: "Static Dropdown",
  args: {
    data: { name: 'Red Star', color: "red" },
    label: "Dropdown",
    icon: "MoreHorizRounded" as IconName,
    inner: [
      { type: "HEADER", label: "My Label" },
      {
        type: "ENTRY",
        label: "Toggle Mode",
        /* @ts-ignore */
        left: (data: DataType) => "StarRounded", // eslint-disable-line no-eval
        onClick: () => {
          alert("Clicked Button")
        },
        preventCloseOnClick: true,
      },
      {
        type: "ENTRY",
        /* @ts-ignore */
        label: (data: DataType) => `Piped Name: ${data.name}`, // eslint-disable-line no-eval
      },
      { type: "DIVIDER" },
      {
        type: "ENTRY",
        label: "More...",
        inner: [
          { type: "HEADER", label: "Inner Menu" },
          {
            type: "ENTRY",
            right: "StarRounded",
            /* @ts-ignore */
            label: (data: DataType) => `Piped Name: ${data.name}`, // eslint-disable-line no-eval
          },
        ],
      },
    ]
  },
};

// export const Secondary: Story = {
//   render: (props) => (
//     <NestedDropdown
//       {...props}
//     />
//   ),
//   name: "Static Dropdown",
//   args: {
//     data: { name: 'Hat', color: "Red"},
//     label?: string | ((data: T) => string);
//     icon?: ReactNode | ((data: T) => ReactNode);
//     onClick?: (data: T) => void;
//     inner: DropdownData<T>[];
//   },
// };