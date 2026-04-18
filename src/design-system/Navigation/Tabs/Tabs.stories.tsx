import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import Tab from "./Tab";
import Tabs from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Design System/Navigation/Tabs",
  component: Tabs,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    variant: {
      control: "select",
      options: ["standard", "scrollable", "fullWidth"],
    },
    textColor: {
      control: "select",
      options: ["inherit", "primary", "secondary"],
    },
    indicatorColor: {
      control: "select",
      options: ["primary", "secondary"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Horizontal ───────────────────────────────────────────────────────────────

export const Horizontal: Story = {
  name: "Horizontal",
  render: (args) => {
    const [value, setValue] = React.useState(0);
    return (
      <Tabs {...args} value={value} onChange={(_, v) => setValue(v as number)}>
        <Tab label="Dashboard" />
        <Tab label="Analytics" />
        <Tab label="Settings" />
      </Tabs>
    );
  },
};

// ─── Vertical ─────────────────────────────────────────────────────────────────

export const Vertical: Story = {
  name: "Vertical",
  render: (args) => {
    const [value, setValue] = React.useState(0);
    return (
      <Tabs
        {...args}
        orientation="vertical"
        value={value}
        onChange={(_, v) => setValue(v as number)}
        sx={{ borderRight: 1, borderColor: "divider", minHeight: 200 }}
      >
        <Tab label="Dashboard" />
        <Tab label="Analytics" />
        <Tab label="Settings" />
      </Tabs>
    );
  },
};

// ─── Scrollable ───────────────────────────────────────────────────────────────

export const Scrollable: Story = {
  name: "Scrollable",
  render: (args) => {
    const [value, setValue] = React.useState(0);
    return (
      <Tabs
        {...args}
        variant="scrollable"
        scrollButtons="auto"
        value={value}
        onChange={(_, v) => setValue(v as number)}
        sx={{ maxWidth: 360 }}
      >
        {Array.from({ length: 8 }, (_, i) => (
          <Tab key={i} label={`Tab ${i + 1}`} />
        ))}
      </Tabs>
    );
  },
};

// ─── Full width ───────────────────────────────────────────────────────────────

export const FullWidth: Story = {
  name: "Full width",
  render: (args) => {
    const [value, setValue] = React.useState(0);
    return (
      <Tabs
        {...args}
        variant="fullWidth"
        value={value}
        onChange={(_, v) => setValue(v as number)}
      >
        <Tab label="One" />
        <Tab label="Two" />
        <Tab label="Three" />
      </Tabs>
    );
  },
};

// ─── Router-style (component prop) ───────────────────────────────────────────
// Demonstrates using Tab as a polymorphic component, e.g. with NavLink.
// In a real app, replace `component="a"` with `component={NavLink}`.

export const RouterStyle: Story = {
  name: "Router-style (component prop)",
  render: (args) => {
    const [value, setValue] = React.useState("/dashboard");
    return (
      <Tabs {...args} value={value} onChange={(_, v) => setValue(v as string)}>
        <Tab component="a" href="#" value="/dashboard" label="Dashboard" />
        <Tab component="a" href="#" value="/analytics" label="Analytics" />
        <Tab component="a" href="#" value="/settings" label="Settings" />
      </Tabs>
    );
  },
};
