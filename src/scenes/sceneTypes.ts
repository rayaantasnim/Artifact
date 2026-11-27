import type { TimelineAct } from '../data/timeline';

export interface SceneProps {
  act: TimelineAct;
  actTime: number;
  actDuration: number;
  pointerOffset: { x: number; y: number };
  seekNonce?: number;
}
