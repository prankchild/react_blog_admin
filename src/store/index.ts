import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
  Store,
} from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reduxPromise from 'redux-promise';
import reduxThunk from 'redux-thunk';
import global from './modules/global/reducer';

const reducer = combineReducers({
  global,
});

// redux 持久化配置
const persistConfig = {
  key: 'redux-state',
  storage: storage,
};
const persistReducerConfig = persistReducer(persistConfig, reducer);
// 开启 redux-devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// 使用 redux 中间件
const middleWares = applyMiddleware(reduxThunk, reduxPromise);
// 创建数据仓库
const store: Store = createStore(
  persistReducerConfig,
  composeEnhancers(middleWares)
);
// 创建持久化 store
const persistor = persistStore(store);

export { store, persistor };
