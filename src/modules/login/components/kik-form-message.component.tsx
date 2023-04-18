import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes, faTriangleExclamation, faInfo, IconDefinition} from "@fortawesome/free-solid-svg-icons";
//
import {KIK_FORM_MESSAGE_CLASSES, KikFormMessageTypes} from "../models/KikFormMessageTypes.enum";

interface Props {
    children: string;
    type?: KikFormMessageTypes;
}

export function KikFormMessage({children, type = KikFormMessageTypes.ERROR}: Props) {

    const icons: Record<KikFormMessageTypes, IconDefinition> = {
        [KikFormMessageTypes.SUCCESS]: faCheck,
        [KikFormMessageTypes.ERROR]: faTimes,
        [KikFormMessageTypes.WARNING]: faTriangleExclamation,
        [KikFormMessageTypes.INFO]: faInfo

    };

    return (
        <span className={`inline-flex items-center text-sm ${KIK_FORM_MESSAGE_CLASSES[type]}`}>
            <FontAwesomeIcon icon={icons[type]} className="mr-2"></FontAwesomeIcon>
            {children}
        </span>
    );
}
