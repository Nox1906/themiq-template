import type { Meta, StoryObj } from "@storybook/react";

import { MenuItem } from "../../Navigation/Menu";
import { FormControl, FormHelperText, InputLabel } from "../Form";
import Select from "./Select";

const OPTIONS = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "date", label: "Date" },
];

// Select is generic (Value param) so Meta<typeof Select> can't be used directly.
// Declare the args shape explicitly instead.
type SelectArgs = {
  variant?: "outlined" | "filled" | "standard";
  size?: "small" | "medium";
  disabled?: boolean;
  error?: boolean;
  multiple?: boolean;
};

const meta = {
  title: "Design System/Inputs/Select",
  component: Select,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    variant: "outlined",
    size: "medium",
    disabled: false,
    error: false,
    multiple: false,
  },
  argTypes: {
    variant: { control: "select", options: ["outlined", "filled", "standard"] },
    size: { control: "select", options: ["small", "medium"] },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    multiple: { control: "boolean" },
  },
} satisfies Meta<SelectArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Variants ─────────────────────────────────────────────────────────────────

export const Outlined: Story = {
  render: (args) => (
    <FormControl sx={{ minWidth: 220 }}>
      <InputLabel>Fruit</InputLabel>
      <Select {...args} label="Fruit" defaultValue="apple">
        {OPTIONS.map((o) => (
          <MenuItem key={o.value} value={o.value}>
            {o.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ),
};

export const Filled: Story = {
  render: (args) => (
    <FormControl variant="filled" sx={{ minWidth: 220 }}>
      <InputLabel>Fruit</InputLabel>
      <Select {...args} variant="filled" label="Fruit" defaultValue="banana">
        {OPTIONS.map((o) => (
          <MenuItem key={o.value} value={o.value}>
            {o.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ),
};

export const Standard: Story = {
  render: (args) => (
    <FormControl variant="standard" sx={{ minWidth: 220 }}>
      <InputLabel>Fruit</InputLabel>
      <Select {...args} variant="standard" label="Fruit" defaultValue="cherry">
        {OPTIONS.map((o) => (
          <MenuItem key={o.value} value={o.value}>
            {o.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ),
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const SizeSmall: Story = {
  name: "Size — small",
  render: (args) => (
    <FormControl size="small" sx={{ minWidth: 220 }}>
      <InputLabel>Fruit</InputLabel>
      <Select {...args} label="Fruit" size="small" defaultValue="apple">
        {OPTIONS.map((o) => (
          <MenuItem key={o.value} value={o.value}>
            {o.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ),
};

// ─── States ───────────────────────────────────────────────────────────────────

export const WithHelperText: Story = {
  name: "With helper text",
  render: (args) => (
    <FormControl sx={{ minWidth: 220 }}>
      <InputLabel>Fruit</InputLabel>
      <Select {...args} label="Fruit" defaultValue="apple">
        {OPTIONS.map((o) => (
          <MenuItem key={o.value} value={o.value}>
            {o.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Pick your favourite</FormHelperText>
    </FormControl>
  ),
};

export const ErrorState: Story = {
  name: "Error",
  render: (args) => (
    <FormControl error sx={{ minWidth: 220 }}>
      <InputLabel>Fruit</InputLabel>
      <Select {...args} label="Fruit" defaultValue="">
        {OPTIONS.map((o) => (
          <MenuItem key={o.value} value={o.value}>
            {o.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Required field</FormHelperText>
    </FormControl>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <FormControl disabled sx={{ minWidth: 220 }}>
      <InputLabel>Fruit</InputLabel>
      <Select {...args} label="Fruit" defaultValue="apple">
        {OPTIONS.map((o) => (
          <MenuItem key={o.value} value={o.value}>
            {o.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ),
};

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => (
    <FormControl sx={{ minWidth: 220 }}>
      <InputLabel>Fruit</InputLabel>
      <Select {...args} label="Fruit" defaultValue="apple">
        {OPTIONS.map((o) => (
          <MenuItem key={o.value} value={o.value}>
            {o.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ),
  args: {
    variant: "outlined",
    size: "medium",
    disabled: false,
    error: false,
  },
};
