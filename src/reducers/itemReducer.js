import { FETCH_ITEMS } from '../actions/types';

const initialState = {
    items: [],
    item: []
}

export default function (state = initialState, action) {
    let items = []
    switch (action.type) {
        case FETCH_ITEMS:
            return {
                ...state,
                items: action.payload
            }

        default:
            return state;
    }
}