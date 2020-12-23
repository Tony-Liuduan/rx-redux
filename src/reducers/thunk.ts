import {
    FETCH_START,
    FETCH_SUCCESS,
    FETCH_ERROR,
    POLLING_START,
    POLLING_STOP
} from '@constants/actionTypes/thunk'

const initialState = {
    list: [],
    pagination: {
        total: 0,
        page: 1,
        pageSize: 10
    },
    isPolling: false,
    loading: false,
    error: null,
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
                list: payload.list,
                pagination: {
                    ...state.pagination,
                    total: payload.total
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
