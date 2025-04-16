export interface Config {
  beatCount: number;
  tempo: number;
}

export interface Action {
  type: 'setTempo' | 'setBeatCount';
  data: Partial<Config>;
}

export const initial = {
  MIN_BEAT_COUNT: 1,
  MAX_BEAT_COUNT: 16,
  MIN_TEMPO: 1,
  MAX_TEMPO: 300,
};

export function metronomeReducer(state: Config, action: Action) {
  const newState = { ...state };

  switch (action.type) {
    case 'setTempo': {
      let newTempo = action.data.tempo;
      if (newTempo === undefined) return state;

      newTempo = Math.min(newTempo, initial.MAX_TEMPO);
      newTempo = Math.max(newTempo, initial.MIN_TEMPO);
      newState.tempo = newTempo;
      break;
    }

    case 'setBeatCount': {
      let beatCount = action.data.beatCount;
      if (beatCount === undefined) return state;

      beatCount = Math.min(beatCount, initial.MAX_BEAT_COUNT);
      beatCount = Math.max(beatCount, initial.MIN_BEAT_COUNT);
      newState.beatCount = beatCount;
      break;
    }
  }

  return newState;
}
