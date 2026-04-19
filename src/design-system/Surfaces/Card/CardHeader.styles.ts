import { createStyles } from "../../utils";

export default createStyles((theme) => ({
  root: {
    padding: `${theme.spacing(2)} ${theme.spacing(2)} ${theme.spacing(1)}`,
    "& .MuiCardHeader-title": {
      fontWeight: 600,
      fontSize: theme.typography.body1.fontSize,
      color: theme.palette["neutral-dark"].main,
    },
    "& .MuiCardHeader-subheader": {
      fontSize: theme.typography.caption.fontSize,
      color: theme.palette.neutral.main,
      marginTop: theme.spacing(0.25),
    },
  },
}));