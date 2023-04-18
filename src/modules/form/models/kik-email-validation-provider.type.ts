import {Observable} from "rxjs";

export type KikEmailValidationProvider = (value: string, validators: string[]) => Observable<any>;
