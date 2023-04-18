import * as React from "react";
//
import {KikReactiveForm, useKikFormGroup} from "@/components/reactive-form/kik-reactive-form";
import {KikUtils} from "@/shared/kik-utils.class";
import {KikReactiveField} from "@/components/reactive-form/kik-reactive-field";
import {KikFormGroup, KikFormValidators} from "@/modules/form";
import {useState} from "react";

export function KikLoginFormComponent(): JSX.Element {

    const formGroupCtx = useKikFormGroup(KikUtils.FORM_BUILDER.group({
        username: ["foo@bar.it", KikFormValidators.required],
        password: ["pwd", KikFormValidators.required]
    }))
    console.info("INIT FORM STATE");

    const year = new Date().getFullYear();

    return (
        <KikReactiveForm className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="w-full max-w-xs ml-auto mr-auto">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2"
                           htmlFor="username">
                        Username
                    </label>
                    <KikReactiveField formControlName="username">
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Username"/>
                    </KikReactiveField>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2"
                           htmlFor="password">
                        Password
                    </label>
                    <div>
                        <KikReactiveField formControlName="password">
                            <input
                                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                type="password"
                                placeholder="******************"/>
                        </KikReactiveField>
                    </div>
                    <p className="text-red-500 text-xs italic">Please choose a password.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-blue-500">
                        <h2>TOP FORM CHECK</h2>
                        <p>FORM VALID? {formGroupCtx.formGroup.valid ? "true" : "false"}</p>
                        <p>username VALUE? {formGroupCtx.formGroup.get("username")?.value}</p>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button">
                        Sign In
                    </button>
                    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                        Forgot Password?
                    </a>
                </div>
                <p className="text-center text-gray-500 text-xs">
                    &copy;{year} Acme Corp. All rights reserved.
                </p>
            </div>
        </KikReactiveForm>
    );
}
