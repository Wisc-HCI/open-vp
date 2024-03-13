import { useMemo } from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import BrowserOnly from "@docusaurus/BrowserOnly";
import {
  instanceTemplateFromSpec,
  referenceTemplateFromSpec,
} from "@people_and_robots/open-core";
import { ExternalBlock } from "@people_and_robots/open-vp";
import { createTheme } from "@mui/material";
import { useColorMode } from "@docusaurus/theme-common";

export default function BlockViewer({ id, typeSpec, otherTypes = {} }) {
  const instance = instanceTemplateFromSpec(id, typeSpec, false);
  const reference = referenceTemplateFromSpec(id, instance, typeSpec);
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
    <Tabs>
      <TabItem value="instance" label="Instance" default>
        <BrowserOnly fallback={<div>Loading...</div>}>
          {() => (
            <ExternalBlock
              muiTheme={theme}
              data={instance}
              initial={{
                // executionData: { [instance.id]: (t) => (t % 2000) / 2000 },
                programSpec: {
                  objectTypes: {
                    ...otherTypes,
                    [id]: typeSpec,
                  },
                  drawers: [],
                },
              }}
            />
          )}
        </BrowserOnly>
      </TabItem>
      <TabItem value="reference" label="Reference">
        <BrowserOnly fallback={<div>Loading...</div>}>
          {() => (
            <ExternalBlock
              data={reference}
              initial={{
                // executionData: { [reference.id]: (t) => (t % 2000) / 2000 },
                programSpec: {
                  objectTypes: {
                    ...otherTypes,
                    [id]: typeSpec,
                  },
                  drawers: [],
                },
              }}
            />
          )}
        </BrowserOnly>
      </TabItem>
    </Tabs>
  );
}
