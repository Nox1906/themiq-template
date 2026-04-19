import { createStyles } from "../../utils";

export default createStyles((theme) => ({
  root: {
    "& .MuiListItemText-primary": {
      fontSize: theme.typography.body2.fontSize,
      fontWeight: 500,
    },
    "& .MuiListItemText-secondary": {
      fontSize: theme.typography.caption.fontSize,
      color: theme.palette.neutral.main,
    },
  },
}));
