import { combineReducers, legacy_createStore as createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
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

// 创建数据仓库
const store = createStore(
  persistReducerConfig,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
// 创建持久化 store
const persistor = persistStore(store);

export { store, persistor };
