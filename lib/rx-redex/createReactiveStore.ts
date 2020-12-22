import { Subject } from "rxjs";
import {
    scan,
    startWith,
    tap,
} from 'rxjs/operators';

export function createReactiveStore(reducer, initialState) {
    let currentState = initialState;
    const action$ = new Subject();

    const store$ = action$.pipe(
        startWith(initialState),
        scan(reducer, initialState),
        tap(state => currentState = state),
    );

    return {
        dispatch: action => action$.next(action),
        getStore: () => currentState,
        subscribe: render => store$.subscribe(store => render(store)),
    };
}
