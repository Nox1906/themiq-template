import type { Meta, StoryObj } from "@storybook/react";

import Icon from "../../DataDisplay/Icon";
import IconButton from "./IconButton";

const meta: Meta<typeof IconButton> = {
  title: "Design System/Inputs/IconButton",
  component: IconButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: [
        "default",
        "inherit",
        "primary",
        "secondary",
        "error",
        "info",
        "success",
        "warning",
      ],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    iconSize: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl"],
    },
    disabled: { control: "boolean" },
    edge: {
      control: "select",
      options: [false, "start", "end"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── By name ──────────────────────────────────────────────────────────────────

export const ByName: Story = {
  name: "By name (recommended)",
  args: { name: "Delete", "aria-label": "Delete" },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Small: Story = {
  args: { name: "Edit", size: "small", "aria-label": "Edit" },
};

export const Medium: Story = {
  args: { name: "Edit", size: "medium", "aria-label": "Edit" },
};

export const Large: Story = {
  args: { name: "Edit", size: "large", "aria-label": "Edit" },
};

// ─── Colours ──────────────────────────────────────────────────────────────────

export const Primary: Story = {
  args: { name: "Star", color: "primary", "aria-label": "Favourite" },
};

export const Error: Story = {
  args: { name: "Delete", color: "error", "aria-label": "Delete" },
};

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: { name: "Delete", disabled: true, "aria-label": "Delete" },
};

// ─── With explicit children ───────────────────────────────────────────────────

export const WithChildren: Story = {
  name: "With children (manual Icon)",
  args: {
    "aria-label": "Settings",
    children: undefined,
    name: undefined,
  },
  render: (args) => {
    return (
      <IconButton {...args} aria-label="Settings">
        <Icon name="Settings" size="lg" />
      </IconButton>
    );
  },
};

// ─── As a link ────────────────────────────────────────────────────────────────

export const AsLink: Story = {
  name: "As a link (component prop)",
  args: {
    component: "a",
    href: "#",
    name: "Home",
    "aria-label": "Go home",
  },
};
