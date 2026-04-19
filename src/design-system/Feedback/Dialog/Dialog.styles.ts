import { createStyles } from "../../utils";
import { ShadowIndex } from "../../../theming/themes/spec/shadows";

export default createStyles((theme) => ({
  root: {
    "& .MuiDialog-paper": {
      borderRadius: theme.shape.lg,
      boxShadow: theme.shadows[ShadowIndex.Xl],
    },
  },
}));
