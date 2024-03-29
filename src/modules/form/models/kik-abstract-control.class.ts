import {Observable, Subject, Subscription} from "rxjs";
import structuredClone from "@ungap/structured-clone";
//
import {KikAsyncValidatorFn, KikValidationErrors, KikValidatorFn} from "./kik-validator.model";
import {KikFormHooks} from "./kik-form-hooks.type";
import {KikAbstractControlOptions} from "./kik-abstract-control-options.interface";
import {FNS} from "../shared/kik-form-validators.class";
import {KikFormGroup} from "./kik-form-group.class";
import {KikFormArray} from "./kik-form-array.class";

export enum KikFormControlStates {
    VALID = "VALID",
    INVALID = "INVALID",
    PENDING = "PENDING",
    DISABLED = "DISABLED"
}

/* eslint-disable @typescript-eslint/naming-convention */
// IsAny checks if T is `any`, by checking a condition that couldn't possibly be true otherwise.
export type ɵIsAny<T, Y, N> = 0 extends (1 & T) ? Y : N;

/**
 * `TypedOrUntyped` allows one of two different types to be selected, depending on whether the Forms
 * class it's applied to is typed or not.
 *
 * This is for internal Angular usage to support typed forms; do not directly use it.
 */
export type ɵTypedOrUntyped<T, Typed, Untyped> = ɵIsAny<T, Untyped, Typed>;

/**
 * Value gives the value type corresponding to a control type.
 *
 * Note that the resulting type will follow the same rules as `.value` on your control, group, or
 * array, including `undefined` for each group element which might be disabled.
 *
 * If you are trying to extract a value type for a data model, you probably want {@link RawValue},
 * which will not have `undefined` in group keys.
 *
 * @usageNotes
 *
 * ### `KikFormControl` value type
 *
 * You can extract the value type of a single control:
 *
 * ```ts
 * type NameControl = KikFormControl<string>;
 * type NameValue = Value<NameControl>;
 * ```
 *
 * The resulting type is `string`.
 *
 * ### `FormGroup` value type
 *
 * Imagine you have an interface defining the controls in your group. You can extract the shape of
 * the values as follows:
 *
 * ```ts
 * interface PartyFormControls {
 *   address: KikFormControl<string>;
 * }
 *
 * // Value operates on controls; the object must be wrapped in a FormGroup.
 * type PartyFormValues = Value<FormGroup<PartyFormControls>>;
 * ```
 *
 * The resulting type is `{address: string|undefined}`.
 *
 * ### `FormArray` value type
 *
 * You can extract values from FormArrays as well:
 *
 * ```ts
 * type GuestNamesControls = FormArray<KikFormControl<string>>;
 *
 * type NamesValues = Value<GuestNamesControls>;
 * ```
 *
 * The resulting type is `string[]`.
 *
 * **Internal: not for public use.**
 */
export type ɵValue<T extends KikAbstractControl | undefined> =
    T extends KikAbstractControl<any, any> ? T["value"] : never;

/**
 * RawValue gives the raw value type corresponding to a control type.
 *
 * Note that the resulting type will follow the same rules as `.getRawValue()` on your control,
 * group, or array. This means that all controls inside a group will be required, not optional,
 * regardless of their disabled state.
 *
 * You may also wish to use {@link ɵValue}, which will have `undefined` in group keys (which can be
 * disabled).
 *
 * @usageNotes
 *
 * ### `FormGroup` raw value type
 *
 * Imagine you have an interface defining the controls in your group. You can extract the shape of
 * the raw values as follows:
 *
 * ```ts
 * interface PartyFormControls {
 *   address: KikFormControl<string>;
 * }
 *
 * // RawValue operates on controls; the object must be wrapped in a FormGroup.
 * type PartyFormValues = RawValue<FormGroup<PartyFormControls>>;
 * ```
 *
 * The resulting type is `{address: string}`. (Note the absence of `undefined`.)
 *
 *  **Internal: not for public use.**
 */
export type ɵRawValue<T extends KikAbstractControl | undefined> = T extends KikAbstractControl<any, any> ?
    (T["setValue"] extends ((v: infer R) => void) ? R : never) :
    never;

// Disable clang-format to produce clearer formatting for these multiline types.
// clang-format off

/**
 * Tokenize splits a string literal S by a delimiter D.
 */
export type ɵTokenize<S extends string, D extends string> =
    string extends S ? string[] : /* S must be a literal */
        S extends `${infer T}${D}${infer U}` ? [T, ...ɵTokenize<U, D>] :
            [S] /* Base case */
    ;

/**
 * CoerceStrArrToNumArr accepts an array of strings, and converts any numeric string to a number.
 */
export type ɵCoerceStrArrToNumArr<S> =
// Extract the head of the array.
    S extends [infer Head, ...infer Tail] ?
        // Using a template literal type, coerce the head to `number` if possible.
        // Then, recurse on the tail.
        Head extends `${number}` ?
            [number, ...ɵCoerceStrArrToNumArr<Tail>] :
            [Head, ...ɵCoerceStrArrToNumArr<Tail>] :
        [];

