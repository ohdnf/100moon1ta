import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as userAPI from '../lib/api/user';
import { takeLatest } from 'redux-saga/effects';

const [
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
] = createRequestActionTypes('user/SIGNUP');

export const signup = createAction(SIGNUP, (data) => (data));

const signupSaga = createRequestSaga(
  SIGNUP,
  userAPI.signup,
);

export function* signupsaga() {
  yield takeLatest(SIGNUP, signupSaga);
}

const [
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
] = createRequestActionTypes('user/LOGIN');

export const login = createAction(LOGIN, (data) => (data));

const loginSaga = createRequestSaga(
  LOGIN,
  userAPI.login,
);

export function* loginsaga() {
  yield takeLatest(LOGIN, loginSaga);
}

const LOGOUT = 'user/LOGOUT';

export const logout = createAction(LOGOUT);

const logoutSaga = createRequestSaga(
  LOGOUT,
  userAPI.logout,
);

export function* logoutsaga() {
  yield takeLatest(LOGOUT, logoutSaga);
}

const ERRORDELETE = 'user/ERRORDELETE';

export const errorDelete = createAction(ERRORDELETE);

const initialState = {
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,
  token: localStorage.getItem('token')
    ? localStorage.getItem('token')
    : null,
  error: null,
};

const user = handleActions(
  {
    [SIGNUP_SUCCESS]: (state, { payload: detail, meta: response }) => ({
      ...state,
      error: null,
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
      error: null,
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [LOGOUT]: (state) => ({
      ...state,
      user: null,
      token: null,
      error: null
    }),
    [ERRORDELETE]: (state) => ({
      ...state,
      error: null
    }),
  },
  initialState,
);

export default user;