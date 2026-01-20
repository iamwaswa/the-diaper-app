"use client";

import { Box, Button, Paper, Typography } from "@mui/material";
import { type DiaperType, diaperType } from "@/types";
import { WaterDrop } from "@mui/icons-material";
import { DirtyDiaperIcon, MixedDiaperIcon } from "@/components";

type TrackerProps = {
  onTrack(type: DiaperType): void;
};

export function Tracker({ onTrack }: TrackerProps) {
  return (
    <Paper
      elevation={1}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: 240,
        mb: 3,
        py: 5,
        px: 3,
        position: "relative",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 4,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {diaperType.map((type) => {
          if (type === "wet") {
            return (
              <Button key={type} color="primary" onClick={() => onTrack(type)}>
                <Box
                  sx={{
                    alignItems: "center",
                    borderRadius: "50%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <WaterDrop />
                  <Typography fontWeight="bold" variant="body2">
                    Wet
                  </Typography>
                </Box>
              </Button>
            );
          }

          if (type === "dirty") {
            return (
              <Button key={type} color="primary" onClick={() => onTrack(type)}>
                <Box
                  sx={{
                    alignItems: "center",
                    borderRadius: "50%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <DirtyDiaperIcon />
                  <Typography fontWeight="bold" variant="body2">
                    Dirty
                  </Typography>
                </Box>
              </Button>
            );
          }

          return (
            <Button key={type} color="primary" onClick={() => onTrack(type)}>
              <Box
                sx={{
                  alignItems: "center",
                  borderRadius: "50%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <MixedDiaperIcon />
                <Typography fontWeight="bold" variant="body2">
                  Mixed
                </Typography>
              </Box>
            </Button>
          );
        })}
      </Box>
    </Paper>
  );
}