/**
 * Navigate takes a type T and an array K, and returns the type of T[K[0]][K[1]][K[2]]...
 */
export type ɵNavigate<T, K extends (Array<string | number>)> =
    T extends object ? /* T must be indexable (object or array) */
        (K extends [infer Head, ...infer Tail] ? /* Split K into head and tail */
            (Head extends keyof T ? /* head(K) must index T */
                (Tail extends (string | number)[] ? /* tail(K) must be an array */
                    [] extends Tail ? T[Head] : /* base case: K can be split, but Tail is empty */
                        (ɵNavigate<T[Head], Tail>) /* explore T[head(K)] by tail(K) */ :
                    any) /* tail(K) was not an array, give up */ :
                never) /* head(K) does not index T, give up */ :
            any) /* K cannot be split, give up */ :
        any /* T is not indexable, give up */
    ;

/**
 * ɵWriteable removes readonly from all keys.
 */
export type ɵWriteable<T> = {
    -readonly [P in keyof T]: T[P]
};

/**
 * GetProperty takes a type T and some property names or indices K.
 * If K is a dot-separated string, it is tokenized into an array before proceeding.
 * Then, the type of the nested property at K is computed: T[K[0]][K[1]][K[2]]...
 * This works with both objects, which are indexed by property name, and arrays, which are indexed
 * numerically.
 *
 * For internal use only.
 */
export type ɵGetProperty<T, K> =
// K is a string
    K extends string ? ɵGetProperty<T, ɵCoerceStrArrToNumArr<ɵTokenize<K, ".">>> :
        // Is is an array
        ɵWriteable<K> extends Array<string | number> ? ɵNavigate<T, ɵWriteable<K>> :
            // Fall through permissively if we can't calculate the type of K.
            any;

// clang-format on
/* eslint-enable @typescript-eslint/naming-convention */

export abstract class KikAbstractControl<TValue = any, TRawValue extends TValue = TValue> {

    set asyncValidator(asyncValidatorFn) {
        this._rawAsyncValidators = this._composedAsyncValidatorFn = asyncValidatorFn;
    }

    /**
     * @description
     * Asynchronous validator function composed of all the asynchronous validators registered with
     * this directive.
     */
    get asyncValidator(): KikAsyncValidatorFn | null {
        return this._composedAsyncValidatorFn || null;
    }

    /**
     * A control is `dirty` if the user has changed the value
     * in the UI.
     *
     * @returns True if the user has changed the value of this control in the UI; compare `pristine`.
     * Programmatic changes to a control's value do not mark it dirty.
     */
    get dirty(): boolean {
        return !this.pristine;
    }

    /**
     * A control is `disabled` when its `status` is `DISABLED`.
     *
     * Disabled controls are exempt from validation checks and
     * are not included in the aggregate value of their ancestor
     * controls.
     *
     * @see {@link AbstractControl.status}
     *
     * @returns True if the control is disabled, false otherwise.
     */
    get disabled(): boolean {
        return this.status === KikFormControlStates.DISABLED;
    }

    /**
     * A control is `enabled` as long as its `status` is not `DISABLED`.
     *
     * @returns True if the control has any status other than 'DISABLED',
     * false if the status is 'DISABLED'.
     *
     * @see {@link KikAbstractControl.status}
     *
     */
    get enabled(): boolean {
        return this.status !== KikFormControlStates.DISABLED;
    }

    /**
     * returns the first error if any
     */
    get error(): string | void {
        return this._errors ? Object.keys(this._errors)[0] : void 0;
    }

    get errors(): KikValidationErrors | null {
        return this._errors ? structuredClone(this._errors) : null;
    }

    /**
     * A control is `invalid` when its `status` is `INVALID`.
     *
     * @see {@link KikAbstractControl.status}
     *
     * @returns True if this control has failed one or more of its validation checks,
     * false otherwise.
     */
    get invalid(): boolean {
        return this.status === KikFormControlStates.INVALID;
    }

    /**
     * The parent control.
     */
    get parent(): KikFormGroup | KikFormArray | null {
        return this._parent;
    }


    /**
     * A control is `pending` when its `status` is `PENDING`.
     *
     * @see {@link KikAbstractControl.status}
     *
     * @returns True if this control is in the process of conducting a validation check,
     * false otherwise.
     */
    get pending(): boolean {
        return this.status === KikFormControlStates.PENDING;
    }

    /**
     * Retrieves the top-level ancestor of this control.
     */
    get root(): KikAbstractControl {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let x: KikAbstractControl = this;

        while (x._parent) {
            x = x._parent;
        }

        return x;
    }

    get status(): KikFormControlStates {
        return this._status;
    }

    get statusChanges(): Observable<KikFormControlStates> {
        return this._statusChanges$.asObservable();
    }

    get untouched(): boolean {
        return !this.touched;
    }

