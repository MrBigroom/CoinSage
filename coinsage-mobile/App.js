import { useSelector } from "react-redux";
import { NavigationContainer, createStackNavigator } from "@react-navigation/native";
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import LoginScreen from "./screens/Auth/LoginScreen";
import SignupScreen from "./screens/Auth/SignupScreen";
import Dashboard from "./screens/Dashboard";

const Stack = createStackNavigator();

export default function App() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isAuthenticated ? (
                    <>
                        <Stack.Screen name="Dashboard" component={Dashboard} />
                        <Stack.Screen name="Transactions" component={TransactionsScreen} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Signup" component={SignupScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}