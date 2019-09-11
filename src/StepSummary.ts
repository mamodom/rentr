import { Distance, Duration } from "@google/maps";

export interface StepSummary {
  travelMode: string;
  duration: Duration;
  distance: Distance;
  description: string;
  vehicle?: string;
  icon?: string;
  localIcon?: string;
  color?: string;
  name?: string;
  to?: string;
  from?: string;
  numberOfStops?: number;
}
