import { createStyles } from "../../utils";
import { ShadowIndex } from "../../../theming/themes/spec/shadows";

export default createStyles((theme) => ({
  root: {
    borderRadius: theme.shape.md,
    boxShadow: theme.shadows[ShadowIndex.Sm],
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.neutral["100"] ?? theme.palette.neutral.light}`,
  },
}));
