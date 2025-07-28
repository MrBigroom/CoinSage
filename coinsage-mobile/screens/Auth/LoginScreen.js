import React from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from "formik";
import * as Yup from 'yup';
import styles from './AuthStyles';

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
});

const LoginScreen = () => {
    const navigation = useNavigation();

    const handleLogin = async(values) => {
        try {
            const response = await axios.post('http://../auth/login', values);
            await AsyncStorage.setItem('token', response.data.token);
            navigation.navigate('Dashboard');
        } catch(error) {
            Alert.alert('Error', error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>

            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={handleLogin}>
                
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email.."
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    {touched.email && errors.email && (
                        <Text style={{ color: 'red', fontSize: 12 }}>{errors.email}</Text>
                    )}

                    <TextInput
                        style={styles.input}
                        placeholder="Enter password.."
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        secureTextEntry
                    />
                    {touched.password && errors.password && (
                        <Text style={{ color: 'red', fontSize: 12 }}>{errors.password}</Text>
                    )}

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSubmit}
                        disabled={Formik.isSubmitting}>
                        <Text style={styles.buttonText}>
                            {Formik.isSubmitting ? 'Logging in...' : 'Login'}
                        </Text>
                    </TouchableOpacity>
                    </>
                )}
            </Formik>

            <Text style={styles.footerText}>Don&apos;t have an account?
                <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>Sign Up here</Text>
            </Text>
        </View>
    );
};

export default LoginScreen;