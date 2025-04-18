export interface Config {
  beatCount: number;
  tempo: number;
}

export interface Action {
  type: 'setTempo' | 'setBeatCount';
  data: Partial<Config>;
}

export const MIN_BEAT_COUNT =  1;
export const MAX_BEAT_COUNT = 16;
export const MIN_TEMPO = 1;
export const MAX_TEMPO = 300;

export function reducer(state: Config, action: Action) {
  const newState = { ...state };

  switch (action.type) {
    case 'setTempo': {
      let newTempo = action.data.tempo;
      if (newTempo === undefined) return state;

      newTempo = Math.min(newTempo, MAX_TEMPO);
      newTempo = Math.max(newTempo, MIN_TEMPO);
      newState.tempo = newTempo;
      break;
    }

    case 'setBeatCount': {
      let beatCount = action.data.beatCount;
      if (beatCount === undefined) return state;

      beatCount = Math.min(beatCount, MAX_BEAT_COUNT);
      beatCount = Math.max(beatCount, MIN_BEAT_COUNT);
      newState.beatCount = beatCount;
      break;
    }
  }

  return newState;
}
