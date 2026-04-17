import type { Meta, StoryObj } from "@storybook/react";
import { AvatarGroup } from "./";
import Icon from "../Icon";

import Avatar from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Design System/Data Display/Avatar",
  component: Avatar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["circular", "rounded", "square"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Image ────────────────────────────────────────────────────────────────────

export const Image: Story = {
  args: {
    src: "https://mui.com/static/images/avatar/1.jpg",
    alt: "Jane Doe",
  },
};

// ─── Letter ───────────────────────────────────────────────────────────────────

export const Letter: Story = {
  args: { children: "JD" },
};

// ─── Icon ─────────────────────────────────────────────────────────────────────

export const WithIcon: Story = {
  name: "Icon",
  args: { children: <Icon name="Person" /> },
};

// ─── Variants ─────────────────────────────────────────────────────────────────

export const Rounded: Story = {
  args: {
    variant: "rounded",
    src: "https://mui.com/static/images/avatar/2.jpg",
    alt: "User",
  },
};

export const Square: Story = {
  args: {
    variant: "square",
    src: "https://mui.com/static/images/avatar/3.jpg",
    alt: "User",
  },
};

// ─── Group ────────────────────────────────────────────────────────────────────

export const Group: Story = {
  name: "Group (AvatarGroup)",
  render: () => (
    <AvatarGroup max={4}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Avatar
          key={n}
          src={`https://mui.com/static/images/avatar/${n}.jpg`}
          alt={`User ${n}`}
        />
      ))}
    </AvatarGroup>
  ),
};
