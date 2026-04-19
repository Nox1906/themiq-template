import type { Meta, StoryObj } from "@storybook/react";

import Avatar from "../../DataDisplay/Avatar";
import Typography from "../../DataDisplay/Typography";
import Box from "../../Layout/Box";
import Skeleton from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Design System/Feedback/Skeleton",
  component: Skeleton,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    variant: "rectangular",
    animation: "pulse",
    width: 240,
    height: 80,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["text", "circular", "rectangular", "rounded"],
    },
    animation: {
      control: "select",
      options: ["pulse", "wave", false],
    },
    width: { control: "number" },
    height: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Variants ─────────────────────────────────────────────────────────────────

export const Text: Story = {
  args: { variant: "text", width: 240 },
};

export const Circular: Story = {
  args: { variant: "circular", width: 40, height: 40 },
};

export const Rectangular: Story = {
  args: { variant: "rectangular", width: 240, height: 120 },
};

export const Rounded: Story = {
  args: { variant: "rounded", width: 240, height: 120 },
};

// ─── Animations ───────────────────────────────────────────────────────────────

export const Wave: Story = {
  name: "Animation — wave",
  args: { variant: "rectangular", width: 240, height: 80, animation: "wave" },
};

export const NoAnimation: Story = {
  name: "Animation — none",
  args: { variant: "rectangular", width: 240, height: 80, animation: false },
};

// ─── Card placeholder ─────────────────────────────────────────────────────────

export const CardPlaceholder: Story = {
  name: "Card placeholder",
  parameters: { controls: { disable: true } },
  render: () => (
    <Box sx={{ width: 300 }}>
      <Skeleton variant="rectangular" width={300} height={160} />
      <Box sx={{ pt: 1.5, display: "flex", gap: 1.5 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" />
          <Skeleton variant="text" width="60%" />
        </Box>
      </Box>
    </Box>
  ),
};

// ─── Replacing real content ───────────────────────────────────────────────────

export const InlineWithContent: Story = {
  name: "Inline with real content",
  parameters: { controls: { disable: true } },
  render: () => (
    <Box sx={{ display: "flex", gap: 4, alignItems: "flex-start" }}>
      {/* Loading state */}
      <Box sx={{ display: "flex", gap: 1 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Box>
          <Skeleton variant="text" width={160} />
          <Skeleton variant="text" width={120} />
        </Box>
      </Box>
      {/* Loaded state */}
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Avatar sx={{ bgcolor: "primary.main" }}>J</Avatar>
        <Box>
          <Typography variant="body1">Jane Doe</Typography>
          <Typography variant="body2" color="text.secondary">
            jane@example.com
          </Typography>
        </Box>
      </Box>
    </Box>
  ),
};

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    variant: "rectangular",
    animation: "pulse",
    width: 240,
    height: 120,
  },
};
