import type { Meta, StoryObj } from "@storybook/react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Stack,
  Button,
} from "@mui/material";
import { TextInput } from "@people_and_robots/open-gui";
import { FiMoreHorizontal, FiCheck } from "react-icons/fi";
import React from "react";

const meta: Meta<typeof TextInput> = {
  component: TextInput,
  decorators: [
    (Story) => {
      const [mode, setMode] = React.useState<"light" | "dark">("light");

      const muiTheme = createTheme({ palette: { mode } });

      return (
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          <Stack
            direction="column"
            alignItems="center"
            gap={1}
            style={{ backgroundColor: muiTheme.palette.background.paper }}
          >
            <Button
              onClick={() =>
                mode === "light" ? setMode("dark") : setMode("light")
              }
            >
              Toggle Mode
            </Button>
            <div>
              <Story />
            </div>
          </Stack>
        </ThemeProvider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof TextInput>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (props) => <TextInput {...props} />,
  name: "Text Input",
  args: {
    wrapped: false,
    disabled: false,
    defaultValue: "Current Text",
    label: "Gas Price $",
    hideLabelPrefix: false,
    suffix: "/gal",
    extra: <FiCheck />,
  },
};
