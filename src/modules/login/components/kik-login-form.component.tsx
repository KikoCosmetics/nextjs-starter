import React from "react";
import {z} from "Zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {SubmitErrorHandler, SubmitHandler, useForm, FieldValues, FieldErrorsImpl} from "react-hook-form";
import {faFacebookF, faGoogle} from "@fortawesome/free-brands-svg-icons";
//
import {KikFormError} from "./kik-form-error.component";
import {KikFirebaseService} from "@/modules/login/services/kik-firebase.service";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface Props {
    passwordResetLink: string;
}
interface Methods<T extends FieldValues = FieldValues> {
    onInvalidSubmit: SubmitErrorHandler<T>;
    onValidSubmit: SubmitHandler<T>;
}

const loginFormSchema = z.object({
    email: z.string().min(1, {message: "Email is required"}).email("Please insert a valid email"),
    password: z.string().min(1, {message: "Password is required"})
});
// extracting the type
type KikLoginFormData = z.infer<typeof loginFormSchema>;

export function KikLoginForm({passwordResetLink = "#"}: Props): JSX.Element {

    const {
        handleSubmit,
        register,
        formState,
        getValues,
        watch
    } = useForm<KikLoginFormData>({
        resolver: zodResolver(loginFormSchema),
        mode: "all"
    });

    const fb = KikFirebaseService.INSTANCE;
    const year = new Date().getFullYear();

    // METHODS

    const methods: Methods<KikLoginFormData> = {
        onInvalidSubmit(errors: FieldErrorsImpl<KikLoginFormData>) {
            console.info("FORM INVALID!", {errors});
        },
        onValidSubmit(data: KikLoginFormData): void {
            console.info("Form submit!", data);
            fb.loginWithEmailAndPassword(data.email, data.password)
              .then(() => {
                  console.info("LOGIN OK!", fb.user);
              })
              .catch((e) => console.warn("LOGIN KO", e));
        }
    };

    return (
        <form onSubmit={handleSubmit(methods.onValidSubmit, methods.onInvalidSubmit)}>
            <div className="w-full max-w-xs ml-auto mr-auto text">
                <p>Social login</p>
                <div className="flex mb-6">
                    <button
                        type="button"
                        className="mb-2 inline-block rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                        style={{backgroundColor: "#ea4335"}}>
                        <FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon>
                    </button>
                </div>
            </div>
            <div className="w-full max-w-xs ml-auto mr-auto">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2"
                           htmlFor="username">
                        Username
                    </label>
                    <input {...register("email")}
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                           type="text"
                           placeholder="Username"/>

                    {formState.errors.email && <KikFormError>{`${formState.errors.email?.message}`}</KikFormError>}
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2"
                           htmlFor="password">
                        Password
                    </label>
                    <div>
                        <input {...register("password", {required: "you're dumb aren't you?"})}
                               className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                               type="password"
                               placeholder="Password"/>
                    </div>
                    {formState.errors.password && <p role="alert">{`${formState.errors.password?.message}`}</p>}
                </div>
                <div className="flex flex-col items-center">
                    <pre>
                        {/*{JSON.stringify(watch(), null, 4)}*/}
                    </pre>
                    <button
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50`}
                        disabled={!formState.isValid}>
                        Sign In
                    </button>
                    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href={passwordResetLink}>
                        Forgot Password?
                    </a>
                </div>
                <p className="text-center text-gray-500 text-xs">
                    &copy;{year} Acme Corp. All rights reserved.
                </p>
            </div>
        </form>
    );
}
