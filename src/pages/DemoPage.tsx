import { useState } from "react";

import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "../design-system";

export default function DemoPage() {
  const [tab, setTab] = useState(0);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        fontFamily: "typography.fontFamily",
      }}
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <Box
        component="header"
        sx={{
          bgcolor: "neutral-dark.main",
          px: 4,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4" sx={{ color: "common.white" }}>
          Acme Enterprise / Friendly Co.
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Chip label="Theme demo" color="primary" size="small" />
          <Badge badgeContent={3} color="primary">
            <Avatar sx={{ width: 36, height: 36 }}>DS</Avatar>
          </Badge>
        </Box>
      </Box>

      {/* ── Main content ───────────────────────────────────────────────────── */}
      <Box component="main" sx={{ maxWidth: 960, mx: "auto", p: 4 }}>
        {/* Title */}
        <Typography variant="h2" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Overview of current activity and recent changes.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* ── Tabs ─────────────────────────────────────────────────────────── */}
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
          <Tab label="Overview" />
          <Tab label="Projects" />
          <Tab label="Team" />
          <Tab label="Settings" />
        </Tabs>

        {/* ── Cards row ──────────────────────────────────────────────────── */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 3,
            mb: 4,
          }}
        >
          {[
            { label: "Active Projects", value: "12", change: "+3 this week" },
            { label: "Team Members", value: "34", change: "2 pending invites" },
            {
              label: "Deployments",
              value: "98%",
              change: "Uptime last 30 days",
            },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent>
                <Typography variant="overline" color="text.secondary">
                  {stat.label}
                </Typography>
                <Typography variant="h2" sx={{ mt: 0.5 }}>
                  {stat.value}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {stat.change}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* ── Activity + Form row ────────────────────────────────────────── */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 3,
            mb: 4,
          }}
        >
          <Card>
            <CardHeader title="Recent Activity" subheader="Last 7 days" />
            <CardContent>
              {[
                {
                  user: "Alice",
                  action: "Deployed v2.4.0",
                  time: "2h ago",
                  color: "primary" as const,
                },
                {
                  user: "Bob",
                  action: "Updated config",
                  time: "4h ago",
                  color: "secondary" as const,
                },
                {
                  user: "Carol",
                  action: "Added new theme",
                  time: "1d ago",
                  color: "primary" as const,
                },
              ].map((item) => (
                <Box
                  key={item.user}
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
                >
                  <Avatar sx={{ width: 32, height: 32, fontSize: 12 }}>
                    {item.user[0]}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {item.user}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.action}
                    </Typography>
                  </Box>
                  <Chip label={item.time} color={item.color} size="small" />
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* ── Form card ──────────────────────────────────────────────── */}
          <Card>
            <CardHeader title="Quick Action" subheader="Invite a team member" />
            <CardContent>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  label="Full name"
                  placeholder="Jane Smith"
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Email address"
                  placeholder="jane@company.com"
                  fullWidth
                  size="small"
                />
                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                  <Button variant="contained" color="primary" fullWidth>
                    Send Invite
                  </Button>
                  <Button variant="outlined" color="primary">
                    Cancel
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* ── Button showcase ──────────────────────────────────────────── */}
        <Card>
          <CardHeader
            title="Components"
            subheader="Button variants and states"
          />
          <CardContent>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
              <Button variant="contained" color="primary">
                Primary
              </Button>
              <Button variant="outlined" color="primary">
                Outlined
              </Button>
              <Button variant="text" color="primary">
                Text
              </Button>
              <Button variant="contained" color="primary" disabled>
                Disabled
              </Button>
              <Button variant="contained" color="secondary">
                Secondary
              </Button>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {[
                "Design System",
                "Multi-theme",
                "React",
                "MUI",
                "TypeScript",
                "Vitest",
              ].map((tag) => (
                <Chip key={tag} label={tag} color="primary" size="small" />
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
