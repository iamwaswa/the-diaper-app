"use client";

import { Button, Box } from "@mui/material";

type ClearSessionProps = {
  onClear(): void;
};

export function ClearSession({ onClear }: ClearSessionProps) {
  return (
    <Box textAlign="center" mt={3} pb={4}>
      <Button
        color="inherit"
        size="small"
        sx={{ opacity: 0.4 }}
        onClick={onClear}
      >
        Clear Session
      </Button>
    </Box>
  );
}
