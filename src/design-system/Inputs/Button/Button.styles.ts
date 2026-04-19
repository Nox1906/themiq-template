import { createStyles } from "../../utils";
import { ShadowIndex } from "../../../theming/themes/spec/shadows";

export default createStyles((theme) => ({
  root: {
    borderRadius: theme.shape.sm,
    textTransform: theme.typography.button.textTransform,
    fontWeight: theme.typography.button.fontWeight,
    letterSpacing: theme.typography.button.letterSpacing,
    "&.MuiButton-containedPrimary": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
      "&:focus-visible": {
        boxShadow: theme.shadows[ShadowIndex.Focus],
      },
    },
    "&.MuiButton-outlinedPrimary": {
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
      },
    },
    "&.MuiButton-textPrimary": {
      color: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
      },
    },
  },
}));
