"use client";

import { type Diaper, DiaperType, diaperType } from "@/types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  MenuItem,
  Select,
  Typography,
  FormControl,
  InputLabel,
  Box,
  Button,
  TextField,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { type FormEvent, useId, useState } from "react";

type EditModalProps = {
  diaper: Diaper;
  onCancel(): void;
  onEdit: (diaper: Partial<Diaper>) => void;
};

export function EditModal({ diaper, onCancel, onEdit }: EditModalProps) {
  const diaperTypeSelectLabelId = useId();

  const [notes, setNotes] = useState<string>(diaper.notes ?? "");
  const [start, setStart] = useState<dayjs.Dayjs>(dayjs(diaper.start));
  const [type, setType] = useState<DiaperType>(diaper.type);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onEdit({
      ...diaper,
      notes,
      start: start.toISOString(),
      type,
    });
  }

  return (
    <Dialog
      fullWidth={true}
      open={Boolean(diaper)}
      slotProps={{
        paper: {
          style: {
            maxWidth: 420,
          },
        },
      }}
      onClose={onCancel}
    >
      <Box component="form" onSubmit={handleSubmit}>
        <DialogTitle>
          <Typography component="span" variant="h6" fontWeight="bold">
            Edit Diaper
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            component="fieldset"
            sx={{
              border: "none",
              m: 0,
              px: 0,
              py: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <DateTimePicker
              label="Start"
              name="start"
              timeSteps={{ hours: 1, minutes: 1 }}
              value={start}
              onChange={(value) => {
                if (value !== null) {
                  setStart(value);
                }
              }}
            />
            <FormControl fullWidth={true}>
              <InputLabel id={diaperTypeSelectLabelId}>Type</InputLabel>
              <Select
                label="Type"
                labelId={diaperTypeSelectLabelId}
                name="type"
                value={type}
                onChange={(event) => setType(event.target.value)}
              >
                {diaperType.map((type) => (
                  <MenuItem key={type} value={type}>
                    {`${type[0].toUpperCase()}${type.slice(1)}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Notes"
              multiline={true}
              rows={4}
              name="notes"
              value={notes}
              onChange={(event) => setNotes(event.currentTarget.value)}
            />
          </Box>
          <Box sx={{ alignSelf: "flex-end", display: "flex", gap: 1 }}>
            <Button type="button" variant="outlined" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  );
}
