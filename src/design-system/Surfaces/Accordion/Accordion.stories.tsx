import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import Icon from "../../DataDisplay/Icon";
import Typography from "../../DataDisplay/Typography";
import { AccordionDetails, AccordionSummary } from "./";
import Accordion from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Design System/Surfaces/Accordion",
  component: Accordion,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    disableGutters: { control: "boolean" },
    square: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Uncontrolled ─────────────────────────────────────────────────────────────

export const Uncontrolled: Story = {
  args: {
    children: (
      <>
        <AccordionSummary expandIcon={<Icon name="ExpandMore" />}>
          <Typography>Accordion panel</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            This accordion manages its own open/closed state. Click the header
            to expand or collapse.
          </Typography>
        </AccordionDetails>
      </>
    ),
  },
};

// ─── Default expanded ─────────────────────────────────────────────────────────

export const DefaultExpanded: Story = {
  name: "Default expanded",
  args: {
    defaultExpanded: true,
    children: (
      <>
        <AccordionSummary expandIcon={<Icon name="ExpandMore" />}>
          <Typography>Expanded by default</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Pass <code>defaultExpanded</code> to open the panel on first render.
          </Typography>
        </AccordionDetails>
      </>
    ),
  },
};

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <AccordionSummary expandIcon={<Icon name="ExpandMore" />}>
          <Typography>Disabled panel</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>This panel cannot be opened.</Typography>
        </AccordionDetails>
      </>
    ),
  },
};

// ─── Controlled (one open at a time) ─────────────────────────────────────────

export const Controlled: Story = {
  name: "Controlled (one open at a time)",
  render: () => {
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const handleChange =
      (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
      };

    return (
      <>
        {(["panel1", "panel2", "panel3"] as const).map((panel, i) => (
          <Accordion
            key={panel}
            expanded={expanded === panel}
            onChange={handleChange(panel)}
          >
            <AccordionSummary expandIcon={<Icon name="ExpandMore" />}>
              <Typography>Panel {i + 1}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Content for panel {i + 1}. Only one panel can be open at a time.
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </>
    );
  },
};

// ─── No gutters ───────────────────────────────────────────────────────────────

export const NoGutters: Story = {
  name: "No gutters",
  args: {
    disableGutters: true,
    defaultExpanded: true,
    children: (
      <>
        <AccordionSummary expandIcon={<Icon name="ExpandMore" />}>
          <Typography>No gutters</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <code>disableGutters</code> removes the horizontal padding and the
            margin when expanded.
          </Typography>
        </AccordionDetails>
      </>
    ),
  },
};
