import produce from 'immer';
import { AnyAction } from 'redux';

const globalState = {
  num: 20,
};

// global reducer
const global = (state = globalState, action: AnyAction) =>
  produce(state, (draftState) => {
    switch (action.type) {
      case 'add':
        draftState.num = action.num;
        break;
      default:
        return draftState;
    }
  });

export default global;
