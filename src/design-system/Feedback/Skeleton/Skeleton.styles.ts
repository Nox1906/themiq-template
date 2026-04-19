import { createStyles } from "../../utils";

export default createStyles((theme) => ({
  root: {
    borderRadius: theme.shape.xs,
    backgroundColor:
      theme.palette.neutral["100"] ?? theme.palette.neutral.light,
    "&::after": {
      background: `linear-gradient(90deg, transparent, ${theme.palette.neutral["0"] ?? theme.palette.neutral.light}, transparent)`,
    },
  },
}));
