import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Button from "../../Inputs/Button";
import Divider from "../../DataDisplay/Divider";

import Menu from "./Menu";
import MenuItem from "./MenuItem";

const meta: Meta<typeof Menu> = {
  title: "Design System/Navigation/Menu",
  component: Menu,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Basic ────────────────────────────────────────────────────────────────────

export const Basic: Story = {
  render: (args) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
      null,
    );
    return (
      <>
        <Button
          variant="outlined"
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          Open menu
        </Button>
        <Menu
          {...args}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>Account</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>Settings</MenuItem>
        </Menu>
      </>
    );
  },
};

// ─── With divider ─────────────────────────────────────────────────────────────

export const WithDivider: Story = {
  name: "With divider",
  render: (args) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
      null,
    );
    return (
      <>
        <Button
          variant="outlined"
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          Open menu
        </Button>
        <Menu
          {...args}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={() => setAnchorEl(null)}>Edit</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>Duplicate</MenuItem>
          <Divider />
          <MenuItem
            onClick={() => setAnchorEl(null)}
            sx={{ color: "error.main" }}
          >
            Delete
          </MenuItem>
        </Menu>
      </>
    );
  },
};

// ─── Dense ────────────────────────────────────────────────────────────────────

export const Dense: Story = {
  render: (args) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
      null,
    );
    return (
      <>
        <Button
          variant="outlined"
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          Open dense menu
        </Button>
        <Menu
          {...args}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          MenuListProps={{ dense: true }}
        >
          <MenuItem onClick={() => setAnchorEl(null)}>Cut</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>Copy</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>Paste</MenuItem>
        </Menu>
      </>
    );
  },
};

// ─── Router-style (component prop) ───────────────────────────────────────────
// Demonstrates using MenuItem as a polymorphic component, e.g. with NavLink.
// In a real app, replace `component="a"` with `component={NavLink}`.

export const RouterStyle: Story = {
  name: "Router-style (component prop)",
  render: (args) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
      null,
    );
    return (
      <>
        <Button
          variant="outlined"
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          Open menu
        </Button>
        <Menu
          {...args}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem component="a" href="#" onClick={() => setAnchorEl(null)}>
            Dashboard
          </MenuItem>
          <MenuItem component="a" href="#" onClick={() => setAnchorEl(null)}>
            Analytics
          </MenuItem>
          <MenuItem component="a" href="#" onClick={() => setAnchorEl(null)}>
            Settings
          </MenuItem>
        </Menu>
      </>
    );
  },
};
