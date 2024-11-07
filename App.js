import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Onboard from "./components/Onboarding";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Selection from "./components/Selection";
import Signup from "./components/Singup";
import Login from "./components/Login";
import TabBarConfig from "./components/TabBarConfig";
import { useEffect, useState } from "react";
import { setItem,getItem } from "./AsyncPackage/Asyncpack";
import { registerRootComponent } from 'expo';
import Product from "./components/screens/Product";
import Category from "./components/screens/Category";
import Profile from "./components/screens/Profile";
import Search from "./components/screens/Search";
import Cart from "./components/screens/Cart";
import WishList from "./components/screens/WishList.js";
registerRootComponent(App);

const Stack = createNativeStackNavigator();
export default function App() {
  const [showOnboarding,setShowOnboarding]=useState(null);
  useEffect(() => {
    OnboardingIsAlreadyDone();
  }, []);
  const OnboardingIsAlreadyDone = async () => {
    let onboarded = await getItem("onboarded");
    if (onboarded == 1) {
      setShowOnboarding(false)
    } else {
      setShowOnboarding(true)
    }
  };
   if (showOnboarding==null) {
    return null
   }
   if (showOnboarding) {
    
   } else {
    
   }
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Selection">
        <Stack.Screen
          name="Selection"
          component={Selection}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Signup" component={Signup} options={{headerShown:false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        {/* <Stack.Screen name="Onboard" component={Onboard} options={{headerShown:false}}/> */}
        <Stack.Screen name="Tabconfig" component={TabBarConfig} options={{headerShown:false}}/>
        <Stack.Screen name="Product" component={Product} options={{ headerShown: false }} />
        <Stack.Screen name="Category" component={Category} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{headerShown:false }}/>
        <Stack.Screen name="Search" component={Search} options={{headerShown:false }}/>
        <Stack.Screen name="WishList" component={WishList} options={{headerShown:false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
