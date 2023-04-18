import {KikFormControl as FormControl} from "./kik-form-control.class";
import {KikFormGroup as FormGroup} from "./kik-form-group.class";
import {KikControl} from "./kik-control.class";
import {KikAbstractFormGroupComponent} from "../components/kik-abstract-form-group.component";

/**
 * @description
 * An interface implemented by `FormGroupDirective` and `NgForm` directives.
 *
 * Only used by the `ReactiveFormsModule` and `FormsModule`.
 *
 * @publicApi
 */
export interface KikForm {
  /**
   * @description
   * Add a control to this form.
   *
   * @param dir The control directive to add to the form.
   */
  addControl(dir: KikControl): void;

  /**
   * @description
   * Remove a control from this form.
   *
   * @param dir: The control directive to remove from the form.
   */
  removeControl(dir: KikControl): void;

  /**
   * @description
   * The control directive from which to get the `FormControl`.
   *
   * @param dir: The control directive.
   */
  getControl(dir: KikControl): FormControl;

  /**
   * @description
   * Add a group of controls to this form.
   *
   * @param dir: The control group directive to add.
   */
  addFormGroup(dir: KikAbstractFormGroupComponent): void;

  /**
   * @description
   * Remove a group of controls to this form.
   *
   * @param dir: The control group directive to remove.
   */
  removeFormGroup(dir: KikAbstractFormGroupComponent): void;

  /**
   * @description
   * The `FormGroup` associated with a particular `AbstractFormGroupDirective`.
   *
   * @param dir: The form group directive from which to get the `FormGroup`.
   */
  getFormGroup(dir: KikAbstractFormGroupComponent): FormGroup;

  /**
   * @description
   * Update the model for a particular control with a new value.
   *
   * @param dir: The control directive to update.
   * @param value: The new value for the control.
   */
  updateModel(dir: KikControl, value: any): void;
}
