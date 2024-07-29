import { View, Text, TextInput, Image, TouchableOpacity, TextInputProps } from 'react-native';
import React,{ useState} from 'react';

import eyeShow from '../assets/icons/eye.png';
import eyeHide from '../assets/icons/eye-hide.png';



interface FormInputProps extends TextInputProps{
    title: string;
    value: string;
    placeholder?: string;
    handleChangeText: (text: string) => void;
    otherStyles?: string;
}
const FormInput: React.FC<FormInputProps> = ({title, value, placeholder, handleChangeText, otherStyles, ...props}) => {
    const [showPassword, setShowPassword] = useState(false)


  return (
    <View className={`space-y-2 ${otherStyles}`}> 
        <Text className="ml-4 text-lg font-medium">{title}</Text>

        <View className="h-16 items-center w-5/6 px-4 rounded-2xl border-2 bg-white border-black flex-row">
            <TextInput
                className="text-black flex-1 font-semibold text-base"
                value={value}
                placeholder={placeholder!}
                onChangeText={handleChangeText}
                secureTextEntry = {(title === 'Password' || placeholder === 'confirm password') && !showPassword}
                {...props}
            />

            {(title === 'Password' || placeholder === "confirm password") && (
                <TouchableOpacity
                    onPress = { () => setShowPassword(!showPassword)}
                >
                    <Image 
                        source = {!showPassword ? eyeShow : eyeHide}
                        className="w-6 h-6"
                    />
                </TouchableOpacity>

            )}
        </View>
    </View>
  )
}

export default FormInput