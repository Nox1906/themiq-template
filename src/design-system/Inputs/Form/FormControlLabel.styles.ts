import { createStyles } from "../../utils";

export default createStyles((theme) => ({
  root: {
    "& .MuiFormControlLabel-label": {
      fontSize: theme.typography.body2.fontSize,
      color: theme.palette["neutral-dark"].main,
    },
    "& .MuiFormControlLabel-label.Mui-disabled": {
      color: theme.palette.disabled.contrastText,
    },
  },
}));