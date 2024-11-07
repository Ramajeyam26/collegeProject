import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ToastAndroid,
  StatusBar,
  TouchableOpacityBase,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Signup({}) {
  const [mobilenumber, setPhnumber] = useState("");
  const [password, setPassword] = useState("");
  const [repsword, setRepsword] = useState("");
  const [finalps, setFinalps] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setMailid] = useState("");
  const navigation = useNavigation();

  const passwordChecking = () => {
    if (password == repsword) {
      handleSUbmit();
    } else {
      ToastAndroid.show("Mismatched password", ToastAndroid.LONG);
    }
  };
  const handleSUbmit = async () => {

     await AsyncStorage.setItem("user_name",name);
     await AsyncStorage.setItem("user_age",age);
     await AsyncStorage.setItem("user_email",email);
     await AsyncStorage.setItem("user_mobilenumber",mobilenumber);
     await AsyncStorage.setItem("user_password",password);

    const userData = {
      name: name,
      age: age,
      mobilenumber: mobilenumber,
      email: email,
      password: password,
    };
    try {
      const result = await axios.post(
        "http://192.168.157.37:5000/user",
        userData
      );
      console.log("New user created successfully");
      console.log(result);
      if (result.data.data == 'empty') {
        ToastAndroid.show("All fields fill mandatory", ToastAndroid.LONG);
      } else if (result.data.data == "ok") {
        navigation.push("Login");
        ToastAndroid.show("Successfully registered", ToastAndroid.LONG);
      } else if (result.data.data == "exists") {
        ToastAndroid.show("Already registered", ToastAndroid.LONG);
      }
    } catch (error) {
      ToastAndroid.show("Something went wrong", ToastAndroid.LONG);
      console.log(error);
    }
  };
// useEffect
  return (
    <SafeAreaView className="flex-1">
      <StatusBar barStyle="light-content" />
      <ScrollView>
        <View className="flex-1 justify-normal items-normal bg-white">
          <View className=" h-fit w-fit  justify-start items-start ">
            <View className="w-36 h-36 bg-blue-0 overflow-hidden bg-purple-500 right-3 bottom-3 rounded-br-full ">
              <View
                className="w-48 h-48 bg-purple-500 rotate-45 left-12 top-12 "
                style={{ shadowColor: "white", elevation: 40 }}
              ></View>
            </View>
          </View>
          <View className=" bg-transparent justify-center items-center -mt-6">
            <View className="flex justify-start items-start  bg-transparent px-106  rounded-xl ">
              <Text className="text-3xl text-purple-500 font-extrabold mb-2">
                SignUp
              </Text>
              <View className="py-2">
                <Text className="text-2xl text-purple-500 font-extrabold">
                  FullName
                </Text>
              </View>
              <View>
                <Feather
                  name="user"
                  size={25}
                  color="#a855f7"
                  style={styles.logo}
                />
                <TextInput
                  onChangeText={setName}
                  placeholder="eg. john"
                  value={name}
                  autoCapitalize="sentences"
                  className="border-purple-500 bg-white border-2 w-60 h-12 text-xl rounded-lg pl-10"
                />
              </View>
              <View className="py-2">
                <Text className="text-2xl text-purple-500 font-extrabold">
                  Age
                </Text>
              </View>
              <View>
                <Fontisto
                  name="heartbeat-alt"
                  size={25}
                  color="#a855f7"
                  style={styles.logo}
                />
                <TextInput
                  onChangeText={setAge}
                  placeholder="eg. 18"
                  value={age}
                  inputMode="numeric"
                  keyboardType="numeric"
                  className="border-purple-500 bg-white border-2 w-60 h-12 text-xl rounded-lg pl-10"
                />
              </View>
              <View className="py-2">
                <Text className="text-2xl text-purple-500 font-extrabold">
                  Mobile Number
                </Text>
              </View>
              <View>
                <Feather
                  name="phone"
                  size={25}
                  color="#a855f7"
                  style={styles.logo}
                />
                <TextInput
                  onChangeText={setPhnumber}
                  placeholder="eg. 1234567890"
                  value={mobilenumber}
                  inputMode="numeric"
                  keyboardType="numeric"
                  className="border-purple-500 bg-white border-2 w-60 h-12 text-xl rounded-lg pl-10"
                />
              </View>
              <View className="py-2">
                <Text className="text-2xl text-purple-500 font-extrabold">
                  Mail ID
                </Text>
              </View>
              <View>
                <Feather
                  name="mail"
                  size={25}
                  color="#a855f7"
                  style={styles.logo}
                />
                <TextInput
                  onChangeText={setMailid}
                  placeholder="eg. abc@gmail.com"
                  value={email}
                  inputMode="email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="border-purple-500 bg-white border-2 w-60 h-12 text-xl rounded-lg pl-10"
                />
              </View>
              <View className="py-2">
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
                  value={password}
                  secureTextEntry={true}
                  className="border-purple-500 bg-white border-2 w-60 h-12 text-xl rounded-lg pl-10"
                />
              </View>
              <View>
                <Feather
                  name="lock"
                  size={25}
                  color="#a855f7"
                  style={{ position: "absolute", zIndex: 1, top: 22, left: 7 }}
                />
                <TextInput
                  onChangeText={setRepsword}
                  placeholder="re-enter password"
                  value={repsword}
                  secureTextEntry={true}
                  className="border-purple-500 bg-white border-2 w-60 h-12 text-xl rounded-lg pl-10 mt-3"
                />
              </View>
              <View className="flex justify-center  items-end mt-5 h-12  ">
                <TouchableOpacity
                  onPress={() => {
                    passwordChecking();
                  }}
                  className="flex flex-row justify-evenly items-center bg-purple-500 w-40 h-full rounded-full ml-20"
                >
                  <Text className=" text-2xl font-bold text-white">SignUp</Text>
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
          <View className="flex flex-row  w-110 h-5 justify-center items-center mt-3">
            {/* <TouchableOpacity
          onPress={() => {
              Navigation.navigate("Login");
              ToastAndroid.show("hello world",ToastAndroid.LONG)
          }}
        > */}
            <Text className="text-[18px]">Don't have an account?</Text>
            {/* </TouchableOpacity> */}

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
                // ToastAndroid.show("hello world",ToastAndroid.LONG)
              }}
            >
              <Text className="text-[18px] ml-2 underline decoration-2 decoration-purple-500 decoration-solid text-purple-500">
                Login
              </Text>
            </TouchableOpacity>
          </View>
          <View className=" w-fit h-fit justify-center items-center  absolute -z-10">
            <View className=" w-32 h-32 bg-white   rounded-full border-4 opacity-25 border-[#a855f7] top-96 right-60" />
            <View className="  w-20 h-20 bg-white  rounded-full border-4 opacity-25 border-[#a855f7]  ml-96 mt-40" />
            <View className="   w-32 h-32 bg-white  rounded-full border-4 opacity-25 border-[#a855f7] mt-[450px] mr-40" />
          </View>
          <View className=" h-fit  w-full  justify-end items-end top-2 left-2">
            <View className="w-36 h-36 bg-purple-500 overflow-hidden   rounded-tl-full ">
              <View
                className="w-48 h-48 bg-purple-500 rotate-45 bottom-24 right-24 rounded-l-lg"
                style={{ shadowColor: "white", elevation: 20 }}
              ></View>
            </View>
          </View>
        </View>
      </ScrollView>
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
