import type { Meta, StoryObj } from "@storybook/react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
} from "@mui/material";

import Radio from "./Radio";

const meta: Meta<typeof Radio> = {
  title: "Design System/Inputs/Radio",
  component: Radio,
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

export const Unchecked: Story = {
  args: {},
};

export const Checked: Story = {
  args: { checked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  name: "Disabled — checked",
  args: { checked: true, disabled: true },
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

// ─── In group ─────────────────────────────────────────────────────────────────

export const InGroup: Story = {
  name: "In group",
  parameters: { controls: { disable: true } },
  render: () => (
    <FormControl>
      <FormLabel>Priority</FormLabel>
      <RadioGroup defaultValue="medium">
        <FormControlLabel value="low" control={<Radio />} label="Low" />
        <FormControlLabel value="medium" control={<Radio />} label="Medium" />
        <FormControlLabel value="high" control={<Radio />} label="High" />
      </RadioGroup>
    </FormControl>
  ),
};

export const InGroupRow: Story = {
  name: "In group — row",
  parameters: { controls: { disable: true } },
  render: () => (
    <FormControl>
      <FormLabel>Size</FormLabel>
      <RadioGroup defaultValue="m" row>
        <FormControlLabel value="s" control={<Radio />} label="S" />
        <FormControlLabel value="m" control={<Radio />} label="M" />
        <FormControlLabel value="l" control={<Radio />} label="L" />
        <FormControlLabel value="xl" control={<Radio />} label="XL" />
      </RadioGroup>
    </FormControl>
  ),
};

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    disabled: false,
    size: "medium",
  },
};
