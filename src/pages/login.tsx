import React, {} from "react";
//
import {KikLoginForm} from "@/modules/login/components/kik-login-form.component";

export default function KikLoginPage(): JSX.Element {

    return (
        <>
            <h2>Login</h2>
            <div className="main">
                <KikLoginForm passwordResetLink="/"></KikLoginForm>
            </div>
        </>
    );
}
