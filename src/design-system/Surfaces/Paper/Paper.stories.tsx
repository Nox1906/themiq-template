import type { Meta, StoryObj } from "@storybook/react";

import Typography from "../../DataDisplay/Typography";
import Paper from "./Paper";

const meta: Meta<typeof Paper> = {
  title: "Design System/Surfaces/Paper",
  component: Paper,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    elevation: {
      control: { type: "number", min: 0, max: 24, step: 1 },
    },
    variant: {
      control: "select",
      options: ["elevation", "outlined"],
    },
    square: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Elevation scale ──────────────────────────────────────────────────────────

export const Elevation0: Story = {
  name: "Elevation 0 (flat)",
  args: {
    elevation: 0,
    sx: { p: 3, width: 200 },
    children: <Typography>elevation 0</Typography>,
  },
};

export const Elevation2: Story = {
  name: "Elevation 2 (default)",
  args: {
    elevation: 2,
    sx: { p: 3, width: 200 },
    children: <Typography>elevation 2</Typography>,
  },
};

export const Elevation8: Story = {
  name: "Elevation 8",
  args: {
    elevation: 8,
    sx: { p: 3, width: 200 },
    children: <Typography>elevation 8</Typography>,
  },
};

// ─── Outlined variant ─────────────────────────────────────────────────────────

export const Outlined: Story = {
  args: {
    variant: "outlined",
    sx: { p: 3, width: 200 },
    children: <Typography>outlined</Typography>,
  },
};

// ─── Square ───────────────────────────────────────────────────────────────────

export const Square: Story = {
  args: {
    square: true,
    elevation: 2,
    sx: { p: 3, width: 200 },
    children: <Typography>square (no border-radius)</Typography>,
  },
};

// ─── Semantic element ─────────────────────────────────────────────────────────

export const SemanticElement: Story = {
  name: "Semantic element (component prop)",
  args: {
    component: "section",
    elevation: 2,
    sx: { p: 3, width: 200 },
    children: <Typography>renders as &lt;section&gt;</Typography>,
  },
};
