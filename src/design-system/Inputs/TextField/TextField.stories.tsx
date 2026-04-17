import type { Meta, StoryObj } from "@storybook/react";

import TextField from "./TextField";

const meta: Meta<typeof TextField> = {
  title: "Design System/Inputs/TextField",
  component: TextField,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["outlined", "filled", "standard"] },
    size: { control: "select", options: ["small", "medium"] },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    fullWidth: { control: "boolean" },
    multiline: { control: "boolean" },
    label: { control: "text" },
    placeholder: { control: "text" },
    helperText: { control: "text" },
    color: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Variants ─────────────────────────────────────────────────────────────────

export const Outlined: Story = {
  args: { label: "Outlined", variant: "outlined" },
};

export const Filled: Story = {
  args: { label: "Filled", variant: "filled" },
};

export const Standard: Story = {
  args: { label: "Standard", variant: "standard" },
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

// ─── States ───────────────────────────────────────────────────────────────────

export const WithHelperText: Story = {
  name: "With helper text",
  args: { label: "Username", helperText: "Must be at least 3 characters" },
};

export const ErrorState: Story = {
  name: "Error",
  args: { label: "Email", error: true, helperText: "Invalid email address" },
};

export const Disabled: Story = {
  args: { label: "Disabled", disabled: true, defaultValue: "Cannot edit" },
};

// ─── Multiline ────────────────────────────────────────────────────────────────

export const Multiline: Story = {
  args: { label: "Description", multiline: true, rows: 4 },
};

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    label: "Playground",
    variant: "outlined",
    size: "medium",
    disabled: false,
    error: false,
    helperText: "",
    placeholder: "Type something...",
  },
};
