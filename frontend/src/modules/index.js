import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import loading from "./loading";
import today, { gettodaysourcesaga } from './today';
import user, { signupsaga, loginsaga, logoutsaga } from './user';
const rootReducer = combineReducers({
  loading,
  today,
  user,
});

export function* rootSaga() {
  yield all([gettodaysourcesaga(), signupsaga(), loginsaga(), logoutsaga()]);
}

export default rootReducer;
