import { createStyles } from "../../utils";

export default createStyles((theme) => ({
  root: {
    "& .MuiBadge-badge": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      fontWeight: 600,
      fontSize: theme.typography.caption.fontSize,
      borderRadius: theme.shape.full,
    },
  },
}));
