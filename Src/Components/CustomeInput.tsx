import { View, Text, KeyboardTypeOptions, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { FC, useState } from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface CustomeInput {
    label: string;
    placeholder: string;
    KeyboardType?: KeyboardTypeOptions;
    secureTextEntry?: boolean;
    value: string | undefined;
    onChangeText: (text: string) => void;
}

const CustomeInput: FC<CustomeInput> = ({
    label, placeholder, KeyboardType, secureTextEntry = false, value, onChangeText
}) => {
    const [secure, setSecure] = useState(secureTextEntry);

    const toggleSecureEntry = () => {
        setSecure(!secure);
    };

    return (
        <View style={styles.inputField}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputContainer}>
                <TextInput placeholder={placeholder} placeholderTextColor={'#878787'}
                    style={styles.emailInput} keyboardType={KeyboardType || 'default'}
                    secureTextEntry={secure} value={String(value)} onChangeText={onChangeText}
                />

                {secureTextEntry && (
                    <TouchableOpacity onPress={toggleSecureEntry} style={styles.toggleButton}>
                        <FontAwesome5 name={secure ? 'eye-slash' : 'eye'} size={18} color="#000" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default CustomeInput

const styles = StyleSheet.create({
    inputField: {
        marginTop: responsiveHeight(2),
        width: '100%',
    },

    label: {
        fontSize: responsiveFontSize(2),
        fontWeight: '500',
        color: '#101010',
        fontFamily: 'Inter',
        marginBottom: responsiveHeight(1.5),
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D6D6D6',
        borderRadius: 10,
        paddingLeft: responsiveWidth(4),
    },

    emailInput: {
        flex: 1,
        paddingVertical: responsiveHeight(1),
        color: '#000',
    },

    toggleButton: {
        paddingHorizontal: responsiveWidth(3),
    },
});