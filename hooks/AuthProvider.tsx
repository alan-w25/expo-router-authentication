import React, { createContext, useContext, useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useStorageState} from './useStorageState';

interface AuthContextType {
    signIn: (method: string, credentials: any) => void; 
    signOut: () => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>; 
    forgotPassword: (email:string) => Promise<void>;
    resendVerificationEmail: () => Promise<void>;
    currentUser?: FirebaseAuthTypes.User | null;
    session?: FirebaseAuthTypes.User | null;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    signIn: async () => {}, 
    signOut: async () => {},
    signUp: async () => {},
    forgotPassword: async () => {},
    resendVerificationEmail: async () => {},
    currentUser: null,
    session: null,
    isLoading: false,
})

export function useAuth() {
    return useContext(AuthContext);
}

interface SessionProviderProps {
    children: React.ReactNode;
}

export function SessionProvider({children}:SessionProviderProps) {
    const [currentUser, setCurrentUser] = useState<FirebaseAuthTypes.User | null>(null);
    const[[isLoading, session], setSession] = useStorageState("session"); 

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged((user) =>{
            setCurrentUser(user);
            setSession(user ? JSON.stringify(user) : null);
        });
        return subscriber;
    }, [])

    const signIn = async (method: string, credentials: {email?:string, password?:string, idToken?:string}) => {
        try {
            if (method === "email"){
                const {email, password} = credentials; 
                await auth().signInWithEmailAndPassword(email!,password!);
            } else if (method === 'google'){
                //Google sign in 
                const { idToken } = credentials;
                const googleCredential = auth.GoogleAuthProvider.credential(idToken!)
                await auth().signInWithCredential(googleCredential);
            }
        } catch (error){
            console.log(error);
        }
    }

    const signOut = async () => {
        try{
            await auth().signOut();
            setSession(null);
            setCurrentUser(null);
        } catch(error){
            console.log(error);
        }
    }

    const signUp = async (email: string, password: string) => {
        try{
            const userCredential = await auth().createUserWithEmailAndPassword(email, password)
            const user = userCredential.user;

            if (user) {
                await user.sendEmailVerification();
                console.log('Verification email sent. Please check your inbox.');
            }
        } catch (error){
            console.log(error); 
        }
    }

    const resendVerificationEmail = async () => {
        try {
            const user = auth().currentUser;
            if (user) {
                await user.sendEmailVerification();
                console.log('Verification email resent.');
            } else {
                console.log('No user is signed in.');
            }
        } catch (error: any) {
            console.error('Error resending verification email:', error.message);
            throw error; // This will allow the error to be caught in the calling function
        }
    };

    const forgotPassword = async (email: string) => {
        try{
            await auth().sendPasswordResetEmail(email); 
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AuthContext.Provider 
            value ={{
                signIn,
                signOut,
                signUp,
                forgotPassword,
                resendVerificationEmail,
                currentUser,
                session: session ? JSON.parse(session):null, 
                isLoading
            }}>
            {children}
        </AuthContext.Provider>
    );
}