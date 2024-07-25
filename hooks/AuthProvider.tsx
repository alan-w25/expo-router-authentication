import React, { createContext, useContext, useEffect } from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useStorageState} from './useStorageState';

interface AuthContextType {
    signIn: (method: string, credentials: any) => void; 
    signOut: () => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>; 
    session?: FirebaseAuthTypes.User | null;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    signIn: async () => {}, 
    signOut: async () => {},
    signUp: async () => {},
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
    const[[isLoading, session], setSession] = useStorageState("session"); 

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged((user) =>{
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
        } catch(error){
            console.log(error);
        }
    }

    const signUp = async (email: string, password: string) => {
        try{
            await auth().createUserWithEmailAndPassword(email, password);
        } catch (error){
            console.log(error); 
        }
    }

    return (
        <AuthContext.Provider 
            value ={{
                signIn,
                signOut,
                signUp,
                session: session ? JSON.parse(session):null, 
                isLoading
            }}>
            {children}
        </AuthContext.Provider>
    );
}