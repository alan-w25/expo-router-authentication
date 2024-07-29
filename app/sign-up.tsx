import { View, Text, ScrollView, Alert} from 'react-native'
import { Link,router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import React,{useState} from 'react'
import CustomButton from '../components/CustomButton' 
import FormInput from '../components/FormInput'
import { useAuth } from '../hooks/AuthProvider'

interface FormInputProp{
  email: string;
  password: string;
  password2: string;
  username: string;
}

const SignUp = () => {

  const { signUp } = useAuth();

  const [form, setForm] = useState<FormInputProp>({
    email: '', 
    password: '',
    password2:'',
    username:''
  })

  const handleRegister = async () => {
    if (!form.username || !form.email || !form.password || !form.password2){
      Alert.alert('Error', 'Please fill in all the fields')
      return;
    }

    if (form.password !== form.password2){
      Alert.alert('Error', 'Passwords do not match')
      return;
    }

    try{
      await signUp(form.email, form.password);
      Alert.alert('Success', 'We sent you an email to verify your account');
      router.push('/email-verification');
    } catch (error: any){
      Alert.alert('Error', error.message)
      console.log(error.message)
      return
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
            title="Username"
            otherStyles = "mt-8"
            value = {form.username}
            handleChangeText = {(e) => {setForm({...form, username: e})}}
          
          /> 
          <FormInput 
            title="Password"
            otherStyles = "mt-8"
            value = {form.password}
            handleChangeText = {(e) => {setForm({...form, password: e})}}
          
          /> 
          <FormInput 
            title=""
            placeholder = "confirm password"
            value = {form.password2}
            handleChangeText = {(e) => {setForm({...form, password2: e})}}
          
          /> 
          <CustomButton 
            title="Sign Up"
            containerStyles="w-5/6 mt-8"
            handlePress = {handleRegister}
          />
        </View>

        <View className="mt-8 ml-4">
          <Text>Already have an account? {' '}
          <Link
             href="/sign-in"
             className="text-lg font-semibold"
             >
              Sign In
          </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp