import { View, Text } from 'react-native'
import { Slot } from 'expo-router';
import React from 'react'
import { SessionProvider } from '../hooks/AuthProvider';

const AuthLayout: React.FC = () => {
  return (
    <SessionProvider>
        <Slot />
    </SessionProvider>
  )
}

export default AuthLayout