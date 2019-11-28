import { SET_USER_INFO } from '../actions/types';

const initialState = {
    item: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_USER_INFO:
            return {
                ...state,
                item: action.payload
            }
        default:
            return state;
    }
}