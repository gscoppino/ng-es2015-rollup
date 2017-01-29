import { static as Immutable } from 'seamless-immutable';

$ngReduxImmutableDecorator.$inject = ['$delegate'];
function $ngReduxImmutableDecorator($delegate) {
    $delegate.getStateUnsafe = $delegate.getState;
    $delegate.subscribeAll = $delegate.subscribe;

    $delegate.getState = (stateFn) => {
        if (stateFn) {
            return Immutable.asMutable(stateFn($delegate.getStateUnsafe()), { deep: true });
        } else {
            return Immutable.asMutable($delegate.getStateUnsafe(), { deep: true });
        }
    };

    $delegate.subscribe = (stateFn, cb) => {
        cb = cb || stateFn;

        if (!stateFn) {
            return;
        }

        if (cb === stateFn) {
            return $delegate.subscribeAll(cb);
        }

        let value = stateFn($delegate.getStateUnsafe());
        if (value !== undefined) {
            cb(Immutable.asMutable(value, { deep: true }));
        }

        return $delegate.subscribeAll(() => {
            let nextValue = stateFn($delegate.getStateUnsafe());
            if (nextValue !== value) {
                value = nextValue;
                cb(Immutable.asMutable(value, { deep: true }));
            }
        });
    };

    return $delegate;
}

export default $ngReduxImmutableDecorator;
