import { AnyAction } from 'redux';
import { Observable } from 'rxjs';
import { delay, filter, map } from 'rxjs/operators';
import { DECREMENT, INCREMENT } from './action-types';
import { decrement, increment } from './actions';


export const epic = (action$: Observable<AnyAction>, store) => {
    return action$.pipe(
        filter(
            action => (
                action.type === DECREMENT ||
                action.type === INCREMENT
            )
        ),
        delay(1000),
        map(_action => {
            const count = store.getState().count;
            if (count > 0) {
                return decrement()
            } else if (count < 0) {
                return increment()
            } else {
                return { type: 'no-op' };
            }
        })
    );
};
