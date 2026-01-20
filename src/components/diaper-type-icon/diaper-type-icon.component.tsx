import type { DiaperType } from "@/types";
import { WaterDrop } from "@mui/icons-material";
import { DirtyDiaperIcon, MixedDiaperIcon } from "@/components";

type DiaperTypeIconProps = {
  type: DiaperType;
};

export function DiaperTypeIcon({ type }: DiaperTypeIconProps) {
  switch (type) {
    case "wet":
      return <WaterDrop />;
    case "dirty":
      return <DirtyDiaperIcon />;
    default:
      return <MixedDiaperIcon />;
  }
}
