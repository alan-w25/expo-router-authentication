import { View, Text, ScrollView, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {router} from 'expo-router'
import React from 'react'
import CustomButton from '../../components/CustomButton'
import {useAuth} from '../../hooks/AuthProvider';

const home: React.FC = () => {
  const {signOut} = useAuth();
  const logout =  async () => {
    try{
      await signOut();
      router.push('/sign-in');
      return
    } catch (e: any){
      Alert.alert('Error', e.message)
      console.log(e)
    }
  }
  const doNothing = () => {
    return;
  }

  return (
    <SafeAreaView>
      <ScrollView className="h-full bg-white">
        <CustomButton 
          title="Sign Out"
          handlePress = {logout}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default home