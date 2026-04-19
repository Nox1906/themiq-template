import { createStyles } from "../../utils";

export default createStyles((theme) => ({
  root: {
    borderRadius: theme.shape.xs,
    fontWeight: 500,
    fontSize: theme.typography.caption.fontSize,
    "&.MuiChip-colorPrimary": {
      backgroundColor:
        theme.palette.primary["0"] ?? theme.palette.primary.light,
      color: theme.palette.primary.dark,
      border: `1px solid ${theme.palette.primary["100"] ?? theme.palette.primary.main}`,
    },
    "&.MuiChip-colorSecondary": {
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.secondary.dark,
    },
  },
}));
