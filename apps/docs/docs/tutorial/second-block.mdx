---
sidebar_position: 6
---

import BlockViewer from "@site/src/components/BlockViewer";

# Second Block

Now that we have one block, let's create another that can be used in conjunction with the first. Specifically, we will create a simple block that can be dragged into the first block.

## A Block Property

Here is a block with a single property:

```js
import { PrimitiveType } from "@people_and_robots/open-core";

{
  // The key is the id of the block type
  textType: {
    // This is the name of the block that gets displayed to the user
    name: "Text Block",
    // This is the overall type of the block
    // There are two main categories: "OBJECT" and "FUNCTION"
    // For convenience, these labels are exported from
    // @people_and_robots/open-core
    primitiveType: PrimitiveType.Object, // "OBJECT"
    // This is a markdown-flavored description of the block.
    // This gets rendered in the block's documentation,
    // alongside the auto-generated documentation.
    description: "# Markdown-Flavored Description String",
    // Since this block is an "OBJECT", you will need to define
    // two sub-blocks: "instanceBlock" and "referenceBlock".
    // The "instanceBlock" is the block that gets renders the
    // block's instance or literal.
    instanceBlock: {
      // Whether the block is rendered on the canvas.
      // Otherwise, it must be dragged into another block.
      onCanvas: false,
      // The background color of the block.
      color: "#629e6c",
      // The icon that gets displayed on the block.
      // By default these icons are those used by
      // @mui/icons-material.
      icon: "SquareRounded",
      // The "extras are elements that get rendered in the top-right
      // corner of the block, or accessible from a left-click/context
      // menu. These are typically used to display menus and other
      // interactive elements, or to display additional information.
      extras: [],
      // Render the block in a more compact form.
      minified: true
    },
    // The "referenceBlock" is the block that gets rendered when
    // the a block is rendered to reference an instance block.
    // These follow the same conventions as the "instanceBlock".
    referenceBlock: {
      onCanvas: true,
      color: "#629e6c",
      icon: "SquareRounded",
      extras: [],
      // Render the block in a more compact form.
      minified: true
    },
    // Key-value pairs of property descriptions for the block. We'll
    // cover this in more detail in the later sections.
    properties: {
      text: {
        id: "text",
        // This specifies that the field is a string
        type: PropertyType.String, // "STRING"
        // This is the name of the property that gets displayed to the user.
        name: "Text",
        // We default to "Hello World!"
        default: "Hello World!"
      },
    }
  }
}
```

<BlockViewer id="textType" typeSpec={{
  name: "Text Block",
  primitiveType: "OBJECT",
  description: "# Markdown-Flavored Description String",
  instanceBlock: {
    onCanvas: false,
    color: "#629e6c",
    icon: "SquareRounded",
    extras: [],
    minified: true
  },
  referenceBlock: {
    onCanvas: true,
    color: "#629e6c",
    icon: "SquareRounded",
    extras: [],
    minified: true
  },
  properties: {
    text: {
      id: "text",
      type: "STRING",
      name: "Text",
      default: "Hello World!"
    },
  }
}}/>

## Accepting the Block Prop

Now that we have the block, let's update the previous block to accept the `textType` block as a valid entry in its `myProperty` field.

```js
{
  simpleType: {
    name: "Simple Block",
    primitiveType: "OBJECT",
    description: "# Markdown-Flavored Description String",
    instanceBlock: {
      onCanvas: true,
      color: "#3f3f3f",
      icon: "SquareRounded",
      extras: [],
    },
    referenceBlock: {
      onCanvas: true,
      color: "#3f3f3f",
      icon: "SquareRounded",
      extras: [],
    },
    properties: {
      myProperty: {
        id: "myProperty",
        type: "BLOCK",
        name: "My Property",
        // highlight-next-line
        accepts: ["textType"],
        default: null
        isList: false,
        fullWidth: false
      },
      myNumericalProperty: {
        id: "myNumericalProperty",
        type: "NUMBER",
        name: "My Number",
        default: 10,
        min: 0,
        max: 100,
        step: 1,
        units: "m/s",
      },
    },
  }
}
```

<BlockViewer id="simpleType" typeSpec={{
  name: "Simple Block",
  primitiveType: "OBJECT",
  description: "# Markdown-Flavored Description String",
  instanceBlock: {
    onCanvas: true,
    color: "#3f3f3f",
    icon: "SquareRounded",
    extras: [],
  },
  referenceBlock: {
    onCanvas: true,
    color: "#3f3f3f",
    icon: "SquareRounded",
    extras: [],
  },
  properties: {
    myProperty: {
      id: "myProperty",
      type: "BLOCK",
      name: "My Property",
      accepts: ["textType"],
      default: null,
      isList: false,
      fullWidth: false
    },
    myNumericalProperty: {
      id: "myNumericalProperty",
      type: "NUMBER",
      name: "My Number",
      default: 10,
      min: 0,
      max: 100,
      step: 1,
      units: "m/s",
    },
  },
}}
otherTypes={{
textType: {
  name: "Text Block",
  primitiveType: "OBJECT",
  description: "# Markdown-Flavored Description String",
  instanceBlock: {
    onCanvas: false,
    color: "#629e6c",
    icon: "SquareRounded",
    extras: [],
    minified: true
  },
  referenceBlock: {
    onCanvas: true,
    color: "#629e6c",
    icon: "SquareRounded",
    extras: [],
    minified: true
  },
  properties: {
    text: {
      id: "text",
      type: "STRING",
      name: "Text",
      default: "Hello World!"
    },
  }
}
}}
/>

While this display doesn't support dragging blocks into other blocks, you can see that the `myProperty` field now accepts the `textType` block by hovering the field.