    /**
     * Reports the update strategy of the `AbstractControl` (meaning
     * the event on which the control updates itself).
     * Possible values: `'change'` | `'blur'` | `'submit'`
     * Default value: `'change'`
     */
    get updateOn(): KikFormHooks {
        return this._updateOn ? this._updateOn : (this.parent ? this.parent.updateOn : "change");
    }

    /**
     * A control is `valid` when its `status` is `VALID`.
     *
     * @see {@link KikAbstractControl.status}
     *
     * @returns True if the control has passed all of its validation tests,
     * false otherwise.
     */
    get valid(): boolean {
        return this.status === KikFormControlStates.VALID;
    }

    set validator(validatorFn: KikValidatorFn | null) {
        this._rawValidators = this._composedValidatorFn = validatorFn;
    }

    /**
     * Returns the function that is used to determine the validity of this control synchronously.
     * If multiple validators have been added, this will be a single composed function.
     * See `Validators.compose()` for additional information.
     */
    get validator(): KikValidatorFn | null {
        return this._composedValidatorFn;
    }

    get valueChanges(): Observable<any> {
        return this._valueChanges$.asObservable();
    }

    /**
     * Indicates that a control has its own pending asynchronous validation in progress.
     *
     * @internal
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _hasOwnPendingAsyncValidator: boolean = !1;

    /** @internal */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _onDisabledChange: Array<(isDisabled: boolean) => void> = [];

    /** @internal */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _pendingDirty = false;

    /** @internal */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _pendingTouched = false;

    /** @internal */
        // eslint-disable-next-line @typescript-eslint/naming-convention
    _updateOn?: KikFormHooks;

    /**
     * A control is `pristine` if the user has not yet changed
     * the value in the UI.
     *
     * @returns True if the user has not yet changed the value in the UI; compare `dirty`.
     * Programmatic changes to a control's value do not mark it dirty.
     */
    public readonly pristine: boolean = true;

    /**
     * True if the control is marked as `touched`.
     *
     * A control is marked `touched` once the user has triggered
     * a `blur` event on it.
     */
    public readonly touched: boolean = !1;

    /**
     * The current value of the control.
     *
     * * For a `KikFormControl`, the current value.
     * * For an enabled `FormGroup`, the values of enabled controls as an object
     * with a key-value pair for each member of the group.
     * * For a disabled `FormGroup`, the values of all controls as an object
     * with a key-value pair for each member of the group.
     * * For a `FormArray`, the values of enabled controls as an array.
     *
     */
    public readonly value!: TValue;

    protected _errors!: KikValidationErrors | null;
    protected _status: KikFormControlStates = KikFormControlStates.PENDING;
    protected _statusChanges$: Subject<KikFormControlStates> = new Subject<KikFormControlStates>();
    protected _validators: KikValidatorFn[] = [];
    protected _valueChanges$: Subject<TValue> = new Subject<TValue>();

    private _asyncValidationSubscription?: Subscription; // placeholder for async validation subscription
    private _composedAsyncValidatorFn!: KikAsyncValidatorFn | null;
    /**
     * Contains the result of merging synchronous validators into a single validator function
     * (combined using `Validators.compose`).
     *
     * @internal
     */
    private _composedValidatorFn!: KikValidatorFn | null;
    private _parent: KikFormGroup | KikFormArray | null = null;
    /**
     * Asynchronous validators as they were provided:
     *  - in `AbstractControl` constructor
     *  - as an argument while calling `setAsyncValidators` function
     *  - while calling the setter on the `asyncValidator` field (e.g. `control.asyncValidator =
     * asyncValidatorFn`)
     *
     * @internal
     */
    private _rawAsyncValidators!: KikAsyncValidatorFn | KikAsyncValidatorFn[] | null;

    /**
     * Synchronous validators as they were provided:
     *  - in `AbstractControl` constructor
     *  - as an argument while calling `setValidators` function
     *  - while calling the setter on the `validator` field (e.g. `control.validator = validatorFn`)
     *
     * @internal
     */
    private _rawValidators!: KikValidatorFn | KikValidatorFn[] | null;

    constructor(validators: KikValidatorFn | KikValidatorFn[] | null, asyncValidators: KikAsyncValidatorFn | KikAsyncValidatorFn[] | null) {
        this._assignValidators(validators);
        this._assignAsyncValidators(asyncValidators);
    }

    /** @internal */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    abstract _anyControls(condition: (c: KikAbstractControl) => boolean): boolean;

    /** @abstract */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    abstract _allControlsDisabled(): void | boolean;

    /** @internal */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _anyControlsDirty(): boolean {
        return this._anyControls((control) => control.dirty);
    }

    /** @internal */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _find(_name_: string | number): KikAbstractControl | null {
        return null;
    }

    /** @internal */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    abstract _forEachChild(cb: (c: KikAbstractControl) => void): void;

    /** @internal */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _initObservables(): void {
        this._valueChanges$ = new Subject();
        this._statusChanges$ = new Subject();
    }

