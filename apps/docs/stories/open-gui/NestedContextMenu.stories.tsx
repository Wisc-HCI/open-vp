import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider, createTheme, CssBaseline, PaletteMode } from "@mui/material";
import { NestedContextMenu } from "@people_and_robots/open-gui";
import { FiMoreHorizontal, FiStar } from "react-icons/fi";

const meta: Meta<typeof NestedContextMenu> = {
  component: NestedContextMenu,
};

export default meta;

type Story = StoryObj<typeof NestedContextMenu>;

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
    <NestedContextMenu
      {...props}
    />
  ),
  name: "Static Dropdown",
  args: {
    data: { name: 'Red Star', color: "red" },
    children: <div style={{ width: 100, height: 100, backgroundColor: 'lightblue', borderRadius: 3 }} >Left-Click</div>,
    inner: [
      { type: "HEADER", label: "My Label" },
      {
        type: "ENTRY",
        label: "Toggle Mode",
        /* @ts-ignore */
        left: (d: DataType) => <FiStar style={{ color: d.color }} />,
        onClick: () => {
          alert("Clicked Button")
        },
        preventCloseOnClick: true,
      },
      {
        type: "ENTRY",
        right: "⇧+⌘+N",
        /* @ts-ignore */
        label: (d: DataType) => `Piped Name: ${d.name}`,
      },
      { type: "DIVIDER" },
      {
        type: "ENTRY",
        label: "More...",
        inner: [
          { type: "HEADER", label: "Inner Menu" },
          {
            type: "ENTRY",
            right: "⇧+⌘+N",
            /* @ts-ignore */
            label: (d: DataType) => `Piped Name: ${d.name}`,
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