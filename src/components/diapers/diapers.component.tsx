"use client";

import { DeleteOutline, Edit } from "@mui/icons-material";
import {
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import { Fragment, useState } from "react";
import { DiaperTypeIcon, EditModal } from "@/components";
import type { Diaper } from "@/types";

type DiapersProps = {
  diapers: Diaper[];
  onDeleteDiaper(diapers: Diaper): void;
  onEditDiaper(diapers: Partial<Diaper>): void;
  triggerHaptic(pattern: number | number[]): void;
};

export function Diapers({
  diapers,
  onDeleteDiaper,
  onEditDiaper,
  triggerHaptic,
}: DiapersProps) {
  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "long",
    weekday: "long",
    year: "numeric",
  });
  const diapersGroupedByDate = diapers.toReversed().reduce((map, diaper) => {
    const format = dateFormatter.format(new Date(diaper.start));
    map.set(format, [...(map.get(format) ?? []), diaper]);
    return map;
  }, new Map<string, Diaper[]>());
  const [diaperToEdit, setDiaperToEdit] = useState<Diaper | null>(null);

  return (
    <>
      <TableContainer
        component={Paper}
        elevation={1}
        sx={{ border: "1px solid", borderColor: "divider", borderRadius: 1 }}
      >
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: "action.hover" }}>
              <TableCell sx={{ fontSize: 10 }}>Start</TableCell>
              <TableCell sx={{ fontSize: 10 }}>Type</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from(diapersGroupedByDate.entries()).map(
              ([date, diapers]) => (
                <Fragment key={date}>
                  <TableRow>
                    <TableCell align="center" colSpan={3} sx={{ py: 2 }}>
                      {date}
                    </TableCell>
                  </TableRow>
                  {diapers.map((diaper) => (
                    <TableRow key={diaper.id}>
                      <TableCell>
                        {new Date(diaper.start).toLocaleTimeString(undefined, {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </TableCell>
                      <TableCell>
                        <Box
                          component="span"
                          sx={{
                            alignItems: "center",
                            display: "flex",
                            gap: 0.5,
                          }}
                        >
                          <Typography
                            color="primary"
                            component="span"
                            sx={{ alignItems: "center", display: "flex" }}
                          >
                            <DiaperTypeIcon type={diaper.type} />
                          </Typography>
                          <Typography
                            component="span"
                            variant="body2"
                          >{`${diaper.type[0].toUpperCase()}${diaper.type.slice(
                            1,
                          )}`}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Box>
                          <IconButton
                            size="small"
                            onClick={() => {
                              triggerHaptic(30);
                              setDiaperToEdit(diaper);
                            }}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => {
                              triggerHaptic(30);
                              onDeleteDiaper(diaper);
                            }}
                          >
                            <DeleteOutline fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </Fragment>
              ),
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {diaperToEdit && (
        <EditModal
          diaper={diaperToEdit}
          onCancel={() => setDiaperToEdit(null)}
          onEdit={(diaper) => {
            onEditDiaper(diaper);
            setDiaperToEdit(null);
          }}
        />
      )}
    </>
  );
}