    /** @internal */
        // eslint-disable-next-line @typescript-eslint/naming-convention
    _onCollectionChange = (): void => {
    };

    /** @internal */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _registerOnCollectionChange(fn: () => void): void {
        this._onCollectionChange = fn;
    }

    /** @internal */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _setUpdateStrategy(opts?: KikValidatorFn | KikValidatorFn[] | KikAbstractControlOptions | null): void {
        if (FNS.isOptionsObj(opts) && opts.updateOn != null) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this._updateOn = opts.updateOn!;
        }
    }

    /** @internal */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    abstract _syncPendingControls(): boolean;

    /** @internal */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _updateControlsErrors(emitEvent: boolean): void {
        this._status = this._calculateStatus();

        if (emitEvent) {
            this._statusChanges$.next(this.status);
        }

        if (this._parent) {
            this._parent._updateControlsErrors(emitEvent);
        }
    }

    /** @internal */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _updatePristine(opts: { onlySelf?: boolean } = {}): void {
        (this as { pristine: boolean }).pristine = !this._anyControlsDirty();

        if (this._parent && !opts.onlySelf) {
            this._parent._updatePristine(opts);
        }
    }

    /** @internal */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _updateTouched(opts: { onlySelf?: boolean } = {}): void {
        (this as { touched: boolean }).touched = this._anyControlsTouched();

        if (this._parent && !opts.onlySelf) {
            this._parent._updateTouched(opts);
        }
    }

    /** @internal */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _updateTreeValidity(opts: { emitEvent?: boolean } = {emitEvent: true}): void {
        this._forEachChild((ctrl: KikAbstractControl) => ctrl._updateTreeValidity(opts));
        this.updateValueAndValidity({
                                        onlySelf: true,
                                        emitEvent: opts.emitEvent
                                    });
    }

    /** @internal **/
    // eslint-disable-next-line @typescript-eslint/naming-convention
    abstract _updateValue(): void;

    /**
     * Add an asynchronous validator or validators to this control, without affecting other
     * validators.
     *
     * When you add or remove a validator at run time, you must call
     * `updateValueAndValidity()` for the new validation to take effect.
     *
     * Adding a validator that already exists will have no effect.
     *
     * @param validators The new asynchronous validator function or functions to add to this control.
     */
    addAsyncValidators(validators: KikAsyncValidatorFn | KikAsyncValidatorFn[]): void {
        this.setAsyncValidators(FNS.addValidators(validators, this._rawAsyncValidators));
    }

    /**
     * Add a synchronous validator or validators to this control, without affecting other validators.
     *
     * When you add or remove a validator at run time, you must call
     * `updateValueAndValidity()` for the new validation to take effect.
     *
     * Adding a validator that already exists will have no effect. If duplicate validator functions
     * are present in the `validators` array, only the first instance would be added to a form
     * control.
     *
     * @param validators The new validator function or functions to add to this control.
     */
    addValidators(validators: KikValidatorFn | KikValidatorFn[]): void {
        this.setValidators(FNS.addValidators(validators, this._rawValidators));
    }


    /**
     * Empties out the async validator list.
     *
     * When you add or remove a validator at run time, you must call
     * `updateValueAndValidity()` for the new validation to take effect.
     *
     */
    clearAsyncValidators(): void {
        this.asyncValidator = null;
    }

    clearErrors(): void {
        this.setErrors(null);
    }

    /**
     * Empties out the synchronous validator list.
     *
     * When you add or remove a validator at run time, you must call
     * `updateValueAndValidity()` for the new validation to take effect.
     *
     */
    clearValidators(): void {
        this.validator = null;
    }

    /**
     * Disables the control. This means the control is exempt from validation checks and
     * excluded from the aggregate value of any parent. Its status is `DISABLED`.
     *
     * If the control has children, all children are also disabled.
     *
     * @see {@link KikAbstractControl.status}
     *
     * @param opts Configuration options that determine how the control propagates
     * changes and emits events after the control is disabled.
     * * `onlySelf`: When true, mark only this control. When false or not supplied,
     * marks all direct ancestors. Default is false.
     * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
     * `valueChanges`
     * observables emit events with the latest status and value when the control is disabled.
     * When false, no events are emitted.
     */
    disable(opts: { onlySelf?: boolean, emitEvent?: boolean } = {}): void {
        // If parent has been marked artificially dirty we don't want to re-calculate the
        // parent's dirtiness based on the children.
        const skipPristineCheck = this._parentMarkedDirty(opts.onlySelf);

        this._status = KikFormControlStates.DISABLED;
        this._errors = null;
        this._forEachChild((control: KikAbstractControl) => {
            control.disable({
                                ...opts,
                                onlySelf: true
                            });
        });
        this._updateValue();

        if (opts.emitEvent !== false) {
            this._valueChanges$.next(this.value);
            this._statusChanges$.next(this.status);
        }

        this._updateAncestors({
                                  ...opts,
                                  skipPristineCheck
                              });
        this._onDisabledChange.forEach((changeFn) => changeFn(true));
    }

    /**
     * Enables the control. This means the control is included in validation checks and
     * the aggregate value of its parent. Its status recalculates based on its value and
     * its validators.
     *
     * By default, if the control has children, all children are enabled.
     *
     * @see {@link AbstractControl.status}
     *
     * @param opts Configure options that control how the control propagates changes and
     * emits events when marked as untouched
     * * `onlySelf`: When true, mark only this control. When false or not supplied,
     * marks all direct ancestors. Default is false.
     * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
     * `valueChanges`
     * observables emit events with the latest status and value when the control is enabled.
     * When false, no events are emitted.
     */
    enable(opts: { onlySelf?: boolean, emitEvent?: boolean } = {}): void {
        // If parent has been marked artificially dirty we don't want to re-calculate the
        // parent's dirtiness based on the children.
        const skipPristineCheck = this._parentMarkedDirty(opts.onlySelf);

        this._status = KikFormControlStates.VALID;
        this._forEachChild((control: KikAbstractControl) => {
            control.enable({
                               ...opts,
                               onlySelf: true
                           });
        });
        this.updateValueAndValidity({
                                        onlySelf: true,
                                        emitEvent: opts.emitEvent
                                    });

        this._updateAncestors({
                                  ...opts,
                                  skipPristineCheck
                              });
        this._onDisabledChange.forEach((changeFn) => changeFn(false));
    }

    /**
     * Retrieves a child control given the control's name or path.
     *
     * This signature for get supports strings and `const` arrays (`.get(['foo', 'bar'] as const)`).
     */
    get<P extends string | (readonly(string | number)[])>(path: P):
        KikAbstractControl<ɵGetProperty<TRawValue, P>> | null;

    /**
     * Retrieves a child control given the control's name or path.
     *
     * This signature for `get` supports non-const (mutable) arrays. Inferred type
     * information will not be as robust, so prefer to pass a `readonly` array if possible.
     */
    get<P extends string | Array<string | number>>(path: P):
        KikAbstractControl<ɵGetProperty<TRawValue, P>> | null;

    /**
     * Retrieves a child control given the control's name or path.
     *
     * @param path A dot-delimited string or array of string/number values that define the path to the
     * control. If a string is provided, passing it as a string literal will result in improved type
     * information. Likewise, if an array is provided, passing it `as const` will cause improved type
     * information to be available.
     *
     * @usageNotes
     * ### Retrieve a nested control
     *
     * For example, to get a `name` control nested within a `person` sub-group:
     *
     * * `this.form.get('person.name');`
     *
     * -OR-
     *
     * * `this.form.get(['person', 'name'] as const);` // `as const` gives improved typings
     *
     * ### Retrieve a control in a FormArray
     *
     * When accessing an element inside a FormArray, you can use an element index.
     * For example, to get a `price` control from the first element in an `items` array you can use:
     *
     * * `this.form.get('items.0.price');`
     *
     * -OR-
     *
     * * `this.form.get(['items', 0, 'price']);`
     */
    get<P extends string | ((string | number)[])>(path: P):
        KikAbstractControl<ɵGetProperty<TRawValue, P>> | null {
        let currPath: Array<string | number> | string = path;
        if (currPath == null) {
            return null;
        }
        if (!Array.isArray(currPath)) {
            currPath = currPath.split(".");
        }
        if (currPath.length === 0) {
            return null;
        }
        return currPath.reduce(
            (control: KikAbstractControl | null, name) => control && control._find(name), this);
    }

    /**
     * @description
     * Reports error data for the control with the given path.
     *
     * @param errorCode The code of the error to check
     * @param path A list of control names that designates how to move from the current control
     * to the control that should be queried for errors.
     *
     * @usageNotes
     * For example, for the following `FormGroup`:
     *
     * ```
     * form = new FormGroup({
     *   address: new FormGroup({ street: new KikFormControl() })
     * });
     * ```
     *
     * The path to the 'street' control from the root form would be 'address' -> 'street'.
     *
     * It can be provided to this method in one of two formats:
     *
     * 1. An array of string control names, e.g. `['address', 'street']`
     * 1. A period-delimited list of control names in one string, e.g. `'address.street'`
     *
     * @returns error data for that particular error. If the control or error is not present,
     * null is returned.
     */
    getError(errorCode: string, path?: Array<string | number> | string): any {
        const control = path ? this.get(path) : this;
        return control && control.errors ? control.errors[errorCode] : null;
    }

    /**
     * The raw value of this control. For most control implementations, the raw value will include
     * disabled children.
     */
    getRawValue(): any {
        return this.value;
    }

    /**
     * Check whether an asynchronous validator function is present on this control. The provided
     * validator must be a reference to the exact same function that was provided.
     *
     * @param validator The asynchronous validator to check for presence. Compared by function
     *     reference.
     * @returns Whether the provided asynchronous validator was found on this control.
     */
    hasAsyncValidator(validator: KikAsyncValidatorFn): boolean {
        return FNS.hasValidator(this._rawAsyncValidators, validator);
    }

    /**
     * @description
     * Reports whether the control with the given path has the error specified.
     *
     * @param errorCode The code of the error to check
     * @param path A list of control names that designates how to move from the current control
     * to the control that should be queried for errors.
     *
     * @usageNotes
     * For example, for the following `FormGroup`:
     *
     * ```
     * form = new FormGroup({
     *   address: new FormGroup({ street: new KikFormControl() })
     * });
     * ```
     *
     * The path to the 'street' control from the root form would be 'address' -> 'street'.
     *
     * It can be provided to this method in one of two formats:
     *
     * 1. An array of string control names, e.g. `['address', 'street']`
     * 1. A period-delimited list of control names in one string, e.g. `'address.street'`
     *
     * If no path is given, this method checks for the error on the current control.
     *
     * @returns whether the given error is present in the control at the given path.
     *
     * If the control is not present, false is returned.
     */
    hasError(errorCode: string, path?: Array<string | number> | string): boolean {
        return !!this.getError(errorCode, path);
    }

    /**
     * Check whether a synchronous validator function is present on this control. The provided
     * validator must be a reference to the exact same function that was provided.
     *
     * @usageNotes
     *
     * ### Reference to a ValidatorFn
     *
     * ```
     * // Reference to the RequiredValidator
     * const ctrl = new KikFormControl<number | null>(0, Validators.required);
     * expect(ctrl.hasValidator(Validators.required)).toEqual(true)
     *
     * // Reference to anonymous function inside MinValidator
     * const minValidator = Validators.min(3);
     * const ctrl = new KikFormControl<number | null>(0, minValidator);
     * expect(ctrl.hasValidator(minValidator)).toEqual(true)
     * expect(ctrl.hasValidator(Validators.min(3))).toEqual(false)
     * ```
     *
     * @param validator The validator to check for presence. Compared by function reference.
     * @returns Whether the provided validator was found on this control.
     */
    hasValidator(validator: KikValidatorFn): boolean {
        return FNS.hasValidator(this._rawValidators, validator);
    }

    /**
     * Marks the control and all its descendant controls as `touched`.
     * @see `markAsTouched()`
     */
    markAllAsTouched(): void {
        this.markAsTouched({onlySelf: true});

        this._forEachChild((control: KikAbstractControl) => control.markAllAsTouched());
    }

    /**
     * Marks the control as `dirty`. A control becomes dirty when
     * the control's value is changed through the UI; compare `markAsTouched`.
     *
     * @see `markAsTouched()`
     * @see `markAsUntouched()`
     * @see `markAsPristine()`
     *
     * @param opts Configuration options that determine how the control propagates changes
     * and emits events after marking is applied.
     * * `onlySelf`: When true, mark only this control. When false or not supplied,
     * marks all direct ancestors. Default is false.
     */
    markAsDirty(opts: { onlySelf?: boolean } = {}): void {
        (this as { pristine: boolean }).pristine = false;

        if (this._parent && !opts.onlySelf) {
            this._parent.markAsDirty(opts);
        }
    }

    /**
     * Marks the control as `pending`.
     *
     * A control is pending while the control performs async validation.
     *
     * @see {@link AbstractControl.status}
     *
     * @param opts Configuration options that determine how the control propagates changes and
     * emits events after marking is applied.
     * * `onlySelf`: When true, mark only this control. When false or not supplied,
     * marks all direct ancestors. Default is false.
     * * `emitEvent`: When true or not supplied (the default), the `statusChanges`
     * observable emits an event with the latest status the control is marked pending.
     * When false, no events are emitted.
     *
     */
    markAsPending(opts: { onlySelf?: boolean, emitEvent?: boolean } = {}): void {
        this._status = KikFormControlStates.PENDING;

        if (opts.emitEvent !== false) {
            this._statusChanges$.next(this.status);
        }

        if (this._parent && !opts.onlySelf) {
            this._parent.markAsPending(opts);
        }
    }


    /**
     * Marks the control as `pristine`.
     *
     * If the control has any children, marks all children as `pristine`,
     * and recalculates the `pristine` status of all parent
     * controls.
     *
     * @see `markAsTouched()`
     * @see `markAsUntouched()`
     * @see `markAsDirty()`
     *
     * @param opts Configuration options that determine how the control emits events after
     * marking is applied.
     * * `onlySelf`: When true, mark only this control. When false or not supplied,
     * marks all direct ancestors. Default is false.
     */
    markAsPristine(opts: { onlySelf?: boolean } = {}): void {
        (this as { pristine: boolean }).pristine = true;
        this._pendingDirty = false;

        this._forEachChild((control: KikAbstractControl) => {
            control.markAsPristine({onlySelf: true});
        });

        if (this._parent && !opts.onlySelf) {
            this._parent._updatePristine(opts);
        }
    }

    /**
     * Marks the control as `touched`. A control is touched by focus and
     * blur events that do not change the value.
     *
     * @see `markAsUntouched()`
     * @see `markAsDirty()`
     * @see `markAsPristine()`
     *
     * @param opts Configuration options that determine how the control propagates changes
     * and emits events after marking is applied.
     * * `onlySelf`: When true, mark only this control. When false or not supplied,
     * marks all direct ancestors. Default is false.
     */
    markAsTouched(opts: { onlySelf?: boolean } = {}): void {
        (this as { touched: boolean }).touched = true;

        if (this._parent && !opts.onlySelf) {
            this._parent.markAsTouched(opts);
        }
    }

    /**
     * Marks the control as `untouched`.
     *
     * If the control has any children, also marks all children as `untouched`
     * and recalculates the `touched` status of all parent controls.
     *
     * @see `markAsTouched()`
     * @see `markAsDirty()`
     * @see `markAsPristine()`
     *
     * @param opts Configuration options that determine how the control propagates changes
     * and emits events after the marking is applied.
     * * `onlySelf`: When true, mark only this control. When false or not supplied,
     * marks all direct ancestors. Default is false.
     */
    markAsUntouched(opts: { onlySelf?: boolean } = {}): void {
        (this as { touched: boolean }).touched = false;
        this._pendingTouched = false;

        this._forEachChild((control: KikAbstractControl) => {
            control.markAsUntouched({onlySelf: true});
        });

        if (this._parent && !opts.onlySelf) {
            this._parent._updateTouched(opts);
        }
    }

    /**
     * Patches the value of the control. Abstract method (implemented in sub-classes).
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    abstract patchValue(value: TValue, options?: Object): void;

    /**
     * Remove an asynchronous validator from this control, without affecting other validators.
     * Validators are compared by function reference; you must pass a reference to the exact same
     * validator function as the one that was originally set. If a provided validator is not found, it
     * is ignored.
     *
     * When you add or remove a validator at run time, you must call
     * `updateValueAndValidity()` for the new validation to take effect.
     *
     * @param validators The asynchronous validator or validators to remove.
     */
    removeAsyncValidators(validators: KikAsyncValidatorFn | KikAsyncValidatorFn[]): void {
        this.setAsyncValidators(FNS.removeValidators(validators, this._rawAsyncValidators));
    }

    /**
     * Remove a synchronous validator from this control, without affecting other validators.
     * Validators are compared by function reference; you must pass a reference to the exact same
     * validator function as the one that was originally set. If a provided validator is not found,
     * it is ignored.
     *
     * @usageNotes
     *
     * ### Reference to a ValidatorFn
     *
     * ```
     * // Reference to the RequiredValidator
     * const ctrl = new KikFormControl<string | null>('', Validators.required);
     * ctrl.removeValidators(Validators.required);
     *
     * // Reference to anonymous function inside MinValidator
     * const minValidator = Validators.min(3);
     * const ctrl = new KikFormControl<string | null>('', minValidator);
     * expect(ctrl.hasValidator(minValidator)).toEqual(true)
     * expect(ctrl.hasValidator(Validators.min(3))).toEqual(false)
     *
     * ctrl.removeValidators(minValidator);
     * ```
     *
     * When you add or remove a validator at run time, you must call
     * `updateValueAndValidity()` for the new validation to take effect.
     *
     * @param validators The validator or validators to remove.
     */
    removeValidators(validators: KikValidatorFn | KikValidatorFn[]): void {
        this.setValidators(FNS.removeValidators(validators, this._rawValidators));
    }

    /**
     * Resets the control. Abstract method (implemented in sub-classes).
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    abstract reset(value?: TValue, options?: Object): void;

    runAsyncValidators(emitEvent?: boolean): void {
        if (this.asyncValidator) {
            const obs = FNS.toObservable(this.asyncValidator(this));
            this._asyncValidationSubscription = obs.subscribe({
                                                                  next: (errors) => {
                                                                      this._hasOwnPendingAsyncValidator = !1;
                                                                      // This will trigger the recalculation of the validation status, which depends on
                                                                      // the state of the asynchronous validation (whether it is in progress or not). So, it is
                                                                      // necessary that we have updated the `_hasOwnPendingAsyncValidator` boolean flag first.
                                                                      this.setErrors(errors, {emitEvent});
                                                                  }
                                                              });
        }
    }

    setAsyncValidators(validators: KikAsyncValidatorFn[]): void {
        this._assignAsyncValidators(validators);
    }

    setErrors(errors: KikValidationErrors | null, opts: { emitEvent?: boolean } = {}): void {
        this._errors = errors || {};
        this._updateControlsErrors(opts.emitEvent === !0);
    }

    /**
     * Sets the parent of the control
     *
     * @param parent The new parent.
     */
    setParent(parent: KikFormGroup | KikFormArray | null): void {
        this._parent = parent;
    }

    setValidators(validators: KikValidatorFn[]): void {
        this._validators = Array.isArray(validators) ? validators : [];
    }

    /**
     * Sets the value of the control. Abstract method (implemented in sub-classes).
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    abstract setValue(value: TRawValue, options?: Object): void;

    /**
     * Recalculates the value and validation status of the control.
     *
     * By default, it also updates the value and validity of its ancestors.
     *
     * @param opts Configuration options determine how the control propagates changes and emits events
     * after updates and validity checks are applied.
     * * `onlySelf`: When true, only update this control. When false or not supplied,
     * update all direct ancestors. Default is false.
     * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
     * `valueChanges`
     * observables emit events with the latest status and value when the control is updated.
     * When false, no events are emitted.
     */
    updateValueAndValidity(opts: { onlySelf?: boolean, emitEvent?: boolean } = {}): void {
        this._setInitialStatus();
        this._updateValue();

        if (this.enabled) {
            this._cancelExistingSubscription();
            this._errors = this._runValidator();
            this._status = this._calculateStatus();

            if (this.status === KikFormControlStates.VALID || this.status === KikFormControlStates.PENDING) {
                this._runAsyncValidator(opts.emitEvent);
            }
        }

        if (opts.emitEvent !== false) {
            this._valueChanges$.next(this.value);
            this._statusChanges$.next(this.status);
        }

        if (this._parent && !opts.onlySelf) {
            this._parent.updateValueAndValidity(opts);
        }
    }

    // PROTECTED

    /** @internal */
    protected _anyControlsHaveStatus(status: KikFormControlStates): boolean {
        return this._anyControls((control) => control.status === status);
    }

    /** @internal */
    protected _anyControlsTouched(): boolean {
        return this._anyControls((control) => control.touched);
    }

    protected _calculateStatus(): KikFormControlStates {
        if (this._allControlsDisabled()) {
            return KikFormControlStates.DISABLED;
        }
        if (this._errors) {
            return KikFormControlStates.INVALID;
        }
        if (this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(KikFormControlStates.PENDING)) {
            return KikFormControlStates.PENDING;
        }
        if (this._anyControlsHaveStatus(KikFormControlStates.INVALID)) {
            return KikFormControlStates.INVALID;
        }
        return KikFormControlStates.VALID;
    }

    protected _cancelExistingSubscription(): void {
        if (this._asyncValidationSubscription) {
            this._asyncValidationSubscription.unsubscribe();
            this._hasOwnPendingAsyncValidator = !1;
        }
    }

    protected _setInitialStatus(): void {
        this._status = this._allControlsDisabled() ? KikFormControlStates.DISABLED : KikFormControlStates.VALID;
    }

    // PRIVATE

    /**
     * Internal implementation of the `setAsyncValidators` method. Needs to be separated out into a
     * different method, because it is called in the constructor and it can break cases where
     * a control is extended.
     */
    private _assignAsyncValidators(validators: KikAsyncValidatorFn | KikAsyncValidatorFn[] | null): void {
        this._rawAsyncValidators = Array.isArray(validators) ? validators.slice() : validators;
        this._composedAsyncValidatorFn = FNS.coerceToAsyncValidator(this._rawAsyncValidators);
    }

    /**
     * Internal implementation of the `setValidators` method. Needs to be separated out into a
     * different method, because it is called in the constructor and it can break cases where
     * a control is extended.
     */
    private _assignValidators(validators: KikValidatorFn | KikValidatorFn[] | null): void {
        this._rawValidators = Array.isArray(validators) ? validators.slice() : validators;
        this._composedValidatorFn = FNS.coerceToValidator(this._rawValidators);
    }

    /**
     * Check to see if parent has been marked artificially dirty.
     *
     * @internal
     */
    private _parentMarkedDirty(onlySelf?: boolean): boolean {
        const parentDirty = this._parent && this._parent.dirty;
        return !onlySelf && !!parentDirty && !this._parent!._anyControlsDirty();
    }

    private _runAsyncValidator(emitEvent?: boolean): void {
        if (this.asyncValidator) {
            (this as { status: KikFormControlStates }).status = KikFormControlStates.PENDING;
            this._hasOwnPendingAsyncValidator = true;
            const obs = FNS.toObservable(this.asyncValidator(this));
            this._asyncValidationSubscription = obs.subscribe((errors: KikValidationErrors | null) => {
                this._hasOwnPendingAsyncValidator = false;
                // This will trigger the recalculation of the validation status, which depends on
                // the state of the asynchronous validation (whether it is in progress or not). So, it is
                // necessary that we have updated the `_hasOwnPendingAsyncValidator` boolean flag first.
                this.setErrors(errors, {emitEvent});
            });
        }
    }

    private _runValidator(): KikValidationErrors | null {
        return this.validator ? this.validator(this) : null;
    }

    private _updateAncestors(
        opts: { onlySelf?: boolean, emitEvent?: boolean, skipPristineCheck?: boolean }): void {
        if (this._parent && !opts.onlySelf) {
            this._parent.updateValueAndValidity(opts);
            if (!opts.skipPristineCheck) {
                this._parent._updatePristine();
            }
            this._parent._updateTouched();
        }
    }

}
