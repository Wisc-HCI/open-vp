// Replace your-framework with the framework you are using (e.g., react, vue3)
import { Preview, StoryFn } from "@storybook/react";
import { ThemeProvider, createTheme, CssBaseline, styled } from "@mui/material";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { prTheme } from "./manager";
import React from "react";
import { DocsContainer, Canvas } from '@storybook/blocks';
import { ensure } from "@storybook/theming";


const darkBlueTheme = createTheme({
  palette: { mode: "dark", primary: { main: "#4489ea" } },
});
const lightBlueTheme = createTheme({
  palette: { mode: "light", primary: { main: "#4489ea" } },
});
const darkRedTheme = createTheme({
  palette: { mode: "dark", primary: { main: "#ea4444" } },
});
const lightRedTheme = createTheme({
  palette: { mode: "light", primary: { main: "#ea4444" } },
});
const darkGreenTheme = createTheme({
  palette: { mode: "dark", primary: { main: "#44ea44" } },
});
const lightGreenTheme = createTheme({
  palette: { mode: "light", primary: { main: "#44ea44" } },
});
const darkPurpleTheme = createTheme({
  palette: { mode: "dark", primary: { main: "#a444ea" } },
});
const lightPurpleTheme = createTheme({
  palette: { mode: "light", primary: { main: "#a444ea" } },
});

const ThemedCanvas = styled(Canvas)({},({theme})=>({backgroundColor: 'white'}));

const preview: Preview = {
  parameters: {
    backgrounds: { disable: true },
    layout: "centered",
    docs: { 
      toc: true,
      theme: prTheme,
      canvas: ThemedCanvas
    },
  },
  decorators: [
    withThemeFromJSXProvider({
      themes: {
        "light-blue": lightBlueTheme,
        "dark-blue": darkBlueTheme,
        "light-red": lightRedTheme,
        "dark-red": darkRedTheme,
        "light-green": lightGreenTheme,
        "dark-green": darkGreenTheme,
        "light-purple": lightPurpleTheme,
        "dark-purple": darkPurpleTheme,
      },
      defaultTheme: "light-blue",
      Provider: ThemeProvider,
      GlobalStyles: CssBaseline,
    }),
  ]
};

export default preview;
