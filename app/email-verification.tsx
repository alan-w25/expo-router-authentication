import React, {useEffect} from 'react'; 
import { View, ScrollView, Text, Alert } from 'react-native'; 
import { SafeAreaView } from 'react-native-safe-area-context'; 
import CustomButton from '../components/CustomButton';
import {useAuth} from '../hooks/AuthProvider';
import {Link, router} from 'expo-router';
import auth from '@react-native-firebase/auth';

const EmailVerification: React.FC = () => {

    const { resendVerificationEmail } = useAuth(); 

    const handleResendEmail = async () => {
        await resendVerificationEmail(); 
        
    }

    return (
        <SafeAreaView className="h-full">
            <ScrollView>
                <View>
                    <Text className="font-bold text-4xl mt-8 ml-4">Check your Email!</Text>
                    <Text className="text-lg ml-4">We sent a verification link to user</Text>
                </View>
                <View className="mt-8 items-center">
                    <Text>
                        Didn't receive the email? Check your spam folder or 
                    </Text>

                    <CustomButton 
                        title = "Resend Email"
                        handlePress = {handleResendEmail}
                        containerStyles="mt-4 w-5/6"

                    />

                    <Text>Email Verified? Go back to 

                        <Link href="/sign-in" className="font-bold text-lg"> Sign In</Link>
                    </Text>
                </View>

            </ScrollView>
        </SafeAreaView>

    )

}

export default EmailVerification;