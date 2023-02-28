import { BodyEditMactche } from './BodyEditMatche';

export interface BodyCreateMatche extends BodyEditMactche {
  homeTeamId: number;
  awayTeamId: number;
}
