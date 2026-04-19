import { createStyles } from "../../utils";
import { ShadowIndex } from "../../../theming/themes/spec/shadows";

export default createStyles((theme) => ({
  root: {
    "& .MuiAutocomplete-paper": {
      borderRadius: theme.shape.sm,
      boxShadow: theme.shadows[ShadowIndex.Md],
      border: `1px solid ${theme.palette.neutral["100"] ?? theme.palette.neutral.light}`,
    },
    "& .MuiAutocomplete-listbox": {
      padding: theme.spacing(0.5),
    },
    "& .MuiAutocomplete-option": {
      borderRadius: theme.shape.xs,
      fontSize: theme.typography.body2.fontSize,
      "&.Mui-focused": {
        backgroundColor: theme.palette.primary["0"] ?? theme.palette.primary.light,
      },
      "&[aria-selected='true']": {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.dark,
      },
    },
  },
}));