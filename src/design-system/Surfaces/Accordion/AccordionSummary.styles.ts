import { createStyles } from "../../utils";

export default createStyles((theme) => ({
  root: {
    borderRadius: theme.shape.sm,
    minHeight: 48,
    padding: `0 ${theme.spacing(2)}`,
    "&.Mui-expanded": {
      minHeight: 48,
    },
    "& .MuiAccordionSummary-content": {
      fontWeight: 500,
      fontSize: theme.typography.body2.fontSize,
      color: theme.palette["neutral-dark"].main,
    },
    "& .MuiAccordionSummary-expandIconWrapper": {
      color: theme.palette.neutral.main,
    },
  },
}));
