/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {KikAbstractControlComponent} from "../components/kik-abstract-control.component";
import {KikForm} from "./kik-form.interface";


/**
 * @description
 * A base class for directives that contain multiple registered instances of `NgControl`.
 * Only used by the forms module.
 *
 * @publicApi
 */
export abstract class KikControlContainer extends KikAbstractControlComponent {

    /**
     * @description
     * The top-level form directive for the control.
     */
    get formDirective(): KikForm | null {
        return null;
    }

    /**
     * @description
     * The path to this group.
     */
    override get path(): string[] | null {
        return null;
    }

    /**
     * @description
     * The name for the control
     */
        // TODO(issue/24571): remove '!'.
    name!: string | number | null;
}
