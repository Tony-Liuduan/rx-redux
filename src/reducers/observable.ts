import {
    FETCH_START,
    FETCH_SUCCESS,
    FETCH_ERROR,
    POLLING_START,
    POLLING_STOP,
    CHANGE_QUERY,
    CHANGE_SORT,
    CHANGE_PAGINATION
} from '@constants/actionTypes/observable'

const initialState = {
    list: [],
    pagination: {
        total: 0,
        current: 1,
        pageSize: 10
    },
    isPolling: false,
    loading: false,
    error: null,
    query: '',
    sort: 'forks',
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case POLLING_START: {
            return {
                ...state,
                isPolling: true,
            }
        }
        case POLLING_STOP: {
            return {
                ...state,
                isPolling: false,
            }
        }
        case CHANGE_QUERY: {
            return {
                ...state,
                query: payload.query,
                pagination: {
                    ...state.pagination,
                    page: 1
                },
            }
        }
        case CHANGE_SORT: {
            return {
                ...state,
                sort: payload.sort,
                pagination: {
                    ...state.pagination,
                    page: 1
                },
            }
        }
        case CHANGE_PAGINATION: {
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    ...payload.pagination,
                }
            }
        }
        case FETCH_START: {
            return {
                ...state,
                loading: true,
                error: null,
            }
        }
        case FETCH_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: null,
                list: payload.data.list,
                pagination: {
                    ...state.pagination,
                    total: payload.data.total
                },
            }
        }
        case FETCH_ERROR: {
            return {
                ...state,
                loading: false,
                error: payload.error,
            }
        }
        default: {
            return state
        }
    }
}
