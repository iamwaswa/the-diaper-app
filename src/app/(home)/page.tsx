"use client";

import { DarkMode, LightMode } from "@mui/icons-material";
import {
  Container,
  Typography,
  IconButton,
  Stack,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState, useEffectEvent, useLayoutEffect } from "react";
import { ClearSession, Diapers, Tracker } from "@/components";
import { useLocalStorage } from "@/hooks";
import { createTheme } from "@/theme";
import type { Diaper } from "@/types";

export default function HomePage() {
  const [diapers, setDiapers] = useLocalStorage<Diaper[]>(
    "diapers-pwa-final",
    [],
  );
  const [isDarkMode, setIsDarkMode] = useLocalStorage(
    "theme-diapers-pwa-final",
    false,
  );
  const [mounted, setMounted] = useState<boolean>(false);
  const afterMount = useEffectEvent(() => {
    setMounted(true);
  });
  useLayoutEffect(() => {
    afterMount();
  }, []);

  if (!mounted) {
    return null;
  }

  function triggerHaptic(pattern: number | number[]) {
    if (typeof window !== "undefined" && window.navigator.vibrate) {
      window.navigator.vibrate(pattern);
    }
  }

  return (
    <ThemeProvider theme={createTheme(isDarkMode ? "dark" : "light")}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <Container maxWidth="sm" sx={{ py: 3 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6" fontWeight="bold">
              The Diaper App
            </Typography>
            <IconButton onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Stack>
          <Tracker
            onTrack={(type) => {
              setDiapers((currentDiapers) => [
                ...currentDiapers,
                {
                  id: window.crypto.randomUUID(),
                  start: new Date().toISOString(),
                  type,
                },
              ]);
              triggerHaptic(70);
            }}
          />
          <Diapers
            diapers={diapers}
            onDeleteDiaper={(diaper) =>
              setDiapers((currentDiapers) =>
                currentDiapers.filter(
                  (currentDiaper) => currentDiaper.id !== diaper.id,
                ),
              )
            }
            onEditDiaper={(diaper) =>
              setDiapers((currentDiapers) =>
                currentDiapers.map((currentDiaper) =>
                  currentDiaper.id === diaper.id
                    ? { ...currentDiaper, ...diaper }
                    : currentDiaper,
                ),
              )
            }
            triggerHaptic={triggerHaptic}
          />
          <ClearSession onClear={() => setDiapers([])} />
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
