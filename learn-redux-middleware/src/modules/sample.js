import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../lib/api';
import { startLoading, finishLoading } from "./loading";

// 액션 타입 선언
// 한 요청 당 세 개 만들어야 함

const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'sample/GET_POST_FAILURE';

const GET_USERS = 'sample/GET_USERS';
const GET_USERS_SUCCESS = 'sample/GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'sample/GET_USERS_FAILURE';

// thunk 함수 생성
// thunk 함수 내부에서는 시작할 때, 성공했을 때, 실패했을 때 다른 액션 디스패치

export const getPost = createAction(GET_POST, id => id);
export const getUsers = createAction(GET_USERS);

function* getPostSaga(action){
    yield put(startLoading(GET_POST));  // 로딩 시작
    // 파라미터로 action을 받아 오면 액션의 정보 조회 가능
    try{
        // call을 사용하면 Promise를 반환하는 함수 호출, 기다릴 수 있음
        // 첫 번째 파라미터는 함수, 나머지 파라미터는 해당 함수에 넣을 인수
        const post = yield call(api.getPost, action.payload);  // api.getPost(actioin.payload) 의미
        yield put({
            type: GET_POST_SUCCESS,
            payload: post.data
        });
    }
    catch(e) {
        yield put({
            type: GET_POST_FAILURE,
            payload: e,
            error: true
        });
    };
    yield put(finishLoading(GET_POST));  // 로딩 완료
}

function* getUsersSaga(action){
    yield put(startLoading(GET_USERS));  // 로딩 시작
    try{
        const users = yield call(api.getUsers);
        yield put({
            type: GET_USERS_SUCCESS,
            payload: users.data
        });
    }
    catch(e) {
        yield put({
            type: GET_USERS_FAILURE,
            payload: e,
            error: true
        });
    };
    yield put(finishLoading(GET_USERS));  // 로딩 완료
}

export function* sampleSaga() {
    yield takeLatest(GET_POST, getPostSaga);
    yield takeLatest(GET_USERS, getUsersSaga);
}

// 초기 상태 선언
// 요청의 로딩 중 상태는 loading이라는 객체에서 관리

const initialState = {
    post: null,
    users: null
};

const sample = handleActions(
    {
        [GET_POST_SUCCESS]: (state, action) => ({
            ...state,
            post: action.payload
        }),
        [GET_USERS_SUCCESS]: (state, action) => ({
            ...state,
            users: action.payload
        }),
    },
    initialState
);

export default sample;