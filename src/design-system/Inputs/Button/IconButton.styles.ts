import { createStyles } from "../../utils";

export default createStyles((theme) => ({
  root: {
    borderRadius: theme.shape.sm,
    color: theme.palette.neutral.main,
    "&:hover": {
      backgroundColor: theme.palette.primary["0"] ?? theme.palette.primary.light,
      color: theme.palette.primary.main,
    },
    "&.MuiIconButton-colorPrimary": {
      color: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
      },
    },
  },
}));