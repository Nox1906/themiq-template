import { createStyles } from "../../utils";
import { ShadowIndex } from "../../../theming/themes/spec/shadows";

export default createStyles((theme) => ({
  root: {
    borderRadius: `${theme.shape.sm}px !important`,
    border: `1px solid ${theme.palette.neutral["100"] ?? theme.palette.neutral.light}`,
    boxShadow: "none",
    "&::before": {
      display: "none",
    },
    "&.Mui-expanded": {
      margin: 0,
      boxShadow: theme.shadows[ShadowIndex.Sm],
    },
    "& + &": {
      marginTop: theme.spacing(1),
    },
  },
}));
