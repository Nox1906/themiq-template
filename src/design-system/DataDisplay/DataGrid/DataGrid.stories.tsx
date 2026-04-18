import type { GridColDef } from "@mui/x-data-grid";
import type { Meta, StoryObj } from "@storybook/react";

import DataGrid from "./DataGrid";

// ─── Sample data ──────────────────────────────────────────────────────────────

type Employee = {
  id: number;
  name: string;
  department: string;
  role: string;
  age: number;
  status: "Active" | "Inactive";
};

// Use GridColDef (= GridColDef<GridValidRowModel>) so the column definitions are
// compatible with the inferred Meta<typeof DataGrid> arg types. The Employee
// type is preserved on `rows` where TypeScript checks it safely.
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", flex: 1, minWidth: 140 },
  { field: "department", headerName: "Department", flex: 1, minWidth: 130 },
  { field: "role", headerName: "Role", flex: 1, minWidth: 130 },
  { field: "age", headerName: "Age", type: "number", width: 80 },
  { field: "status", headerName: "Status", width: 100 },
];

const rows: Employee[] = [
  {
    id: 1,
    name: "Alice Martin",
    department: "Engineering",
    role: "Senior Engineer",
    age: 34,
    status: "Active",
  },
  {
    id: 2,
    name: "Bob Chen",
    department: "Design",
    role: "UX Designer",
    age: 28,
    status: "Active",
  },
  {
    id: 3,
    name: "Carol Smith",
    department: "Product",
    role: "Product Manager",
    age: 41,
    status: "Active",
  },
  {
    id: 4,
    name: "David Lee",
    department: "Engineering",
    role: "Junior Engineer",
    age: 25,
    status: "Inactive",
  },
  {
    id: 5,
    name: "Eva Wilson",
    department: "Marketing",
    role: "Marketing Lead",
    age: 37,
    status: "Active",
  },
  {
    id: 6,
    name: "Frank Brown",
    department: "Design",
    role: "Graphic Designer",
    age: 30,
    status: "Active",
  },
  {
    id: 7,
    name: "Grace Kim",
    department: "Engineering",
    role: "Tech Lead",
    age: 45,
    status: "Active",
  },
  {
    id: 8,
    name: "Henry Patel",
    department: "Product",
    role: "Product Owner",
    age: 33,
    status: "Inactive",
  },
];

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof DataGrid> = {
  title: "Design System/Data Display/DataGrid",
  component: DataGrid,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Basic ────────────────────────────────────────────────────────────────────
// Stories use render functions with an explicit Employee type argument because
// Storybook resolves the generic to `GridValidRowModel` in Meta — the same
// pattern used for Select/Autocomplete with value generics.

export const Basic: Story = {
  render: () => <DataGrid<Employee> rows={rows} columns={columns} autoHeight />,
};

// ─── With pagination ──────────────────────────────────────────────────────────

export const WithPagination: Story = {
  name: "With pagination",
  render: () => (
    <DataGrid<Employee>
      rows={rows}
      columns={columns}
      autoHeight
      pageSizeOptions={[5, 10]}
      initialState={{
        pagination: { paginationModel: { pageSize: 5 } },
      }}
    />
  ),
};

// ─── Loading ──────────────────────────────────────────────────────────────────

export const Loading: Story = {
  render: () => (
    <DataGrid<Employee> rows={[]} columns={columns} loading autoHeight />
  ),
};

// ─── No rows ──────────────────────────────────────────────────────────────────

export const NoRows: Story = {
  name: "No rows",
  render: () => <DataGrid<Employee> rows={[]} columns={columns} autoHeight />,
};

// ─── Column visibility ────────────────────────────────────────────────────────

export const ColumnVisibility: Story = {
  name: "Column visibility",
  render: () => (
    <DataGrid<Employee>
      rows={rows}
      columns={columns}
      autoHeight
      initialState={{
        columns: { columnVisibilityModel: { age: false, id: false } },
      }}
    />
  ),
};
