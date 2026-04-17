import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "../../Inputs/Button";

import Badge from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Design System/Data Display/Badge",
  component: Badge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: [
        "default",
        "primary",
        "secondary",
        "error",
        "info",
        "success",
        "warning",
      ],
    },
    variant: {
      control: "select",
      options: ["standard", "dot"],
    },
    overlap: {
      control: "select",
      options: ["rectangular", "circular"],
    },
    anchorOrigin: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Numeric ──────────────────────────────────────────────────────────────────

export const Numeric: Story = {
  args: {
    badgeContent: 4,
    color: "primary",
    children: <IconButton name="Mail" />,
  },
};

// ─── Dot ──────────────────────────────────────────────────────────────────────

export const Dot: Story = {
  args: {
    variant: "dot",
    color: "error",
    children: <IconButton name="Notifications" />,
  },
};

// ─── Max value ────────────────────────────────────────────────────────────────

export const MaxValue: Story = {
  name: "Max value",
  args: {
    badgeContent: 1000,
    max: 999,
    color: "secondary",
    children: <IconButton name="ShoppingCart" />,
  },
};

// ─── Colours ──────────────────────────────────────────────────────────────────

export const Error: Story = {
  args: {
    badgeContent: 2,
    color: "error",
    children: <IconButton name="Mail" />,
  },
};

export const Success: Story = {
  args: {
    badgeContent: 3,
    color: "success",
    children: <IconButton name="Mail" />,
  },
};

// ─── Invisible (zero) ─────────────────────────────────────────────────────────

export const Zero: Story = {
  name: "Zero (showZero)",
  args: {
    badgeContent: 0,
    showZero: true,
    color: "primary",
    children: <IconButton name="Mail" />,
  },
};
