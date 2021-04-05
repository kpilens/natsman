import { Observable } from 'rxjs'

/**
 * Used to create Error subclasses until the community moves away from ES5.
 *
 * This is because compiling from TypeScript down to ES5 has issues with subclassing Errors
 * as well as other built-in types: https://github.com/Microsoft/TypeScript/issues/12123
 *
 * @param createImpl A factory function to create the actual constructor implementation. The returned
 * function should be a named function that calls `_super` internally.
 */
export function createErrorClass<T>(createImpl: (_super: any) => any): T {
    const _super = (instance: any) => {
        Error.call(instance);
        instance.stack = new Error().stack;
    };

    const ctorFunc = createImpl(_super);
    ctorFunc.prototype = Object.create(Error.prototype);
    ctorFunc.prototype.constructor = ctorFunc;
    return ctorFunc;
}



/**
 * An error thrown when an Observable or a sequence was queried but has no
 * elements.
 *
 * @see {@link first}
 * @see {@link last}
 * @see {@link single}
 *
 * @class EmptyError
 */

export type EmptyError = Error
export interface EmptyErrorCtor {
    new(): EmptyError;
}

export const EmptyError: EmptyErrorCtor = createErrorClass((_super) => function EmptyErrorImpl(this: any) {
    _super(this);
    this.name = 'EmptyError';
    this.message = 'no elements in sequence';
});

/**
 * Converts an observable to a promise by subscribing to the observable,
 * waiting for it to complete, and resolving the returned promise with the
 * last value from the observed stream.
 *
 * If the observable stream completes before any values were emitted, the
 * returned promise will reject with {@link EmptyError}.
 *
 * If the observable stream emits an error, the returned promise will reject
 * with that error.
 *
 * **WARNING**: Only use this with observables you *know* will complete. If the source
 * observable does not complete, you will end up with a promise that is hung up, and
 * potentially all of the state of an async function hanging out in memory. To avoid
 * this situation, look into adding something like {@link timeout}, {@link take},
 * {@link takeWhile}, or {@link takeUntil} amongst others.
 *
 * ### Example
 *
 * Wait for the last value from a stream and emit it from a promise in
 * an async function.
 *
 * ```ts
 * import { interval, lastValueFrom } from 'rxjs';
 * import { take } from 'rxjs/operators';
 *
 * async function execute() {
 *    const source$ = interval(2000).pipe(take(10));
 *    const finalNumber = await lastValueFrom(source$);
 *    console.log(`The final number is ${finalNumber}`);
 * }
 *
 * execute();
 *
 * // Expected output:
 * // "The final number is 9"
 * ```
 *
 * @param source the observable to convert to a promise
 */
export function lastValueFrom<T>(source: Observable<T>) {
    return new Promise<T>((resolve, reject) => {
        let _hasValue = false;
        let _value: T;
        source.subscribe({
            next: value => {
                _value = value;
                _hasValue = true;
            },
            error: reject,
            complete: () => {
                if (_hasValue) {
                    resolve(_value);
                } else {
                    reject(new EmptyError());
                }
            },
        });
    });
}