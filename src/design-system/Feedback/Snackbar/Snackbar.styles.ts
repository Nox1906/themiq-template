import { createStyles } from "../../utils";
import { ShadowIndex } from "../../../theming/themes/spec/shadows";

export default createStyles((theme) => ({
  root: {
    "& .MuiSnackbarContent-root": {
      borderRadius: theme.shape.sm,
      backgroundColor: theme.palette["neutral-dark"].main,
      color: theme.palette.common.white,
      boxShadow: theme.shadows[ShadowIndex.Lg],
      fontSize: theme.typography.body2.fontSize,
    },
  },
}));