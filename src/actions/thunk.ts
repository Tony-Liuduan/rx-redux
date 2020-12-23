import { FETCH_ERROR, FETCH_START, FETCH_SUCCESS, POLLING_START, POLLING_STOP } from '@/constants/actionTypes/thunk';
import request from '@apis/request';

let pollingTimer = null;

export function startPolling() {
    return (dispatch) => {
        dispatch(stopPolling());
        dispatch({
            type: POLLING_START,
            payload: {}
        });
        dispatch(fetchUsers());
    }
}

export function stopPolling() {
    clearTimeout(pollingTimer);
    pollingTimer = null;
    return {
        type: POLLING_STOP,
        payload: {}
    }
}

function fetchUsers() {
    return (dispatch, getState) => {
        const delay = pollingTimer === null ? 0 : 15 * 1000;

        pollingTimer = setTimeout(() => {
            dispatch({
                type: FETCH_START,
                payload: {}
            });

            const { thunk } = getState();
            const { pagination } = thunk;
            const param = {
                page: pagination.page,
                pageSize: pagination.pageSize,
            }
            request.get('/api/users', param)
                .then((resp) => {
                    const { total, list } = resp.data
                    dispatch({
                        type: FETCH_SUCCESS,
                        payload: {
                            total,
                            list,
                        }
                    });
                })
                .catch(error => {
                    dispatch({
                        type: FETCH_ERROR,
                        payload: {
                            error: error.message,
                        }
                    });
                })
                .then(() => {
                    dispatch(fetchUsers());
                })
        }, delay);
    }
}