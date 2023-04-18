import {KikAsyncValidatorFn, KikValidatorFn} from "./kik-validator.model";

/**
 * Interface for options provided to an `KikAbstractControl`.
 *
 * @publicApi
 */
export interface KikAbstractControlOptions {
    /**
     * @description
     * The list of validators applied to a control.
     */
    validators?: KikValidatorFn | KikValidatorFn[] | null;
    /**
     * @description
     * The list of async validators applied to control.
     */
    asyncValidators?: KikAsyncValidatorFn | KikAsyncValidatorFn[] | null;
    /**
     * @description
     * The event name for control to update upon.
     */
    updateOn?: "change" | "blur" | "submit";
}
