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
    children: [
      <Link key="home" href="#">
        Home
      </Link>,
      <Link key="products" href="#">
        Products
      </Link>,
      <Typography key="detail" color="text.primary">
        Detail
      </Typography>,
    ],
  },
};

// ─── Custom separator ─────────────────────────────────────────────────────────

export const CustomSeparator: Story = {
  name: "Custom separator",
  args: {
    separator: "›",
    children: [
      <Link key="home" href="#">
        Home
      </Link>,
      <Link key="settings" href="#">
        Settings
      </Link>,
      <Typography key="profile" color="text.primary">
        Profile
      </Typography>,
    ],
  },
};

// ─── Collapsed ────────────────────────────────────────────────────────────────

export const Collapsed: Story = {
  name: "Collapsed",
  args: {
    maxItems: 2,
    children: [
      <Link key="home" href="#">
        Home
      </Link>,
      <Link key="a" href="#">
        Level A
      </Link>,
      <Link key="b" href="#">
        Level B
      </Link>,
      <Link key="c" href="#">
        Level C
      </Link>,
      <Typography key="current" color="text.primary">
        Current
      </Typography>,
    ],
  },
};
