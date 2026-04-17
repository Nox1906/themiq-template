import type { Meta } from "@storybook/react";
import TextField from "../TextField";

import Autocomplete from "./Autocomplete";

const FRUITS = [
  "Apple",
  "Apricot",
  "Banana",
  "Blueberry",
  "Cherry",
  "Date",
  "Fig",
  "Grape",
  "Kiwi",
  "Lemon",
  "Mango",
  "Orange",
  "Peach",
  "Pear",
  "Pineapple",
  "Plum",
  "Raspberry",
  "Strawberry",
];

const GROUPED = [
  { label: "React", category: "Frontend" },
  { label: "Vue", category: "Frontend" },
  { label: "Angular", category: "Frontend" },
  { label: "Node.js", category: "Backend" },
  { label: "Django", category: "Backend" },
  { label: "Rails", category: "Backend" },
];

// Autocomplete is highly generic — all stories use render functions.
const meta: Meta = {
  title: "Design System/Inputs/Autocomplete",
  component: Autocomplete,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;

// ─── Single ───────────────────────────────────────────────────────────────────

export const Default = {
  render: () => (
    <Autocomplete
      options={FRUITS}
      renderInput={(params) => <TextField {...params} label="Fruit" />}
      sx={{ width: 280 }}
    />
  ),
};

// ─── Multiple ─────────────────────────────────────────────────────────────────

export const Multiple = {
  name: "Multiple selection",
  render: () => (
    <Autocomplete
      multiple
      options={FRUITS}
      defaultValue={["Apple", "Banana"]}
      renderInput={(params) => <TextField {...params} label="Fruits" />}
      sx={{ width: 340 }}
    />
  ),
};

// ─── Free solo ────────────────────────────────────────────────────────────────

export const FreeSolo = {
  name: "Free solo",
  render: () => (
    <Autocomplete
      freeSolo
      options={FRUITS}
      renderInput={(params) => (
        <TextField {...params} label="Search or type anything" />
      )}
      sx={{ width: 280 }}
    />
  ),
};

// ─── Grouped ──────────────────────────────────────────────────────────────────

export const Grouped = {
  render: () => (
    <Autocomplete
      options={GROUPED.sort((a, b) => a.category.localeCompare(b.category))}
      groupBy={(option) => (option as (typeof GROUPED)[number]).category}
      getOptionLabel={(option) => (option as (typeof GROUPED)[number]).label}
      renderInput={(params) => <TextField {...params} label="Technology" />}
      sx={{ width: 280 }}
    />
  ),
};

// ─── States ───────────────────────────────────────────────────────────────────

export const Disabled = {
  render: () => (
    <Autocomplete
      disabled
      options={FRUITS}
      defaultValue="Apple"
      renderInput={(params) => <TextField {...params} label="Fruit" />}
      sx={{ width: 280 }}
    />
  ),
};

export const Loading = {
  render: () => (
    <Autocomplete
      loading
      options={[]}
      renderInput={(params) => <TextField {...params} label="Loading…" />}
      sx={{ width: 280 }}
    />
  ),
};

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground = {
  render: () => (
    <Autocomplete
      options={FRUITS}
      renderInput={(params) => <TextField {...params} label="Playground" />}
      sx={{ width: 280 }}
    />
  ),
};
