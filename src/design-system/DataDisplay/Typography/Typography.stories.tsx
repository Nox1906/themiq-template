import type { Meta, StoryObj } from "@storybook/react";

import Typography from "./Typography";

const meta: Meta<typeof Typography> = {
  title: "Design System/Data Display/Typography",
  component: Typography,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "subtitle1",
        "subtitle2",
        "body1",
        "body2",
        "caption",
        "overline",
        "button",
        "inherit",
      ],
    },
    align: {
      control: "select",
      options: ["left", "center", "right", "justify", "inherit"],
    },
    maxLines: {
      control: { type: "number", min: 1, max: 10 },
    },
    noWrap: {
      control: "boolean",
      description: "Deprecated — use maxLines instead. Forces maxLines=1.",
    },
    gutterBottom: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Individual variants ──────────────────────────────────────────────────────

export const H1: Story = {
  args: { variant: "h1", children: "Heading 1" },
};

export const H2: Story = {
  args: { variant: "h2", children: "Heading 2" },
};

export const H3: Story = {
  args: { variant: "h3", children: "Heading 3" },
};

export const H4: Story = {
  args: { variant: "h4", children: "Heading 4" },
};

export const H5: Story = {
  args: { variant: "h5", children: "Heading 5" },
};

export const H6: Story = {
  args: { variant: "h6", children: "Heading 6" },
};

export const Subtitle1: Story = {
  args: { variant: "subtitle1", children: "Subtitle 1 — section descriptor" },
};

export const Subtitle2: Story = {
  args: {
    variant: "subtitle2",
    children: "Subtitle 2 — smaller section descriptor",
  },
};

export const Body1: Story = {
  args: {
    variant: "body1",
    children:
      "Body 1 — the default paragraph style. Used for most running text in the application.",
  },
};

export const Body2: Story = {
  args: {
    variant: "body2",
    children:
      "Body 2 — slightly smaller than body1. Useful for secondary descriptive text.",
  },
};

export const Caption: Story = {
  args: {
    variant: "caption",
    children: "Caption — helper text, labels below fields.",
  },
};

export const Overline: Story = {
  args: { variant: "overline", children: "Overline — category label" },
};

// ─── All variants at a glance ─────────────────────────────────────────────────

export const AllVariants: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {(
        [
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "subtitle1",
          "subtitle2",
          "body1",
          "body2",
          "caption",
          "overline",
          "button",
        ] as const
      ).map((v) => (
        <Typography key={v} variant={v}>
          {v} — The quick brown fox jumps over the lazy dog
        </Typography>
      ))}
    </div>
  ),
};

// ─── Overflow / maxLines ──────────────────────────────────────────────────────

const LONG_TEXT =
  "This is a very long paragraph that demonstrates how the maxLines prop works. " +
  "When the rendered text exceeds the number of lines specified, it is capped with an ellipsis. " +
  "Hover over the text to see the full content appear in a tooltip automatically managed by the component.";

export const MaxLinesCapped: Story = {
  name: "maxLines — 2 lines",
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ width: 320 }}>
      <Typography variant="body1" maxLines={2}>
        {LONG_TEXT}
      </Typography>
    </div>
  ),
};

export const MaxLinesSingleLine: Story = {
  name: "maxLines — 1 line",
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ width: 320 }}>
      <Typography variant="body1" maxLines={1}>
        {LONG_TEXT}
      </Typography>
    </div>
  ),
};

export const OverflowWithCustomTitle: Story = {
  name: "maxLines — custom tooltip title",
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ width: 320 }}>
      <Typography
        variant="body1"
        maxLines={1}
        title="This is the full content of the field"
      >
        This is the full content of the field — but only one line will be
        visible here
      </Typography>
    </div>
  ),
};

/** @deprecated Use maxLines instead. Shown here for backwards-compatibility testing. */
export const NoWrapDeprecated: Story = {
  name: "noWrap (deprecated)",
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ width: 320 }}>
      {/* noWrap is treated as maxLines=1 internally */}
      <Typography variant="body1" noWrap>
        {LONG_TEXT}
      </Typography>
    </div>
  ),
};

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    variant: "body1",
    children: LONG_TEXT,
    maxLines: undefined,
    noWrap: false,
    gutterBottom: false,
    align: "left",
  },
};
