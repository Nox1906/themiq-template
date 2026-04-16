import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@mui/material";

import Tooltip from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Design System/Data Display/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    text: {
      control: "text",
    },
    color: {
      control: "select",
      options: ["neutral", "neutral-dark", "danger", "warning", "success"],
    },
    placement: {
      control: "select",
      options: [
        "top",
        "top-start",
        "top-end",
        "bottom",
        "bottom-start",
        "bottom-end",
        "left",
        "left-start",
        "left-end",
        "right",
        "right-start",
        "right-end",
      ],
    },
    disableInteractive: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default (standalone info icon) ──────────────────────────────────────────

export const Default: Story = {
  args: {
    text: "This is a helpful tooltip.",
  },
};

// ─── Wrapping a custom element ────────────────────────────────────────────────

export const WrappingButton: Story = {
  args: {
    text: "Click to save your changes.",
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="contained">Save</Button>
    </Tooltip>
  ),
};

// ─── Colour intents ───────────────────────────────────────────────────────────

export const Neutral: Story = {
  args: { text: "Neutral information.", color: "neutral" },
};

export const NeutralDark: Story = {
  name: "Neutral Dark",
  args: { text: "Neutral dark tooltip.", color: "neutral-dark" },
};

export const Danger: Story = {
  args: { text: "This action cannot be undone.", color: "danger" },
};

export const Warning: Story = {
  args: { text: "Proceed with caution.", color: "warning" },
};

export const Success: Story = {
  args: { text: "Your changes have been saved.", color: "success" },
};

// ─── Placements ───────────────────────────────────────────────────────────────

export const PlacementBottom: Story = {
  name: "Placement — bottom",
  args: { text: "Tooltip below the anchor.", placement: "bottom" },
};

export const PlacementRight: Story = {
  name: "Placement — right",
  args: { text: "Tooltip to the right.", placement: "right" },
};

export const PlacementLeft: Story = {
  name: "Placement — left",
  args: { text: "Tooltip to the left.", placement: "left" },
};

// ─── Rich content ─────────────────────────────────────────────────────────────

export const RichContent: Story = {
  name: "Rich text content",
  args: {
    text: (
      <span>
        Tooltips support <strong>rich content</strong> via the <code>text</code>{" "}
        prop.
      </span>
    ),
  },
};

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    text: "Fully interactive tooltip — use the controls to experiment.",
    color: "neutral",
    placement: "top",
    disableInteractive: false,
  },
};
