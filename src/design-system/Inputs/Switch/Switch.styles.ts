import { createStyles } from "../../utils";

export default createStyles((theme) => ({
  root: {
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: theme.palette.primary.main,
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.primary.main,
        opacity: 0.6,
      },
    },
    "& .MuiSwitch-track": {
      borderRadius: theme.shape.full,
      backgroundColor:
        theme.palette.neutral["300"] ?? theme.palette.neutral.main,
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "none",
    },
  },
}));
