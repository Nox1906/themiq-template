import { createStyles } from "../../utils";
import { ShadowIndex } from "../../../theming/themes/spec/shadows";

export default createStyles((theme) => ({
  root: {
    "& .MuiDrawer-paper": {
      backgroundColor: theme.palette["neutral-dark"].main,
      color: theme.palette.common.white,
      borderRight: "none",
      boxShadow: theme.shadows[ShadowIndex.Lg],
      width: 240,
    },
  },
}));