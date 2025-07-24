import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Transactions" component={TransactionsScreen} />
                <Tab.Screen name="Dashboard" component={DashboardScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}