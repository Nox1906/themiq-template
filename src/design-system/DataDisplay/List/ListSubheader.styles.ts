import { createStyles } from "../../utils";

export default createStyles((theme) => ({
  root: {
    fontSize: theme.typography.overline.fontSize,
    fontWeight: 600,
    letterSpacing: theme.typography.overline.letterSpacing,
    textTransform: "uppercase" as const,
    color: theme.palette.neutral.main,
    lineHeight: "2.5",
    paddingLeft: theme.spacing(2),
  },
}));
