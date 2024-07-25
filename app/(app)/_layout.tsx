import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '../../hooks/AuthProvider';
import { router, Stack, Slot } from 'expo-router';
import { useEffect } from 'react';

const RootLayout:React.FC = () => {
    const {session, isLoading} = useAuth();

    useEffect(() => {
      if (!isLoading && !session){
        router.push('/sign-in');
      }
    }, [isLoading, session])

    if (isLoading) {
        return <Text>Loading...</Text>
    }
  return (
    <Slot />
  )
}

export default RootLayout