import { SET_USER_INFO } from './types';

export const setUserInfo = (user) => dispatch => {
    dispatch({
        type: SET_USER_INFO,
        payload: user
    })
}