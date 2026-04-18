import type { Meta, StoryObj } from "@storybook/react";

import { FormControlLabel } from "../Form";
import Checkbox from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Design System/Inputs/Checkbox",
  component: Checkbox,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    indeterminate: { control: "boolean" },
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

export const Unchecked: Story = {
  args: {},
};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Indeterminate: Story = {
  args: { indeterminate: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  name: "Disabled — checked",
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
    <FormControlLabel control={<Checkbox {...args} />} label="Accept terms" />
  ),
};

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    disabled: false,
    indeterminate: false,
    size: "medium",
  },
};
