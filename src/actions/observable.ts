import {
    CHANGE_PAGINATION,
    CHANGE_QUERY,
    CHANGE_SORT,
    FETCH_ERROR,
    FETCH_START,
    FETCH_SUCCESS,
    POLLING_START,
    POLLING_STOP,
} from '@/constants/actionTypes/observable';

export function stopPolling() {
    return {
        type: POLLING_STOP,
        payload: {}
    };
}

export function startPolling() {
    return {
        type: POLLING_START,
        payload: {}
    };
}

export function changeQuery(query: string) {
    return {
        type: CHANGE_QUERY,
        payload: {
            query
        }
    };
}

export function changeSort(sort: string) {
    return {
        type: CHANGE_SORT,
        payload: {
            sort
        }
    };
}

export function changePagination(pagination) {
    return {
        type: CHANGE_PAGINATION,
        payload: {
            pagination
        }
    };
}

export function fetchStart() {
    return {
        type: FETCH_START,
        payload: {},
    };
}

export function fetchSuccess(data) {
    return {
        type: FETCH_SUCCESS,
        payload: {
            data,
        }
    };
}

export function fetchError(error) {
    return {
        type: FETCH_ERROR,
        payload: {
            error,
        }
    };
}
