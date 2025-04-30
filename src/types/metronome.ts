export interface Config {
  beatCount: number;
  tempo: number;
}

export interface Action {
  type: 'setTempo' | 'setBeatCount';
  data: Partial<Config>;
}

export enum BeatType {
  NORMAL,
  STRONG,
}
