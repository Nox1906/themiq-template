import { createStyles } from "../../utils";

export default createStyles((theme) => ({
  root: {
    borderRadius: theme.shape.md,
    "&:hover .MuiCardActionArea-focusHighlight": {
      opacity: 0.04,
      backgroundColor: theme.palette.primary.main,
    },
  },
}));
