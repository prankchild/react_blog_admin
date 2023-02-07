import * as types from '@/store/mutation-types';
import produce from 'immer';
import { AnyAction } from 'redux';

interface GlobalState {
  token: {
    accessToken: string;
    refreshToken: string;
    tokenTime: string | Date;
  };
}

const globalState: GlobalState = {
  token: {
    accessToken: '',
    refreshToken: '',
    tokenTime: '',
  },
};

// global reducer
const global = (state = globalState, action: AnyAction) =>
  produce(state, (draftState) => {
    switch (action.type) {
      case types.SET_TOKEN:
        draftState.token = action.token;
        break;
      default:
        return draftState;
    }
  });

export default global;
