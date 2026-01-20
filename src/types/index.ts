export const diaperType = ["wet", "dirty", "mixed"] as const;

export type DiaperType = (typeof diaperType)[number];

export type Diaper = {
  /** The unique identifier (usually the timestamp or a UUID) */
  id: string;
  /** ISO string representing when the diaper was recorded */
  start: string;
  /** Type of diaper */
  type: DiaperType;
  /** Optional notes like "color" or "consistency" */
  notes?: string;
};
