import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import BrowserOnly from "@docusaurus/BrowserOnly";
import {
  instanceTemplateFromSpec,
  referenceTemplateFromSpec,
} from "@people_and_robots/open-core";
import { ExternalBlock } from "@people_and_robots/open-vp";
import BrowserOnly from "@docusaurus/BrowserOnly";

export default function BlockViewer({ id, typeSpec, otherTypes = {} }) {
  const instance = instanceTemplateFromSpec(id, typeSpec, false);
  const reference = referenceTemplateFromSpec(id, instance, typeSpec);

  return (
    <Tabs>
      <TabItem value="instance" label="Instance" default>
        <BrowserOnly>
          <ExternalBlock
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
        </BrowserOnly>
      </TabItem>
      <TabItem value="reference" label="Reference">
        <BrowserOnly>
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
        </BrowserOnly>
      </TabItem>
    </Tabs>
  );
}
