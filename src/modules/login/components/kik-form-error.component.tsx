import React from "react";
//
import {KikFormMessage} from "./kik-form-message.component";
import {KikFormMessageTypes} from "../models/KikFormMessageTypes.enum";

interface Props {
    children: string;
}

export function KikFormError({children}: Props): JSX.Element {
    return (
        <KikFormMessage type={KikFormMessageTypes.ERROR}>{children}</KikFormMessage>
    );
}
