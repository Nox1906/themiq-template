import { createStyles } from "../../utils";
import { ShadowIndex } from "../../../theming/themes/spec/shadows";

export default createStyles((theme) => ({
  root: {
    "& .MuiMenu-paper": {
      borderRadius: theme.shape.md,
      boxShadow: theme.shadows[ShadowIndex.Md],
      border: `1px solid ${theme.palette.neutral["100"] ?? theme.palette.neutral.light}`,
      padding: `${theme.spacing(0.5)} 0`,
      minWidth: 160,
    },
    "& .MuiMenu-list": {
      padding: `${theme.spacing(0.5)}`,
    },
  },
}));
