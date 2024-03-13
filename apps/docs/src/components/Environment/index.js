import { useMemo } from "react";
import { Environment as OriginalEnvironment } from "@people_and_robots/open-vp";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { useColorMode } from "@docusaurus/theme-common";
import { createTheme } from "@mui/material";

export default function Environment(props) {
  const { colorMode } = useColorMode();
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: colorMode === "dark" ? "dark" : "light",
        },
      }),
    [colorMode],
  );
  return (
    <BrowserOnly fallback={<div> Loading...</div>}>
      {() => <OriginalEnvironment muiTheme={theme} {...props} />}
    </BrowserOnly>
  );
}
