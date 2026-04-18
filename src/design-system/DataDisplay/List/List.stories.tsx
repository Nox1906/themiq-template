import type { Meta, StoryObj } from "@storybook/react";

import Divider from "../Divider";
import Icon from "../Icon";
import { ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "./";
import List from "./List";
import ListItem from "./ListItem";

const meta: Meta<typeof List> = {
  title: "Design System/Data Display/List",
  component: List,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    dense: { control: "boolean" },
    disablePadding: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Basic ────────────────────────────────────────────────────────────────────

export const Basic: Story = {
  args: {
    sx: { width: 320, bgcolor: "background.paper" },
    children: (
      <>
        <ListItem>
          <ListItemText primary="Inbox" secondary="Jan 9, 2025" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Drafts" secondary="Jan 7, 2025" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Trash" secondary="Dec 12, 2024" />
        </ListItem>
      </>
    ),
  },
};

// ─── With icons ───────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  name: "With icons",
  args: {
    sx: { width: 320, bgcolor: "background.paper" },
    children: (
      <>
        <ListItem>
          <ListItemIcon>
            <Icon name="Inbox" />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Icon name="Drafts" />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Icon name="Star" />
          </ListItemIcon>
          <ListItemText primary="Starred" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            <Icon name="Delete" />
          </ListItemIcon>
          <ListItemText primary="Trash" />
        </ListItem>
      </>
    ),
  },
};

// ─── Clickable (ListItemButton) ───────────────────────────────────────────────

export const Clickable: Story = {
  name: "Clickable (ListItemButton)",
  args: {
    sx: { width: 320, bgcolor: "background.paper" },
    children: (
      <>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Icon name="Inbox" />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Icon name="Drafts" />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItemButton>
        </ListItem>
      </>
    ),
  },
};

// ─── With subheader ───────────────────────────────────────────────────────────

export const WithSubheader: Story = {
  name: "With subheader",
  args: {
    sx: { width: 320, bgcolor: "background.paper" },
    subheader: <ListSubheader>Nested List Items</ListSubheader>,
    children: (
      <>
        <ListItem>
          <ListItemText primary="Item 1" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 2" />
        </ListItem>
      </>
    ),
  },
};

// ─── Dense ────────────────────────────────────────────────────────────────────

export const Dense: Story = {
  args: {
    dense: true,
    sx: { width: 320, bgcolor: "background.paper" },
    children: (
      <>
        {["Item 1", "Item 2", "Item 3", "Item 4"].map((label) => (
          <ListItem key={label}>
            <ListItemText primary={label} />
          </ListItem>
        ))}
      </>
    ),
  },
};

// ─── Router-style (component prop) ───────────────────────────────────────────
// Demonstrates ListItem as a polymorphic component.
// In a real app, replace `component="a"` with `component={NavLink}`.

export const RouterStyle: Story = {
  name: "Router-style (component prop)",
  args: {
    component: "nav",
    sx: { width: 320, bgcolor: "background.paper" },
    children: (
      <>
        <ListItem component="a" href="#">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem component="a" href="#">
          <ListItemText primary="Analytics" />
        </ListItem>
        <ListItem component="a" href="#">
          <ListItemText primary="Settings" />
        </ListItem>
      </>
    ),
  },
};
