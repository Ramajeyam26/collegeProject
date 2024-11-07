import {
  View,
  Text,
  TextInput,
  Image,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import axios from "axios";
import { SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Network from "expo-network";

export default function Login() {
  const [email, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const Navigation = useNavigation();
  const [ipAddress, setIpAddress] = useState(undefined);

  useEffect(() => {}, []);

  const IpFetching = async () => {
    const ip = await Network.getIpAddressAsync();
    setIpAddress(ip);
    alert("hello " + ip);
  };
  // IpFetching();
  const loginHandle = async () => {
    const userData = {
      email: email,
      password: password,
    };

    try {
      const result = await axios.post(
        "http://192.168.157.37:5000/login",
        userData
      );

      console.log(result.data);
      await AsyncStorage.setItem("user_email", email);
            // const uuuuuuu = await AsyncStorage.getItem("user_email");

      console.log(email);
      if (result.data.status == "empty") {
        ToastAndroid.show("All fields fill mandatory", ToastAndroid.LONG);
      } else if (result.data.status == "ok") {
        ToastAndroid.show("Login Successfully", ToastAndroid.LONG);
        AsyncStorage.setItem("token", result.data.data);
        Navigation.push("Tabconfig");
      } else if (result.data.status == "Failed") {
        ToastAndroid.show("Login unsuccessfully", ToastAndroid.LONG);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white justify-normal items-normal ">
      <View className=" h-fit w-fit  justify-start items-start ">
        <View className="w-36 h-36 bg-blue-0 overflow-hidden bg-purple-500 right-3 bottom-3 rounded-br-full ">
          <View
            className="w-48 h-48 bg-purple-500 rotate-45 left-12 top-12 "
            style={{ shadowColor: "white", elevation: 100 }}
          ></View>
        </View>
      </View>
      <View className="h-fit  w-fit  justify-center items-center mt-20  ">
        <View>
          <View className="py-2">
            <Text className="text-4xl text-purple-500 font-extrabold">
              LOGIN
            </Text>
          </View>

          <View className="py-3">
            <Text className="text-2xl text-purple-500 font-extrabold">
              UserName
            </Text>
          </View>
          <View className="">
            <Feather
              name="mail"
              size={25}
              color="#a855f7"
              style={styles.logo}
            />
            <TextInput
              onChangeText={setUserName}
              placeholder="eg. email, mobile number"
              placeholderTextColor={"thistle"}
              value={email}
              // autoComplete="email"
              inputMode="email"
              keyboardType="email-address"
              // enterKeyHint="done"
              autoCapitalize="none"
              className="border-purple-500 bg-white border-2 w-[260px] h-12 text-xl  rounded-lg pl-10 pr-2"
            />
          </View>
          <View className="py-3">
            <Text className="text-2xl text-purple-500 font-extrabold">
              Password
            </Text>
          </View>
          <View>
            <Feather
              name="lock"
              size={25}
              color="#a855f7"
              style={styles.logo}
            />
            <TextInput
              onChangeText={setPassword}
              placeholder="eg. 123"
              placeholderTextColor={"thistle"}
              value={password}
              secureTextEntry={true}
              enterKeyHint="done"
              className="border-purple-500 bg-white border-2 w-[260px] h-12 text-xl rounded-lg px-3 pl-10 pr-2"
            />
          </View>
          <View className="flex justify-center  items-end mt-7 h-12 ">
            <TouchableOpacity
              onPress={() => {
                // IpFetching();
                loginHandle();
              }}
              className="flex flex-row justify-evenly items-center bg-purple-500 w-40 h-full rounded-full"
            >
              <Text className=" text-2xl font-bold text-white">Login</Text>
              {/* <AntDesign
                name="arrowright"
                style={{
                  left: 0,
                  fontWeight:"500"
                }}
              color="white"
              className=""
              size={28}
              /> */}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className=" w-fit h-fit justify-center items-center  absolute -z-10">
        <View className=" w-32 h-32 bg-white   rounded-full border-4 opacity-25 border-purple-500 top-96 right-60" />
        <View className="  w-20 h-20 bg-white  rounded-full border-4 opacity-25 border-purple-500  ml-96 mt-40" />
        <View className="   w-32 h-32 bg-white  rounded-full border-4 opacity-25 border-purple-500 mt-[450px] mr-40" />
      </View>
      <View className="flex flex-row  w-110 h-10 justify-center items-center top-10">
        <Text className="text-[18px]">Don't have an account?</Text>
        <TouchableOpacity
          onPress={() => {
            Navigation.navigate("Signup");
          }}
        >
          <Text className="text-[18px] ml-2 underline decoration-2 decoration-purple-500 decoration-solid text-purple-500">
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex justify-end items-end top-[22%] left-2">
        <View
          className="w-36 h-36 bg-purple-500 overflow-hidden  rounded-tl-full "
          style={{ shadowColor: "#8336FE", elevation: 10 }}
        >
          <View
            className="w-48 h-48 bg-purple-500 rotate-45 bottom-24 right-24 rounded-l-lg"
            style={{ shadowColor: "white", elevation: 30 }}
          ></View>
        </View>
      </View>
      {/* </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logo: {
    position: "absolute",
    zIndex: 1,
    top: 12,
    left: 7,
  },
});
