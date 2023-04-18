import {KikAbstractControlComponent} from "../components/kik-abstract-control.component";
import {KikControlContainer} from "./kik-control-container.class";
import {KikControlValueAccessor} from "./kik-control-value-accessor.class";

/**
 * @description
 * A base class that all `FormControl`-based directives extend. It binds a `FormControl`
 * object to a DOM element.
 *
 * @publicApi
 */
export abstract class KikControl extends KikAbstractControlComponent {
    /**
     * @description
     * The parent form for the control.
     *
     * @internal
     */
        // eslint-disable-next-line @typescript-eslint/naming-convention
    _parent: KikControlContainer | null = null;

    /**
     * @description
     * The name for the control
     */
    name: string | number | null = null;

    /**
     * @description
     * The value accessor for the control
     */
    valueAccessor: KikControlValueAccessor | null = null;

    /**
     * @description
     * The callback method to update the model from the view when requested
     *
     * @param newValue The new value for the view
     */
    abstract viewToModelUpdate(newValue: any): void;
}
