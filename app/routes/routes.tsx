import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../pages/home/Home";
import ContactHome from "../pages/contact/Contact";
import { SafeAreaView } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator()

const Routes = () => {
    return <NavigationContainer>
        <Stack.Navigator initialRouteName="/">
            <Stack.Screen name="/" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="/contact" component={ContactHome} options={{ headerShown: false }} />
        </Stack.Navigator>
    </NavigationContainer>
}

export default Routes