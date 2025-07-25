import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './AuthStyles';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = async() => {
        if(!email || !password) {
            Alert.alert('Error', 'Please fill in all the fields')
            return;
        }
        console.log("Logging in with: ", email, password);
        navigation.navigate('Dashboard');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>

            <TextInput
                style={styles.input}
                placeholder="Email address..."
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Password..."
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>Don&apos;t have an account? 
                <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>Sign Up here</Text>
            </Text>
        </View>
    );
};

export default LoginScreen;