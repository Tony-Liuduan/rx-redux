import { interval, from, of, Observable } from 'rxjs';
import {
    map,
    distinctUntilChanged,
    switchMap,
    takeUntil,
    startWith,
    catchError,
} from 'rxjs/operators';
import { isEqual } from 'lodash-es';
import request from '@apis/request';
import {
    POLLING_STOP,
    POLLING_START,
} from '@constants/actionTypes/observable';
import { fetchError, fetchStart, fetchSuccess } from '@/actions/observable';

export default (action$, state$) => {
    const startPollingAction$ = action$.ofType(POLLING_START);
    const stopPollingAction$ = action$.ofType(POLLING_STOP);

    const interval$ = interval(10 * 1000);
    const paramsState$: Observable<object> = state$.pipe(
        map(({ observable }: any) => {
            const { pagination, sort, query } = observable;
            return {
                sort,
                query,
                page: pagination.current,
                pageSize: pagination.pageSize,
            }
        }),
        distinctUntilChanged(isEqual)
    );

    return startPollingAction$.pipe(
        takeUntil(stopPollingAction$),
        switchMap(_action => paramsState$),
        switchMap((paramsState: object) => {
            return interval$.pipe(
                takeUntil(stopPollingAction$),
                startWith(0),
                switchMap(() =>
                    from(request.get('/api/users', paramsState))
                        .pipe(
                            startWith(0),
                            map(res => {
                                if (!res) {
                                    return fetchStart();
                                }
                                return fetchSuccess(res.data);
                            }),
                            catchError((e) => of(fetchError(e.message))),
                        )
                ),
            );
        }),
    );
};
