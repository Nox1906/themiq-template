import React from "react";
import type { Meta } from "@storybook/react";
import Alert from "../Alert";
import Button from "../../Inputs/Button";

import Snackbar from "./Snackbar";

// Snackbar is a controlled component — all stories use render functions with
// local state so the open/close interaction works in Storybook.

const meta = {
  title: "Design System/Feedback/Snackbar",
  component: Snackbar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Snackbar>;

export default meta;

// ─── Simple message ───────────────────────────────────────────────────────────

export const Default = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Show snackbar
        </Button>
        <Snackbar
          open={open}
          message="File saved successfully."
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
        />
      </>
    );
  },
};

// ─── With Alert ───────────────────────────────────────────────────────────────

export const WithAlert = {
  name: "With Alert",
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Show snackbar
        </Button>
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={() => setOpen(false)}
        >
          <Alert
            severity="success"
            variant="filled"
            onClose={() => setOpen(false)}
          >
            Changes saved!
          </Alert>
        </Snackbar>
      </>
    );
  },
};

export const WithAlertError = {
  name: "With Alert — error",
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button variant="contained" color="error" onClick={() => setOpen(true)}>
          Trigger error
        </Button>
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={() => setOpen(false)}
        >
          <Alert
            severity="error"
            variant="filled"
            onClose={() => setOpen(false)}
          >
            Upload failed. Please try again.
          </Alert>
        </Snackbar>
      </>
    );
  },
};

// ─── Positions ────────────────────────────────────────────────────────────────

export const TopCenter = {
  name: "Position — top center",
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Show top center
        </Button>
        <Snackbar
          open={open}
          message="Top center snackbar"
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        />
      </>
    );
  },
};

// ─── Persistent (no auto-hide) ────────────────────────────────────────────────

export const Persistent = {
  name: "Persistent (no auto-hide)",
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Show persistent
        </Button>
        <Snackbar
          open={open}
          message="This won't auto-hide — close manually."
          onClose={() => setOpen(false)}
          action={
            <Button color="inherit" size="small" onClick={() => setOpen(false)}>
              CLOSE
            </Button>
          }
        />
      </>
    );
  },
};
