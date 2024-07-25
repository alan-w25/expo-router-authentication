import React, {useState} from 'react'; 
import { Text, View, ScrollView, Alert } from 'react-native';
import {router, Link} from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import FormInput from '../components/FormInput';
import {useAuth} from '../hooks/AuthProvider';

const ForgotPassword: React.FC = () => {

    const {forgotPassword} = useAuth();

    const [email, setEmail] = useState('');
    const handleSubmit = async () => {
        if (!email){
            Alert.alert("Error", "Please enter a valid email address");
        }

        try{
            await forgotPassword(email); 

            Alert.alert("Success", "Email sent successfully");

            router.push('/sign-in')
        } catch (e: any){
            Alert.alert("Error", e.message); 
            console.log(e)
        }
    }

    return (
        <SafeAreaView>
            <ScrollView className = "h-full">
                <View className="items-center">

                    <FormInput 
                        title="Forgot your password?"
                        placeholder = "enter email address here"
                        value = {email}
                        handleChangeText={(e) => {setEmail(e)} }
                        otherStyles='mt-8'
                    
                    />

                    <CustomButton 
                        title="Send password reset link"
                        containerStyles="w-5/6 mt-8"
                        handlePress = {handleSubmit}
                    />

                </View>
                <View className="mt-8 ml-8">
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

export default ForgotPassword;