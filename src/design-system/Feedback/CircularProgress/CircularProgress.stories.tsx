import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import Typography from "../../DataDisplay/Typography";
import Box from "../../Layout/Box";
import CircularProgress from "./CircularProgress";

const meta: Meta<typeof CircularProgress> = {
  title: "Design System/Feedback/CircularProgress",
  component: CircularProgress,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    variant: "indeterminate",
    color: "primary",
    size: 40,
    thickness: 3.6,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["indeterminate", "determinate"],
    },
    size: { control: "number" },
    thickness: { control: "number" },
    value: { control: { type: "range", min: 0, max: 100 } },
    color: {
      control: "select",
      options: [
        "inherit",
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

// ─── Variants ─────────────────────────────────────────────────────────────────

export const Indeterminate: Story = {
  args: { variant: "indeterminate" },
};

export const Determinate: Story = {
  args: { variant: "determinate", value: 70 },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: "Sizes",
  parameters: { controls: { disable: true } },
  render: () => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
      <CircularProgress size={24} />
      <CircularProgress size={40} />
      <CircularProgress size={60} />
      <CircularProgress size={80} />
    </Box>
  ),
};

// ─── Colors ───────────────────────────────────────────────────────────────────

export const Colors: Story = {
  name: "Colors",
  parameters: { controls: { disable: true } },
  render: () => (
    <Box sx={{ display: "flex", gap: 2 }}>
      <CircularProgress color="primary" />
      <CircularProgress color="secondary" />
      <CircularProgress color="success" />
      <CircularProgress color="warning" />
      <CircularProgress color="error" />
      <CircularProgress color="info" />
    </Box>
  ),
};

// ─── With label ───────────────────────────────────────────────────────────────

export const WithLabel: Story = {
  name: "Determinate with label",
  parameters: { controls: { disable: true } },
  render: () => {
    const [progress, setProgress] = React.useState(25);

    React.useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 5));
      }, 400);
      return () => clearInterval(timer);
    }, []);

    return (
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress variant="determinate" value={progress} size={64} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {`${Math.round(progress)}%`}
          </Typography>
        </Box>
      </Box>
    );
  },
};

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    variant: "indeterminate",
    size: 40,
    thickness: 3.6,
    color: "primary",
  },
};
