import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import { useNavigation } from "@react-navigation/native";
import { setItem } from "../AsyncPackage/Asyncpack";
import LottieView from "lottie-react-native";

export default function Onboard() {
  const Navigation = useNavigation();
  const { width, height } = Dimensions.get("window");

  const endHandler = () => {
    Navigation.navigate("Tabconfig");
    setItem("onboarded", "1");

  };
  const endButton = () => {
    return (
      <View className="w-16 h-16 mt-10">
        <TouchableOpacity
          onPress={() => {
            Navigation.navigate("Tabconfig");
            setItem("onboarded", "1");
          }}
        >
          <Text className="text-xl">Done</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View className="flex justify-center items-center w-full h-full">
      {/* <Text className="text-2xl">helloworld</Text> */}
      <Onboarding
        onDone={endHandler}
        onSkip={endHandler}
        DoneButtonComponent={endButton}
        pages={[
          {
            backgroundColor: "white",
            image: (
              <View>
                <LottieView source={require('../assets/slides/Homepage.json')} style={{width:width*0.9,height:width}} />
              </View>
            ),
            title: "HomePage",
            subtitle: "Search our products in top of this page",
          },
          {
            backgroundColor: "white",
            image: (
              <View>
                <LottieView source={require('../assets/slides/Searchpage.json')} style={{width:width*0.9,height:width,backgroundColor:"transperant"}} />
              </View>
            ),
            title: "Categories Page",
            subtitle: "Done with React Native Onboarding Swiper",
          },
          {
            backgroundColor: "#fafafa",
            image: (
              <View>
                <LottieView source={require('../assets/slides/Profile.json')} style={{width:width*0.9,height:width}} />
              </View>
            ),
            title: "Account Page",
            subtitle: "Done with React Native Onboarding Swiper",
          },
          {
            backgroundColor: "#fafafa",
            image: (
              <View>
                <LottieView source={require('../assets/slides/Profile.json')} style={{width:width*0.9,height:width}} />
              </View>
            ),
            title: "Account Page",
            subtitle: "Done with React Native Onboarding Swiper",
          },
        ]}
        bottomBarColor="#474D5A"
      />
    </View>
  );
}
