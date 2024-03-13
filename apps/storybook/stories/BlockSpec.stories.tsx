import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  instanceTemplateFromSpec,
  ParserProps,
  referenceTemplateFromSpec,
  PrimitiveType,
  ExtraType,
  PropertyType,
  MetaType,
  ConnectionDirection,
  type TypeSpec,
} from "@people_and_robots/open-core";
import { ExternalBlock } from "@people_and_robots/open-vp";
import { Card, CardContent, CardHeader, Container, Stack } from "@mui/material";
import { flowTypes } from "./typespecs/flow";
import { imperativeTypes } from "./typespecs/imperative";

const BlockRenderer = (typeSpec: TypeSpec & { id: string }) => {
  const instance = instanceTemplateFromSpec(typeSpec.id, typeSpec, false);
  const reference = referenceTemplateFromSpec(typeSpec.id, instance, typeSpec);

  return (
    <Container>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Card>
          <CardHeader title="Instance" />
          <CardContent>
            <ExternalBlock
              data={instance}
              initial={{
                executionData: { [instance.id]: (t) => (t % 2000) / 2000 },
                programSpec: {
                  objectTypes: {
                    ...flowTypes,
                    ...imperativeTypes,
                    [typeSpec.id]: typeSpec,
                  },
                  drawers: [],
                },
              }}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Instance" />
          <CardContent>
            <ExternalBlock
              data={reference}
              initial={{
                executionData: { [reference.id]: (t) => (t % 2000) / 2000 },
                programSpec: {
                  objectTypes: {
                    ...flowTypes,
                    ...imperativeTypes,
                    [typeSpec.id]: typeSpec,
                  },
                  drawers: [],
                },
              }}
            />
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
};

const meta: Meta<typeof BlockRenderer> = {
  component: BlockRenderer,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story, args) => {
      return (
        <div
          style={{
            display: "flex",
            minHeight: args.viewMode === "docs" ? 400 : "100vh", //"calc(100vh - 55pt)",
            width: "100%", //"calc(100vw - 25pt)"
          }}
        >
          <Story {...args} />
        </div>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof BlockRenderer>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const ObjectExample: Story = {
  name: "Object Block",
  args: {
    id: "blockType",
    name: "Block",
    primitiveType: PrimitiveType.Object,
    description: `# A Block
The **Block** is a block. It can be included in a [Program](programType) as a *child*.
\`\`\`javascript
if (true) {
  // Execute Contents
}
\`\`\`
    `,
    instanceBlock: {
      onCanvas: false,
      color: "#707070",
      icon: "CheckBoxRounded",
      extras: [ExtraType.CollapseToggle, ExtraType.DocToggle],
    },
    referenceBlock: {
      onCanvas: false,
      color: "#707070",
      icon: "CheckBoxRounded",
      extras: [ExtraType.DeleteButton],
    },
    properties: {
      children: {
        id: "children",
        type: PropertyType.Block,
        name: "Children",
        accepts: ["operationType", "functionType", "blockType"],
        default: [],
        isList: true,
        fullWidth: true,
      },
    },
    parsers: {
      javascript: ({ block, depth, context, storeParser }: ParserProps) => {
        if (block.metaType !== MetaType.ObjectInstance) return "error";
        return `{\n${block.properties.children
          .map((a: string) => storeParser("javascript", a, depth + 1, context))
          .join(";\n")};\n};\n\n`;
      },
    },
    namePolicy: {
      javascript: (block) => {
        return block.name.replace(" ", "");
      },
    },
  },
};

export const FlowExample: Story = {
  name: "Flow-Based Programming",
  args: {
    id: "stateType",
    name: "State",
    primitiveType: PrimitiveType.Object,
    description: `# The State
Each State is a collection of attributes, which can be dragged into the State. These attributes include [Face Expression](expressionType) and [Hand Gesture](gestureType).
    `,
    instanceBlock: {
      onCanvas: true,
      color: "#3f5f8f",
      icon: "CheckBoxOutlineBlankRounded",
      connections: {
        bottom: {
          allowed: ["stateType"],
          direction: ConnectionDirection.Outbound,
        },
        top: {
          allowed: ["stateType"],
          direction: ConnectionDirection.Inbound,
        },
      },
      extras: [
        {
          type: ExtraType.Dropdown,
          label: "More",
          contents: [
            ExtraType.CollapseToggle,
            ExtraType.SelectionToggle,
            ExtraType.DeleteButton,
            ExtraType.DocToggle,
            {
              type: ExtraType.Dropdown,
              label: "More",
              contents: [
                ExtraType.CollapseToggle,
                ExtraType.SelectionToggle,
                ExtraType.DeleteButton,
                ExtraType.DocToggle,
              ],
            },
          ],
        },
      ],
    },
    referenceBlock: {
      onCanvas: false,
      color: "#3f5f8f",
      icon: "CheckBoxOutlineBlankRounded",
      extras: [],
    },
    properties: {
      children: {
        id: "children",
        type: PropertyType.Block,
        name: "Children",
        accepts: ["expressionType", "gestureType"],
        default: [],
        isList: true,
        fullWidth: true,
      },
    },
    parsers: {
      javascript: ({
        block,
        name,
        depth,
        context,
        storeParser,
      }: ParserProps) => {
        if (block.metaType !== MetaType.FunctionDeclaration) return "error";
        return `function ${name}() {\n${block.properties.children
          .map((a: string) => storeParser("javascript", a, depth + 1, context))
          .join(";\n")};\n};\n\n`;
      },
    },
    namePolicy: {
      javascript: (block) => {
        return block.name.replace(" ", "");
      },
    },
  },
};
