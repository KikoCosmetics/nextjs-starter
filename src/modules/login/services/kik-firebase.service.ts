import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    Auth,
    UserCredential
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
    Firestore
} from "firebase/firestore";
import {FirebaseApp} from "@firebase/app";
import {FirebaseOptions, initializeApp} from "firebase/app";
//
import {User} from "@firebase/auth";

export class KikFirebaseService {

    static get CONFIG(): FirebaseOptions {
        return {
            apiKey: "AIzaSyBwkpfDQdLYLH9J7jZNSSJPOHiCncGnjW8",
            authDomain: "kiko-login-tests.firebaseapp.com",
            projectId: "kiko-login-tests",
            storageBucket: "kiko-login-tests.appspot.com",
            messagingSenderId: "801479242798",
            appId: "1:801479242798:web:d445135028433c0c1e5bbf"
        };
    }

    static get INSTANCE(): KikFirebaseService {
        if (!this.#instance) {
            throw new Error("KikFirebaseService hasn't been initialized yet!");
        }
        return this.#instance;
    }

    static #instance: KikFirebaseService = new KikFirebaseService(initializeApp(this.CONFIG));

    get user(): User | void {
        return this.#userCredential?.user;
    }

    readonly #auth: Auth;
    readonly #db: Firestore;
    readonly #googleProvider = new GoogleAuthProvider();
    #userCredential?: UserCredential;

    constructor(private readonly _app: FirebaseApp) {
        this.#auth = getAuth(_app);
        this.#db = getFirestore(_app);
    }

    async loginWithEmailAndPassword(email: string, password: string): Promise<void> {
        return signInWithEmailAndPassword(this.#auth, email, password).then((userCredential: UserCredential) => {
            this.#userCredential = userCredential;
        });
    }

    logout(): void {
        signOut(this.#auth);
    }

    async sendPasswordReset(email: string): Promise<void> {
        return sendPasswordResetEmail(this.#auth, email);
    }

    async signInWithGoogle(): Promise<void> {
        try {
            this.#userCredential = await signInWithPopup(this.#auth, this.#googleProvider);
            const user = this.#userCredential.user;
            const q = query(collection(this.#db, "users"), where("uid", "==", user.uid));
            const docs = await getDocs(q);
            if (docs.docs.length === 0) {
                await addDoc(collection(this.#db, "users"), {
                    uid: user.uid,
                    name: user.displayName,
                    authProvider: "google",
                    email: user.email
                });
            }
        }
        catch (err: any) {
            console.error(err);
            alert(err.message);
        }
    }

}
