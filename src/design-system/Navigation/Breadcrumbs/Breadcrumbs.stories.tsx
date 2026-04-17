import type { Meta, StoryObj } from "@storybook/react";
import Link from "../Link";
import Typography from "../../DataDisplay/Typography";

import Breadcrumbs from "./Breadcrumbs";

const meta: Meta<typeof Breadcrumbs> = {
  title: "Design System/Navigation/Breadcrumbs",
  component: Breadcrumbs,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Basic ────────────────────────────────────────────────────────────────────

export const Basic: Story = {
  args: {
    children: (
      <>
        <Link href="#">Home</Link>
        <Link href="#">Products</Link>
        <Typography color="text.primary">Detail</Typography>
      </>
    ),
  },
};

// ─── Custom separator ─────────────────────────────────────────────────────────

export const CustomSeparator: Story = {
  name: "Custom separator",
  args: {
    separator: "›",
    children: (
      <>
        <Link href="#">Home</Link>
        <Link href="#">Settings</Link>
        <Typography color="text.primary">Profile</Typography>
      </>
    ),
  },
};

// ─── Collapsed ────────────────────────────────────────────────────────────────

export const Collapsed: Story = {
  name: "Collapsed",
  args: {
    maxItems: 2,
    children: (
      <>
        <Link href="#">Home</Link>
        <Link href="#">Level A</Link>
        <Link href="#">Level B</Link>
        <Link href="#">Level C</Link>
        <Typography color="text.primary">Current</Typography>
      </>
    ),
  },
};
