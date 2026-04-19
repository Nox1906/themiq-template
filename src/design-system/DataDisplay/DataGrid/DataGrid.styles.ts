import { createStyles } from "../../utils";

export default createStyles((theme) => ({
  root: {
    borderRadius: theme.shape.sm,
    border: `1px solid ${theme.palette.neutral["100"] ?? theme.palette.neutral.light}`,
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor:
        theme.palette.neutral["0"] ?? theme.palette.neutral.light,
      borderBottom: `2px solid ${theme.palette.neutral["100"] ?? theme.palette.neutral.light}`,
    },
    "& .MuiDataGrid-columnHeaderTitle": {
      fontWeight: 600,
      fontSize: theme.typography.caption.fontSize,
      color: theme.palette["neutral-dark"].main,
    },
    "& .MuiDataGrid-row:hover": {
      backgroundColor:
        theme.palette.primary["0"] ?? theme.palette.primary.light,
    },
    "& .MuiDataGrid-row.Mui-selected": {
      backgroundColor:
        theme.palette.primary["0"] ?? theme.palette.primary.light,
    },
    "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
      outline: `2px solid ${theme.palette.primary.main}`,
      outlineOffset: -2,
    },
    "& .MuiDataGrid-footerContainer": {
      borderTop: `1px solid ${theme.palette.neutral["100"] ?? theme.palette.neutral.light}`,
    },
  },
}));
