import type { Meta, StoryObj } from "@storybook/react";

import Box from "../../Layout/Box";
import Chip from "../Chip";
import Typography from "../Typography";
import Divider from "./Divider";

const meta: Meta<typeof Divider> = {
  title: "Design System/Data Display/Divider",
  component: Divider,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    orientation: "horizontal",
    variant: "fullWidth",
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    variant: {
      control: "select",
      options: ["fullWidth", "inset", "middle"],
    },
    textAlign: {
      control: "select",
      options: ["center", "left", "right"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Horizontal (default) ─────────────────────────────────────────────────────

export const Horizontal: Story = {
  render: (args) => (
    <Box sx={{ width: 400 }}>
      <Typography>Content above</Typography>
      <Divider {...args} />
      <Typography>Content below</Typography>
    </Box>
  ),
};

// ─── Vertical ─────────────────────────────────────────────────────────────────

export const Vertical: Story = {
  render: (args) => (
    <Box sx={{ display: "flex", alignItems: "center", height: 40, gap: 2 }}>
      <Typography>Left</Typography>
      <Divider {...args} orientation="vertical" flexItem />
      <Typography>Right</Typography>
    </Box>
  ),
};

// ─── With text ────────────────────────────────────────────────────────────────

export const WithText: Story = {
  name: "With text",
  render: (args) => (
    <Box sx={{ width: 400 }}>
      <Divider {...args}>OR</Divider>
    </Box>
  ),
};

// ─── With chip ────────────────────────────────────────────────────────────────

export const WithChip: Story = {
  name: "With chip",
  render: (args) => (
    <Box sx={{ width: 400 }}>
      <Divider {...args}>
        <Chip label="Section" size="small" />
      </Divider>
    </Box>
  ),
};

// ─── Inset ────────────────────────────────────────────────────────────────────

export const Inset: Story = {
  render: (args) => (
    <Box sx={{ width: 400 }}>
      <Typography sx={{ pl: "72px" }}>List item with avatar</Typography>
      <Divider {...args} variant="inset" />
      <Typography sx={{ pl: "72px" }}>Another list item</Typography>
    </Box>
  ),
};
