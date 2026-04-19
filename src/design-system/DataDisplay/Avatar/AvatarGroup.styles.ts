import { createStyles } from "../../utils";

export default createStyles((theme) => ({
  root: {
    "& .MuiAvatar-root": {
      border: `2px solid ${theme.palette.background.default}`,
      marginLeft: -8,
    },
  },
}));