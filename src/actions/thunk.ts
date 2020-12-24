import {
    CHANGE_PAGINATION,
    CHANGE_QUERY,
    CHANGE_SORT,
    FETCH_ERROR,
    FETCH_START,
    FETCH_SUCCESS,
    POLLING_START,
    POLLING_STOP,
} from '@/constants/actionTypes/thunk';
import request from '@apis/request';

let pollingTimer = null;

export function stopPolling() {
    clearTimeout(pollingTimer);
    pollingTimer = null;
    return {
        type: POLLING_STOP,
        payload: {}
    };
}

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

export function changeQuery(query: string) {
    return (dispatch) => {
        dispatch({
            type: CHANGE_QUERY,
            payload: {
                query
            }
        });
        dispatch(startPolling());
    }
}

export function changeSort(sort: string) {
    return (dispatch) => {
        dispatch({
            type: CHANGE_SORT,
            payload: {
                sort
            }
        });
        dispatch(startPolling());
    };
}

export function changePagination(pagination) {
    return (dispatch) => {
        dispatch({
            type: CHANGE_PAGINATION,
            payload: {
                pagination
            }
        })
        dispatch(startPolling())
    }
}

function fetchUsers() {
    return (dispatch, getState) => {
        const delay = pollingTimer === null ? 0 : 10 * 1000;

        pollingTimer = setTimeout(() => {
            dispatch({
                type: FETCH_START,
                payload: {}
            });

            const { thunk } = getState();
            const { sort, query, pagination } = thunk;
            const param = {
                sort,
                query,
                page: pagination.current,
                pageSize: pagination.pageSize,
            };
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
                });
        }, delay);
    }
}