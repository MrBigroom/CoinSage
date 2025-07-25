import React from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from "formik";
import * as Yup from 'yup';
import styles from './AuthStyles';

const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .min("Username must be at least 6 characters")
        .required("Username is required"),
    email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Please re-enter your password'),
})

const SignupScreen = () => {
    const navigation = useNavigation();

    const handleSignup = async(values) => {
        try{
            console.log('Signup data: ', values);
            Alert.alert('Success', 'Account created!');
            navigation.navigate('Login');
        } catch(error) {
            Alert.alert('Error', error.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>

            <Formik
                initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
                validationSchema={SignupSchema}
                onSubmit={handleSignup}>

                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your username.."
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        value={values.username}
                    />
                    {touched.username && errors.username && (
                        <Text style={{ color: 'red', fontSize: 12 }}>{errors.username}</Text>
                    )}

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
                        placeholder="Enter your password.."
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        secureTextEntry
                    />
                    {touched.password && errors.password && (
                        <Text style={{ color: 'red', fontSize: 12 }}>{errors.password}</Text>
                    )}

                    <TextInput
                        style={styles.input}
                        placeholder="Confirm your password.."
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confrimPassword')}
                        value={values.password}
                        secureTextEntry
                    /> 
                    {touched.confirmPassword && errors.confirmPassword && (
                        <Text style={{ color: 'red', fontSize: 12 }}>{errors.confirmPassword}</Text>
                    )}

                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                    </>
                )} 
            </Formik>

            <Text style={styles.footerText}>Already have an account? 
                <Text style={styles.link} onPress={() => navigation.navigate('Login')}>Login here</Text>
            </Text>
        </View>
    );
};

export default SignupScreen;