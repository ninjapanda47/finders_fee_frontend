import { FETCH_ITEMS } from './types';
import * as findersFeeAPI from '../utils/api'

export const getAllItems = () => dispatch => {
    findersFeeAPI.getAllItems().then(data => {
        dispatch({
            type: FETCH_ITEMS,
            payload: data
        })
    });
}

export const getItemsByCategory = (category) => dispatch => {
    findersFeeAPI.getItemsByCategory(category).then(data => {
        dispatch({
            type: FETCH_ITEMS,
            payload: data
        })
    });
}