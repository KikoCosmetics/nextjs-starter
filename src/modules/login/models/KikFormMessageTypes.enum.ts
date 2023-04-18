export enum KikFormMessageTypes {
    ERROR = "ERROR",
    WARNING = "WARNING",
    SUCCESS = "SUCCESS",
    INFO = "INFO"
}

export const KIK_FORM_MESSAGE_CLASSES: Record<KikFormMessageTypes, string> = {
    [KikFormMessageTypes.ERROR]: "text-red-700",
    [KikFormMessageTypes.SUCCESS]: "text-green-700",
    [KikFormMessageTypes.WARNING]: "text-yellow-500",
    [KikFormMessageTypes.INFO]: "text-indigo-500",
}
