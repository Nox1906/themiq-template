import { createStyles } from "../../utils";
import { ShadowIndex } from "../../../theming/themes/spec/shadows";

export default createStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette["neutral-dark"].main,
    color: theme.palette.common.white,
    borderRadius: theme.shape.xs,
    fontSize: theme.typography.caption.fontSize,
    padding: `${theme.spacing(0.75)} ${theme.spacing(1.5)}`,
    boxShadow: theme.shadows[ShadowIndex.Sm],
  },
  arrow: {
    color: theme.palette["neutral-dark"].main,
  },
  popper: {},
}));
