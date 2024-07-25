import { View, Text, ScrollView, Alert } from 'react-native'
import { Link, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import React,{useState} from 'react'
import CustomButton from '../components/CustomButton' 
import FormInput from '../components/FormInput'
import auth from '@react-native-firebase/auth'
import { useAuth } from '../hooks/AuthProvider';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

interface FormState {
  email: string;
  password: string;
}


const SignIn: React.FC = () => {
  
    GoogleSignin.configure({
      webClientId: "99792931755-3hmdfcl9sak0jsgleg64t8tis0e5nnrq.apps.googleusercontent.com",
    });


  const {signIn} = useAuth();

  const [form, setForm] = useState<FormState>({
    email: '', 
    password: ''
  })

  const google_signin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      await signIn('google', {idToken});
      router.push('/');
      Alert.alert('Success', 'User signed in successfully');
      return;
    } catch (e: any){
      Alert.alert('Error', e.message)
      console.log(e)
    }
  }
    

  const handleLogin = async () => {
    if (!form.email || !form.password){
      Alert.alert('Error', 'Please fill in all the fields')
      return;
    }

    try{
      await signIn('email', {email: form.email, password: form.password})
      setForm({email: '', password: ''})
      Alert.alert('Success', 'User signed in successfully');
      router.push('/');
      return;
    } catch (e: any){
      Alert.alert('Error', e.message)
      console.log(e)
    }
  }

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="items-center">
          <FormInput 
            title="Email"
            value = {form.email}
            otherStyles = "mt-8"
            handleChangeText = {(e) => {setForm({...form, email: e})}}
            keyboardType = "email-address"
          />
          <FormInput 
            title="Password"
            otherStyles = "mt-8"
            value = {form.password}
            handleChangeText = {(e) => {setForm({...form, password: e})}}
          
          /> 
          <CustomButton 
            title="Sign In"
            containerStyles="w-[85vw] mt-8"
            handlePress = {handleLogin}
          />

          <Link className="mt-4" href="/">Forgot Password?</Link>
        </View>

        <View className="mt-8 ml-4">
          <Text>Don't Have an Acccount? {' '}
          <Link
             href="/sign-up"
             className="text-lg font-semibold"
             >
              Sign Up
            </Link>

            {' '} or
          </Text>
          <GoogleSigninButton
            onPress = {google_signin}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn