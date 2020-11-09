import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as userAPI from '../lib/api/user';
import { takeLatest } from 'redux-saga/effects';

// 1. API : SIGNUP

// action type
const [
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
] = createRequestActionTypes('user/SIGNUP');

// action creator
export const signup = createAction(SIGNUP, (data) => (data));

// saga
const signupSaga = createRequestSaga(
  SIGNUP,
  userAPI.signup,
);

export function* signupsaga() {
  yield takeLatest(SIGNUP, signupSaga);
}

// 2. API : LOGIN

// action type
const [
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
  ] = createRequestActionTypes('user/LOGIN');
  
  // action creator
  export const login = createAction(LOGIN, (data) => (data));
  
  // saga
  const loginSaga = createRequestSaga(
    LOGIN,
    userAPI.login,
  );
  
  export function* loginsaga() {
    yield takeLatest(LOGIN, loginSaga);
  }

// 3. API : LOGOUT
const LOGOUT = 'user/LOGOUT';

// action creator
export const logout = createAction(LOGOUT);

// saga
const logoutSaga = createRequestSaga(
  LOGOUT,
  userAPI.logout,
);

export function* logoutsaga() {
  yield takeLatest(LOGOUT, logoutSaga);
}

// 위는 API 요청과 saga 코드 //

const initialState = {
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,
  token: localStorage.getItem('token')
  ? JSON.parse(localStorage.getItem('token'))
  : null,
  error: null,
};

// reducer
const user = handleActions(
  {
    [SIGNUP_SUCCESS]: (state, { payload: detail, meta: response }) => ({
      ...state,
      detail: detail,
    }),
    [SIGNUP_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [LOGIN_SUCCESS]: (state, { payload: user, meta: response }) => ({
    ...state,
      user: user.user,
      token: user.token,
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
    ...state,
    error,
    }),
    [LOGOUT]: (state) => ({
      ...state,
      user: null,
      token: null,
      }),
  },
  initialState,
);

export default user;