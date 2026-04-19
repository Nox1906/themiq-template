import type { Meta, StoryObj } from "@storybook/react";

import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Design System/Inputs/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      // MUI Button accepts: contained | outlined | text
      options: ["contained", "outlined", "text"],
    },
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "error",
        "warning",
        "info",
        "success",
        "inherit",
      ],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    disabled: {
      control: "boolean",
    },
  },
  args: {
    variant: "contained",
    color: "primary",
    size: "medium",
    disabled: false,
    children: "Button",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Semantic intents ─────────────────────────────────────────────────────────

/** Primary CTA — filled, prominent */
export const Contained: Story = {
  name: "Contained (primary CTA)",
  args: {
    variant: "contained",
    color: "primary",
    children: "Save changes",
  },
};

/** Secondary CTA — bordered, less prominent */
export const Outlined: Story = {
  name: "Outlined (secondary CTA)",
  args: {
    variant: "outlined",
    color: "primary",
    children: "Cancel",
  },
};

/** Ghost / tertiary — no background or border */
export const Text: Story = {
  name: "Text (ghost / tertiary)",
  args: {
    variant: "text",
    color: "primary",
    children: "Learn more",
  },
};

/** Destructive action — error colour */
export const Destructive: Story = {
  args: {
    variant: "contained",
    color: "error",
    children: "Delete",
  },
};

export const DestructiveOutlined: Story = {
  name: "Destructive — outlined",
  args: {
    variant: "outlined",
    color: "error",
    children: "Remove",
  },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const SizeSmall: Story = {
  name: "Size — small",
  args: { variant: "contained", size: "small", children: "Small" },
};

export const SizeMedium: Story = {
  name: "Size — medium",
  args: { variant: "contained", size: "medium", children: "Medium" },
};

export const SizeLarge: Story = {
  name: "Size — large",
  args: { variant: "contained", size: "large", children: "Large" },
};

// ─── States ───────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: {
    variant: "contained",
    children: "Disabled",
    disabled: true,
  },
};

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    variant: "contained",
    color: "primary",
    size: "medium",
    children: "Click me",
    disabled: false,
  },
};
