import * as types from '@/store/mutation-types';
import produce from 'immer';
import { AnyAction } from 'redux';

const globalState = {
  token: '初始默认undefined',
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
