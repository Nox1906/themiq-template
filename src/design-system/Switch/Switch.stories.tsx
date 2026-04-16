import type { Meta, StoryObj } from "@storybook/react";
import { FormControlLabel } from "@mui/material";

import Switch from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Design System/Inputs/Switch",
  component: Switch,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    size: { control: "select", options: ["small", "medium"] },
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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── States ───────────────────────────────────────────────────────────────────

export const Off: Story = {
  args: {},
};

export const On: Story = {
  args: { defaultChecked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledOn: Story = {
  name: "Disabled — on",
  args: { defaultChecked: true, disabled: true },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const SizeMedium: Story = {
  name: "Size — medium",
  args: { size: "medium" },
};

export const SizeSmall: Story = {
  name: "Size — small",
  args: { size: "small" },
};

// ─── With label ───────────────────────────────────────────────────────────────

export const WithLabel: Story = {
  name: "With label",
  render: (args) => (
    <FormControlLabel
      control={<Switch {...args} />}
      label="Enable notifications"
    />
  ),
};

export const WithLabelOn: Story = {
  name: "With label — on",
  render: (args) => (
    <FormControlLabel
      control={<Switch {...args} defaultChecked />}
      label="Dark mode"
    />
  ),
};

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    disabled: false,
    size: "medium",
  },
};
