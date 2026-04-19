import type { Meta, StoryObj } from "@storybook/react";

import { AlertTitle } from "./";
import Alert from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Design System/Feedback/Alert",
  component: Alert,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    severity: "info",
    variant: "standard",
    children: "This is an informational message.",
  },
  argTypes: {
    severity: {
      control: "select",
      options: ["error", "warning", "info", "success"],
    },
    variant: {
      control: "select",
      options: ["filled", "outlined", "standard"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Severities ───────────────────────────────────────────────────────────────

export const Info: Story = {
  args: { severity: "info", children: "This is an informational message." },
};

export const Success: Story = {
  args: {
    severity: "success",
    children: "Your changes were saved successfully.",
  },
};

export const Warning: Story = {
  args: { severity: "warning", children: "Your session expires in 5 minutes." },
};

export const Error: Story = {
  args: {
    severity: "error",
    children: "Something went wrong. Please try again.",
  },
};

// ─── Variants ─────────────────────────────────────────────────────────────────

export const Filled: Story = {
  args: { severity: "info", variant: "filled", children: "Filled alert." },
};

export const Outlined: Story = {
  args: { severity: "info", variant: "outlined", children: "Outlined alert." },
};

// ─── With title ───────────────────────────────────────────────────────────────

export const WithTitle: Story = {
  name: "With title",
  args: {
    severity: "success",
    children: (
      <>
        <AlertTitle>Upload complete</AlertTitle>
        Your file was uploaded successfully.
      </>
    ),
  },
};

// ─── Dismissible ──────────────────────────────────────────────────────────────

export const Dismissible: Story = {
  render: (args) => <Alert {...args} onClose={() => {}} />,
  args: {
    severity: "warning",
    children: "Close me using the × button.",
  },
};

// ─── All severities ───────────────────────────────────────────────────────────

export const AllSeverities: Story = {
  name: "All severities",
  parameters: { controls: { disable: true } },
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 8, width: 400 }}
    >
      <Alert severity="info">Info message.</Alert>
      <Alert severity="success">Success message.</Alert>
      <Alert severity="warning">Warning message.</Alert>
      <Alert severity="error">Error message.</Alert>
    </div>
  ),
};

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    severity: "info",
    variant: "standard",
    children: "Playground alert message.",
  },
};
