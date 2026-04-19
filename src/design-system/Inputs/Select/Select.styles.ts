import { createStyles } from "../../utils";

export default createStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-root": {
      borderRadius: theme.shape.sm,
      fontSize: theme.typography.body2.fontSize,
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.main,
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.main,
      },
    },
    "& .MuiSelect-select": {
      fontSize: theme.typography.body2.fontSize,
    },
  },
}));