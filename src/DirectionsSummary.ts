import { Distance, Duration } from "@google/maps";
import { StepSummary } from "./StepSummary";

export interface DirectionsSummary {
  distance: Distance;
  duration: Duration;
  steps: StepSummary[];
  modes: { [k: string]: boolean };
}
