import type { Meta, StoryObj } from "@storybook/react";
import { Face } from "@mui/icons-material";

import Chip from "./Chip";

const meta: Meta<typeof Chip> = {
  title: "Design System/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["filled", "outlined"],
    },
    size: {
      control: "select",
      options: ["small", "medium"],
    },
    disabled: {
      control: "boolean",
    },
    clickable: {
      control: "boolean",
    },
    label: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Variants ─────────────────────────────────────────────────────────────────

export const Filled: Story = {
  args: { label: "Filled", variant: "filled" },
};

export const Outlined: Story = {
  args: { label: "Outlined", variant: "outlined" },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const SizeMedium: Story = {
  name: "Size — medium",
  args: { label: "Medium", size: "medium" },
};

export const SizeSmall: Story = {
  name: "Size — small",
  args: { label: "Small", size: "small" },
};

// ─── Interactive ──────────────────────────────────────────────────────────────

export const Clickable: Story = {
  render: (args) => (
    <Chip {...args} label="Clickable" clickable onClick={() => {}} />
  ),
};

export const Deletable: Story = {
  render: (args) => <Chip {...args} label="Deletable" onDelete={() => {}} />,
};

export const ClickableAndDeletable: Story = {
  name: "Clickable + deletable",
  render: (args) => (
    <Chip
      {...args}
      label="Clickable + deletable"
      clickable
      onClick={() => {}}
      onDelete={() => {}}
    />
  ),
};

// ─── With icon ────────────────────────────────────────────────────────────────

export const WithIcon: Story = {
  name: "With icon",
  args: {
    label: "With icon",
    icon: <Face />,
  },
};

// ─── States ───────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: { label: "Disabled", disabled: true },
};

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    label: "Playground",
    variant: "filled",
    size: "medium",
    disabled: false,
    clickable: false,
  },
};
