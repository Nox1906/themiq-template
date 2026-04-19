import { createStyles } from "../../utils";

export default createStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
    fontWeight: 500,
    textDecorationColor: theme.palette.primary.light,
    "&:hover": {
      color: theme.palette.primary.dark,
      textDecorationColor: theme.palette.primary.main,
    },
    "&:visited": {
      color: theme.palette.primary["700"] ?? theme.palette.primary.dark,
    },
  },
}));
