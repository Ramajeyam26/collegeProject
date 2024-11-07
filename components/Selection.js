import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { styled } from "nativewind";

export default function Selection() {
  const Navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  return (
    // <ImageBackground
    //   source={require("../assets/tractor4.jpeg")}
    //   className="h-full w-full "
    // >
    <View className="flex-1 relative bg-purple-200">
      {/* <View className="absolute z-10 flex w-screen  pr-4 items-center">
          <Image
            source={require("../assets/logo-finalPNG.png")}
            className=" w-28 h-16"
          />
        </View> */}
      <View className="absolute flex flex-row items-center justify-evenly w-screen h-screen">
        
        <View className="flex justify-center items-start leading-loose wfull h-full">
          <Text className="text-7xl pb-2 text-white font-extrabold">Buy </Text>
          <Text className="text-5xl text-purple-500 ">Parts</Text>
        </View>
        <View>
          <Image
            source={require("../assets/tractor1.png")}
            className="w-60 h-60 rounded-tl-full rounded-bl-full"
          />
        </View>
        {/* <View className="flex flex-col">
          <Text>Welcome!</Text>
        </View> */}
      </View>
      <View className="flex absolute z-10 justify-center items-center h-screen w-screen mt-48">
        <Text className="text-3xl text-purple-500">
          Transform Your Tractor here
        </Text>
      </View>
      <View className=" h-full w-full flex justify-start items-start absolute">
        <View
          className="w-36 h-36 bg-white overflow-hidden  right-3 bottom-3 rounded-br-full "
          style={{ shadowColor: "blue" }}
        >
          <View
            className="w-48 h-48 bg-purple-500 rotate-45 left-12 top-12 "
            style={{ shadowColor: "blue", elevation: 20 }}
          ></View>
        </View>
      </View>
      <View className=" h-full w-full flex justify-end items-end ">
        <View
          className="w-36 h-36 bg-white overflow-hidden  left-3 top-3 rounded-tl-full"
          // style={{ shadowColor: "blue", elevation: 80 }}
        >
          <View
            className="w-48 h-48 bg-purple-500 rotate-45 bottom-24 right-24 rounded-l-lg"
            style={{ shadowColor: "purple", elevation: 20 }}
          ></View>
        </View>
      </View>
      <View className="flex flex-column justify-end items-start h-full w-full z-10 absolute">
        <TouchableOpacity onPress={() => Navigation.navigate("Login")}>
          <View className=" flex justify-center items-center w-56 h-12  my-5 rounded-br-full rounded-tr-full bg-purple-500 ">
            <Text
              className="text-2xl text-white font-bold"
              style={{ shadowColor: "black", elevation: 20 }}
            >
              Log In
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Navigation.navigate("Signup")}>
          <View className=" flex justify-center items-center w-56 h-12 mb-5 rounded-br-full rounded-tr-full bg-purple-500 ">
            <Text className="text-2xl text-white font-bold">SignUp</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
    // </ImageBackground>
  );
}
