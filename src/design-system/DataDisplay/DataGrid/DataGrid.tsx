import { forwardRef, type JSX } from "react";
import React from "react";
import {
  DataGrid as MuiDataGrid,
  type DataGridProps as MuiDataGridProps,
  type GridValidRowModel,
} from "@mui/x-data-grid";

import makeStyles from "./DataGrid.styles";

const useStyles = makeStyles({ name: "DataGrid" });

function DataGridImpl<R extends GridValidRowModel = GridValidRowModel>(
  { className, ...props }: DataGridProps<R>,
  ref: React.Ref<HTMLDivElement>,
) {
  const { classes, cx } = useStyles();

  return (
    <MuiDataGrid<R>
      ref={ref}
      {...props}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system DataGrid.
 *
 * Uses a `R extends GridValidRowModel` generic (a **value generic**, not
 * polymorphic) — it describes the shape of each row object so TypeScript can
 * type-check column `field` references against your data:
 *
 * ```tsx
 * type User = { id: number; name: string; email: string };
 * <DataGrid<User> rows={users} columns={[{ field: "name" }, { field: "email" }]} />
 * ```
 *
 * Currently all MUI {@link MuiDataGridProps} pass through unchanged.
 *
 * Note: DataGrid uses MUI X's slot system rather than the standard `classes`
 * prop. Use `sx` or theme style overrides (`MuiDataGrid`) for visual
 * customisation.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 *
 * @example Enforce `autoHeight` always on:
 * ```ts
 * export type DataGridProps<R> = Omit<MuiDataGridProps<R>, "autoHeight"> & {
 *   // autoHeight always true — remove from public API
 * };
 * ```
 */
export type DataGridProps<R extends GridValidRowModel = GridValidRowModel> =
  Omit<MuiDataGridProps<R>, never> & {
    // ─── Design-system overrides ──────────────────────────────────────────────
    // Replace `never` with the MUI prop name(s) to override, then declare
    // the custom version here. See JSDoc above for a worked example.
  };

/**
 * Design-system DataGrid. A thin wrapper around MUI X's `DataGrid` with style
 * override hooks for the active theme.
 *
 * Provides built-in sorting, filtering, pagination and column management.
 * Define `columns` with `GridColDef[]` and pass `rows` as an array of objects.
 *
 * **Basic usage:**
 * ```tsx
 * import type { GridColDef } from "@mui/x-data-grid";
 *
 * const columns: GridColDef[] = [
 *   { field: "id", headerName: "ID", width: 70 },
 *   { field: "name", headerName: "Name", flex: 1 },
 *   { field: "email", headerName: "Email", flex: 1 },
 * ];
 *
 * const rows = [
 *   { id: 1, name: "Alice", email: "alice@example.com" },
 *   { id: 2, name: "Bob",   email: "bob@example.com" },
 * ];
 *
 * <DataGrid rows={rows} columns={columns} />
 * ```
 *
 * **With pagination:**
 * ```tsx
 * <DataGrid
 *   rows={rows}
 *   columns={columns}
 *   pageSizeOptions={[10, 25, 50]}
 *   initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
 * />
 * ```
 *
 * All MUI X `DataGridProps` are forwarded unchanged.
 * Visual overrides via `sx` or the theme's `MuiDataGrid` component key.
 */
const DataGrid = forwardRef(DataGridImpl) as <
  R extends GridValidRowModel = GridValidRowModel,
>(
  props: DataGridProps<R> & { ref?: React.Ref<HTMLDivElement> },
) => JSX.Element;

export default DataGrid;
