import {combineReducers} from 'redux';
import user from './user';
import { persistReducer } from 'redux-persist';	// 추가

// export const USER_LOGOUT = "USER_LOGOUT"
// export const USER_LOGIN = "USER_LOGIN"
// export const userLogOut = () => ({
//   type: USER_LOGOUT,
// });

import storage from 'redux-persist/lib/storage';	// 추가

const persistConfig = {
  key: 'root',
  storage,
}
const appReducer = combineReducers({
  user,
  //여기에 추가될 reducer를 선언하기.
})

const rootReducer = (state, action) => {
  // if (action.type === USER_LOGOUT) {
  //   state = undefined;
  // }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);	// 추가

export default persistedReducer;
