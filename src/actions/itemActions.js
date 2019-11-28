import { FETCH_ITEMS } from './types';
import * as findersFeeAPI from '../utils/api'

export const getAllItems = () => dispatch => {
    findersFeeAPI.getAll().then(data => {
        dispatch({
            type: FETCH_ITEMS,
            payload: data
        })
    });
}
