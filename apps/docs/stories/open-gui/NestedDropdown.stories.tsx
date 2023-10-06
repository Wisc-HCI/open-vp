import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { NestedDropdown } from "@people_and_robots/open-gui";
import { FiMoreHorizontal, FiStar } from "react-icons/fi";

const meta: Meta<typeof NestedDropdown> = {
  component: NestedDropdown,
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
    icon: <FiMoreHorizontal />,
    inner: [
      { type: "HEADER", label: "My Label" },
      {
        type: "ENTRY",
        label: "Toggle Mode",
        left: (d: DataType) =>
          <FiStar style={{ color: d.color }} />,
        onClick: () => {
          alert("Clicked Button")
        },
        preventCloseOnClick: true,
      },
      {
        type: "ENTRY",
        right: "⇧+⌘+N",
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