import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as todayAPI from '../lib/api/today';
import { takeLatest } from 'redux-saga/effects';

// action type
const [
  GET_TODAYSOURCE,
  GET_TODAYSOURCE_SUCCESS,
  GET_TODAYSOURCE_FAILURE,
] = createRequestActionTypes('today/GET_TODAYSOURCE');

// action creator
export const getTodaySource = createAction(GET_TODAYSOURCE);

// saga
const getTodaySourceSaga = createRequestSaga(
  GET_TODAYSOURCE,
  todayAPI.getTodaySource,
);

export function* gettodaysourcesaga() {
  yield takeLatest(GET_TODAYSOURCE, getTodaySourceSaga);
}

// 위는 API 요청과 saga 코드 //

const initialState = {
  today: null,
  error: null,
};

// reducer
const today = handleActions(
  {
    [GET_TODAYSOURCE_SUCCESS]: (state, { payload: today, meta: response }) => ({
      ...state,
      today: today,
    }),
    [GET_TODAYSOURCE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default today;
