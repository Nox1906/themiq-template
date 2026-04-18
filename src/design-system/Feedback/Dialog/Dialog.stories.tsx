import type { Meta } from "@storybook/react";
import React from "react";

import Button from "../../Inputs/Button";
import TextField from "../../Inputs/TextField";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "./";
import Dialog from "./Dialog";

// Dialog is a controlled component — all stories use render functions with
// local state so the open/close interaction works in Storybook.

const meta = {
  title: "Design System/Feedback/Dialog",
  component: Dialog,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;

// ─── Confirmation ─────────────────────────────────────────────────────────────

export const Confirmation = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Delete item
        </Button>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Confirm deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this item? This action cannot be
              undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              onClick={() => setOpen(false)}
              color="error"
              variant="contained"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  },
};

// ─── Form dialog ──────────────────────────────────────────────────────────────

export const FormDialog = {
  name: "Form dialog",
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Edit profile
        </Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit profile</DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              pt: "8px !important",
            }}
          >
            <TextField label="Name" defaultValue="John Doe" fullWidth />
            <TextField
              label="Email"
              defaultValue="john@example.com"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)} variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const FullWidth = {
  name: "Full width",
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open full-width dialog
        </Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>Full-width dialog</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This dialog stretches to the max width of "md".
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  },
};

// ─── Scrollable ───────────────────────────────────────────────────────────────

export const Scrollable = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open scrollable dialog
        </Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>Terms of service</DialogTitle>
          <DialogContent dividers>
            {Array.from({ length: 10 }).map((_, i) => (
              <DialogContentText key={i} sx={{ mb: 1 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                accumsan libero at ligula vehicula, vel suscipit risus laoreet.
                Cras dictum felis non arcu sodales tincidunt.
              </DialogContentText>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Decline</Button>
            <Button onClick={() => setOpen(false)} variant="contained">
              Accept
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  },
};
