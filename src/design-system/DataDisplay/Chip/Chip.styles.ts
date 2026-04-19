import { createStyles } from "../../utils";

export default createStyles((theme) => ({
  root: {
    borderRadius: theme.shape.xs,
    fontWeight: 500,
    fontSize: theme.typography.caption.fontSize,
    // ── default (no color prop) ──────────────────────────────────────────────
    "&.MuiChip-filledDefault": {
      backgroundColor:
        theme.palette.neutral["100"] ?? theme.palette.neutral.light,
      color: theme.palette["neutral-dark"].main,
    },
    "&.MuiChip-outlinedDefault": {
      borderColor: theme.palette.neutral["100"] ?? theme.palette.neutral.light,
      color: theme.palette["neutral-dark"].main,
    },
    // ── primary ─────────────────────────────────────────────────────────────
    "&.MuiChip-colorPrimary": {
      "&.MuiChip-filled": {
        backgroundColor:
          theme.palette.primary["0"] ?? theme.palette.primary.light,
        color: theme.palette.primary.dark,
        border: `1px solid ${
          theme.palette.primary["100"] ?? theme.palette.primary.main
        }`,
      },
      "&.MuiChip-outlined": {
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
        backgroundColor: "transparent",
        "&:hover": {
          backgroundColor:
            theme.palette.primary["0"] ?? theme.palette.primary.light,
        },
      },
    },
    // ── error / danger ───────────────────────────────────────────────────────
    "&.MuiChip-colorError": {
      "&.MuiChip-filled": {
        backgroundColor: theme.palette.error["0"] ?? theme.palette.error.light,
        color: theme.palette.error.dark,
        border: `1px solid ${theme.palette.error.light}`,
      },
      "&.MuiChip-outlined": {
        borderColor: theme.palette.error.main,
        color: theme.palette.error.main,
      },
    },
    // ── success ─────────────────────────────────────────────────────────────
    "&.MuiChip-colorSuccess": {
      "&.MuiChip-filled": {
        backgroundColor:
          theme.palette.success["0"] ?? theme.palette.success.light,
        color: theme.palette.success.dark,
        border: `1px solid ${theme.palette.success.light}`,
      },
      "&.MuiChip-outlined": {
        borderColor: theme.palette.success.main,
        color: theme.palette.success.main,
      },
    },
    // ── warning ─────────────────────────────────────────────────────────────
    "&.MuiChip-colorWarning": {
      "&.MuiChip-filled": {
        backgroundColor:
          theme.palette.warning["0"] ?? theme.palette.warning.light,
        color: theme.palette.warning.dark,
        border: `1px solid ${theme.palette.warning.light}`,
      },
      "&.MuiChip-outlined": {
        borderColor: theme.palette.warning.main,
        color: theme.palette.warning.main,
      },
    },
  },
}));
