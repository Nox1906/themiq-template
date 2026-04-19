import { createStyles } from "../../utils";

export default createStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    "&:last-child": {
      paddingBottom: theme.spacing(2),
    },
  },
}));