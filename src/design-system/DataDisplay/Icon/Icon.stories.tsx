import * as MuiIcons from "@mui/icons-material";
import type { Meta, StoryObj } from "@storybook/react";

import Icon, { type IconProps } from "./Icon";
import { customIconNames,type IconName } from "./iconUtils";

const baseIconNames = (Object.keys(MuiIcons) as IconName[]).filter(
  (name) => !/(Outlined|Rounded|Sharp|TwoTone)$/.test(name),
);

const allSelectableNames = [...customIconNames, ...baseIconNames].sort((a, b) =>
  a.localeCompare(b),
);

const gridStyle = `
  .icon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 12px;
    overflow: auto;
    max-height: 90vh;
    padding: 8px;
  }
  .icon-cell {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 8px 4px;
    border-radius: 4px;
    cursor: default;
  }
  .icon-cell:hover { background: rgba(0,0,0,0.06); }
  .icon-label {
    font-size: 10px;
    text-align: center;
    word-break: break-word;
    color: #555;
    max-width: 96px;
  }
`;

const IconGrid = ({
  icons,
  size,
}: {
  icons: IconName[];
  size: IconProps["size"];
}) => (
  <>
    <style>{gridStyle}</style>
    <div className="icon-grid">
      {icons.map((name) => (
        <div key={name} className="icon-cell">
          <Icon name={name} size={size} />
          <span className="icon-label">{name}</span>
        </div>
      ))}
    </div>
  </>
);

const meta: Meta<typeof Icon> = {
  component: Icon,
  title: "Design System/Data Display/Icon",
  tags: ["autodocs"],
  argTypes: {
    name: {
      options: allSelectableNames,
      control: { type: "select" },
      description: "Icon name — any MUI icon or a custom icon from svg/",
    },
    size: {
      options: ["xs", "sm", "md", "lg", "xl", "2xl"],
      control: { type: "select" },
      description: "Icon size",
    },
  },
};

export default meta;

type Story = StoryObj<IconProps>;

export const Playground: Story = {
  args: {
    name: "Home",
    size: "md",
  },
};

export const ExtraSmall: Story = {
  args: { name: "Home", size: "xs" },
};

export const Small: Story = {
  args: { name: "Home", size: "sm" },
};

export const Medium: Story = {
  args: { name: "Home", size: "md" },
};

export const Large: Story = {
  args: { name: "Home", size: "lg" },
};

export const ExtraLarge: Story = {
  args: { name: "Home", size: "xl" },
};

export const CustomIcons: StoryObj<{ size: IconProps["size"] }> = {
  name: "Custom Icons",
  args: { size: "md" },
  argTypes: {
    size: {
      options: ["xs", "sm", "md", "lg", "xl", "2xl"],
      control: { type: "select" },
    },
  },
  render: ({ size }) => <IconGrid icons={customIconNames} size={size} />,
};

export const AllIcons: StoryObj<{ size: IconProps["size"]; variant: string }> =
  {
    name: "All Icons",
    args: { size: "md", variant: "base" },
    argTypes: {
      size: {
        options: ["xs", "sm", "md", "lg", "xl", "2xl"],
        control: { type: "select" },
      },
      variant: {
        options: ["base", "Outlined", "Rounded", "Sharp", "TwoTone"],
        control: { type: "select" },
        description: "MUI icon style variant",
      },
    },
    render: ({ size, variant }) => {
      const icons = (Object.keys(MuiIcons) as IconName[]).filter((name) =>
        variant === "base"
          ? !/(Outlined|Rounded|Sharp|TwoTone)$/.test(name)
          : name.endsWith(variant),
      );
      return <IconGrid icons={icons} size={size} />;
    },
  };
