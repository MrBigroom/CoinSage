import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './AuthStyles';

const SignupScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleSignup = async() => {
        if(!username || !email || !password) {
            Alert.alert('Error', 'Please fill in all the fields')
            return;
        }
        console.log("Signing up: ", username, email, password);
        navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>

            <TextInput
                style={styles.input}
                placeholder="Username..."
                value={username}
                onChangeText={setUsername}
            />

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

            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>Already have an account? 
                <Text style={styles.link} onPress={() => navigation.navigate('Login')}>Login here</Text>
            </Text>
        </View>
    );
};

export default SignupScreen;