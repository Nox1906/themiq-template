import type { Meta, StoryObj } from "@storybook/react";

import Typography from "../../DataDisplay/Typography";
import Button from "../../Inputs/Button";
import {
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
} from "./";
import Card from "./Card";

const meta: Meta<typeof Card> = {
  title: "Design System/Surfaces/Card",
  component: Card,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["elevation", "outlined"],
    },
    raised: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Basic ────────────────────────────────────────────────────────────────────

export const Basic: Story = {
  args: {
    sx: { maxWidth: 345 },
    children: (
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Card Title
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This is a simple card with some content. Use CardContent, CardHeader,
          CardMedia, and CardActions to compose.
        </Typography>
      </CardContent>
    ),
  },
};

// ─── With header and actions ──────────────────────────────────────────────────

export const WithHeaderAndActions: Story = {
  name: "With header and actions",
  args: {
    sx: { maxWidth: 345 },
    children: (
      <>
        <CardHeader
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a classic Spanish dish combining chicken,
            shrimp, and chorizo.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </>
    ),
  },
};

// ─── With media ───────────────────────────────────────────────────────────────

export const WithMedia: Story = {
  name: "With media",
  args: {
    sx: { maxWidth: 345 },
    children: (
      <>
        <CardMedia
          component="img"
          sx={{ height: 140 }}
          image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
          alt="contemplative reptile"
        />
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are cold-blooded reptiles belonging to the order Squamata.
          </Typography>
        </CardContent>
      </>
    ),
  },
};

// ─── Clickable (CardActionArea) ───────────────────────────────────────────────

export const Clickable: Story = {
  name: "Clickable (CardActionArea)",
  args: {
    sx: { maxWidth: 345 },
    children: (
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Click anywhere
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Wrap content in CardActionArea to make the whole card clickable.
          </Typography>
        </CardContent>
      </CardActionArea>
    ),
  },
};

// ─── Outlined ─────────────────────────────────────────────────────────────────

export const Outlined: Story = {
  args: {
    variant: "outlined",
    sx: { maxWidth: 345 },
    children: (
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Outlined card
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Border instead of shadow.
        </Typography>
      </CardContent>
    ),
  },
};
