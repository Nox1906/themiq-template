import { createStyles } from "../../utils";

export default createStyles((theme) => ({
  root: {
    "& .MuiFormHelperText-root": {
      marginLeft: 0,
    },
    "& .MuiInputBase-root": {
      borderRadius: theme.shape.sm,
    },
  },
}));