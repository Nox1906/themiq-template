import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import Divider from "../../DataDisplay/Divider";
import List from "../../DataDisplay/List";
import { ListItemButton, ListItemText } from "../../DataDisplay/List";
import { ListItem } from "../../DataDisplay/List";
import Button from "../../Inputs/Button";
import Drawer from "./Drawer";

const meta: Meta<typeof Drawer> = {
  title: "Design System/Navigation/Drawer",
  component: Drawer,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    anchor: "left",
    variant: "temporary",
  },
  argTypes: {
    anchor: {
      control: "select",
      options: ["left", "right", "top", "bottom"],
    },
    variant: {
      control: "select",
      options: ["temporary", "persistent", "permanent"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const navItems = ["Home", "Dashboard", "Reports", "Settings"];

// ─── Left (default) ───────────────────────────────────────────────────────────

export const Left: Story = {
  name: "Left",
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Open left drawer
        </Button>
        <Drawer
          {...args}
          anchor="left"
          open={open}
          onClose={() => setOpen(false)}
        >
          <List sx={{ width: 240 }}>
            {navItems.map((item) => (
              <ListItem key={item} disablePadding>
                <ListItemButton onClick={() => setOpen(false)}>
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </>
    );
  },
};

// ─── Right ────────────────────────────────────────────────────────────────────

export const Right: Story = {
  name: "Right",
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Open right drawer
        </Button>
        <Drawer
          {...args}
          anchor="right"
          open={open}
          onClose={() => setOpen(false)}
        >
          <List sx={{ width: 300 }}>
            {navItems.map((item) => (
              <ListItem key={item} disablePadding>
                <ListItemButton onClick={() => setOpen(false)}>
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))}
            <Divider />
            <ListItem>
              <ListItemText secondary="v1.0.0" />
            </ListItem>
          </List>
        </Drawer>
      </>
    );
  },
};

// ─── Bottom ───────────────────────────────────────────────────────────────────

export const Bottom: Story = {
  name: "Bottom",
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Open bottom drawer
        </Button>
        <Drawer
          {...args}
          anchor="bottom"
          open={open}
          onClose={() => setOpen(false)}
        >
          <List sx={{ display: "flex", flexDirection: "row", padding: 1 }}>
            {navItems.map((item) => (
              <ListItem key={item} sx={{ width: "auto" }}>
                <ListItemButton onClick={() => setOpen(false)}>
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </>
    );
  },
};
