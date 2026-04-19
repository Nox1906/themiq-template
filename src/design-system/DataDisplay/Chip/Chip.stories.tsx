import type { Meta, StoryObj } from "@storybook/react";

import Box from "../../Layout/Box";
import Icon from "../Icon";
import Chip from "./Chip";

const meta: Meta<typeof Chip> = {
  title: "Design System/Data Display/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    label: "Chip",
    variant: "filled",
    color: "primary",
    size: "medium",
    disabled: false,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["filled", "outlined"],
    },
    color: {
      control: "select",
      // MUI Chip color values — drives the MuiChip-color* class that our
      // styles target with &.MuiChip-colorPrimary etc.
      options: [
        "default",
        "primary",
        "secondary",
        "error",
        "warning",
        "success",
        "info",
      ],
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

// ─── Variants × default color ─────────────────────────────────────────────────

export const FilledDefault: Story = {
  name: "Filled — default",
  args: { label: "Default", variant: "filled" },
};

export const OutlinedDefault: Story = {
  name: "Outlined — default",
  args: { label: "Default", variant: "outlined" },
};

// ─── Primary color ────────────────────────────────────────────────────────────

export const FilledPrimary: Story = {
  name: "Filled — primary",
  args: { label: "Primary", variant: "filled", color: "primary" },
};

export const OutlinedPrimary: Story = {
  name: "Outlined — primary",
  args: { label: "Primary", variant: "outlined", color: "primary" },
};

// ─── Semantic colors ──────────────────────────────────────────────────────────

export const AllColors: Story = {
  name: "All colors — filled",
  parameters: { controls: { disable: true } },
  render: () => (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      <Chip label="Default" variant="filled" />
      <Chip label="Primary" variant="filled" color="primary" />
      <Chip label="Secondary" variant="filled" color="secondary" />
      <Chip label="Success" variant="filled" color="success" />
      <Chip label="Warning" variant="filled" color="warning" />
      <Chip label="Error" variant="filled" color="error" />
    </Box>
  ),
};

export const AllColorsOutlined: Story = {
  name: "All colors — outlined",
  parameters: { controls: { disable: true } },
  render: () => (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      <Chip label="Default" variant="outlined" />
      <Chip label="Primary" variant="outlined" color="primary" />
      <Chip label="Secondary" variant="outlined" color="secondary" />
      <Chip label="Success" variant="outlined" color="success" />
      <Chip label="Warning" variant="outlined" color="warning" />
      <Chip label="Error" variant="outlined" color="error" />
    </Box>
  ),
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const SizeMedium: Story = {
  name: "Size — medium",
  args: { label: "Medium", size: "medium", color: "primary" },
};

export const SizeSmall: Story = {
  name: "Size — small",
  args: { label: "Small", size: "small", color: "primary" },
};

// ─── Interactive ──────────────────────────────────────────────────────────────

export const Clickable: Story = {
  render: (args) => (
    <Chip
      {...args}
      label="Clickable"
      color="primary"
      clickable
      onClick={() => {}}
    />
  ),
};

export const Deletable: Story = {
  render: (args) => (
    <Chip {...args} label="Deletable" color="primary" onDelete={() => {}} />
  ),
};

// ─── With icon ────────────────────────────────────────────────────────────────

export const WithIcon: Story = {
  name: "With icon",
  args: {
    label: "Tag",
    color: "primary",
    icon: <Icon name="LocalOffer" />,
  },
};

// ─── States ───────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: { label: "Disabled", color: "primary", disabled: true },
};

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    label: "Playground",
    variant: "filled",
    color: "primary",
    size: "medium",
    disabled: false,
  },
};
