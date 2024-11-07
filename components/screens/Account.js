import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  RefreshControl,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIocns from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import axios, { getAdapter } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Account = ({ navigation }) => {
  const getData = async () => {
    var m = "";
    m = await AsyncStorage.getItem("user_email");
    try {
      console.log("Get data from Database " + m);

      const result = await axios.get(
        `http://192.168.157.37:5000/account_get/${m}`
      );
      if (result.data.status) {
        console.log(result.data);
        setName(result.data.data[0].name);
        setUsage(result.data.data[0].age);
        setEmail(result.data.data[0].email);
        setUsmobnum(result.data.data[0].mobilenumber);
        // setEmail(m);
      } else {
        console.log(result.data.status);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [usname, setName] = useState("");
  const [usage, setUsage] = useState("");
  const [usmobnum, setUsmobnum] = useState("");
  const [email, setEmail] = useState("");
  const [mailID, setMailID] = useState("");
  const [userdata, setUserdata] = useState([]);
  const [r, setR] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData();
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  }, []);

  useEffect(() => {
    getData();

    setTimeout(() => {
      getData();
    }, 100);
  }, []);

  const LogoutHandle = async () => {
    await AsyncStorage.setItem("user_name", "");
    await AsyncStorage.setItem("user_age", "");
    await AsyncStorage.setItem("user_email", "");
    await AsyncStorage.setItem("user_mobilenumber", "");
    await AsyncStorage.setItem("user_password", "");
    setName("");
    setUsage("");
    setEmail("");
    setUsmobnum("");
    setMailID("");
    console.log("Account email id " + mailID);
  };

  return (
    <ScrollView
      className="flex h-screen w-screen bg-white"
      refreshControl={
        <RefreshControl
          colors={["#8b5cf6"]}
          progressBackgroundColor={"white"}
          progressViewOffset={50}
          refreshing={refreshing}
          onRefresh={() => {
            onRefresh();
            getData();
          }}
        />
      }
      // scrollToOverflowEnabled={false}
    >
      <View className="w-screen h-screen">
        {/* Header */}
        <View className="flex flex-row justify-normal items-center pl- h-16 w-screen shadow-lg shadow-purple-300 bg-white z-10">
          <View>
            <Image
              source={require("../../assets/logo-finalPNG.png")}
              width={20}
              height={20}
              className=" w-28 h-16"
            />
          </View>
          <View>
            <Text className="text-4xl text-purple-500">Account</Text>
          </View>
        </View>

        {/* Profile */}
        <View className="w-screen  bg-white flex items-center mt-16">
          <View className="mt-10 w-96 h-72  rounded-xl shadow-xl shadow-purple-500 bg-white">
            <View className="w-full flex items-center pt-2">
              <AntDesign name="user" size={40} color={"#a855f7"} />
            </View>
            <View className="flex w-full h-screen items-center">
              {/* Field one */}
              <View className=" pt-3">
                <View className=" absolute pt-0.5 pl-5 z-10 ">
                  <Text className="bg-white text-purple-500 text-base px-1">
                    Name
                  </Text>
                </View>
                <View>
                  <TextInput
                    placeholder="loading"
                    className="border-[1.5px] border-purple-500 w-80 h-10 text-center rounded-md text-black text-lg"
                    placeholderTextColor={"#c4b5fd"}
                    value={usname}
                    editable={false}
                  />
                </View>
              </View>

              <View className=" pt-3">
                <View className=" absolute pt-0.5 pl-5 z-10 ">
                  <Text className="bg-white text-purple-500 text-base px-1">
                    Age
                  </Text>
                </View>
                <View>
                  <TextInput
                    placeholder="loading"
                    className="border-[1.5px] border-purple-500 w-80 h-10 text-center rounded-md text-black text-lg"
                    placeholderTextColor={"#c4b5fd"}
                    value={usage.toString()}
                    editable={false}
                  />
                </View>
              </View>
              <View className=" pt-3">
                <View className=" absolute pt-0.5 pl-5 z-10 ">
                  <Text className="bg-white text-purple-500 text-base px-1">
                    Email
                  </Text>
                </View>
                <View>
                  <TextInput
                    placeholder="loading"
                    className="border-[1.5px] border-purple-500 w-80 h-10 text-center rounded-md text-black text-lg"
                    placeholderTextColor={"#c4b5fd"}
                    value={email}
                    editable={false}
                  />
                </View>
              </View>
              <View className=" pt-3">
                <View className=" absolute pt-0.5 pl-5 z-10 ">
                  <Text className="bg-white text-purple-500 text-base px-1">
                    Mobile Number
                  </Text>
                </View>
                <View>
                  <TextInput
                    placeholder="loading"
                    className="border-[1.5px] border-purple-500 w-80 h-10 text-center rounded-md text-black text-lg"
                    placeholderTextColor={"#c4b5fd"}
                    value={usmobnum.toString()}
                    editable={false}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* buttons */}
        <View className="flex w-screen h-fit items-center pt-40">
          <TouchableOpacity
            onPress={() => {
              navigation.push("WishList");
            }}
          >
            <View className="h-10 w-96 rounded  flex justify-center items-center border-[1.5px] border-green-500 mt-5">
              <Text className="text-green-500 text-xl font-normal">
                Wishlist <Feather name="heart" size={20} />
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // alert(email);
              navigation.push("Profile", {
                mailID: email,
                uname: usname,
                uage: usage,
                unumber: usmobnum,
              });
            }}
            activeOpacity={1}
          >
            <View className="h-10 w-96 rounded  flex justify-center items-center border-[1.5px] border-purple-500 mt-5">
              <Text className="text-purple-500 text-xl font-normal">
                Edit <Entypo name="edit" size={20} />
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              LogoutHandle();
              // alert("logout");
            }}
          >
            <View className="h-10 w-96 rounded  flex justify-center items-center border-[1.5px] border-red-500 mt-5">
              <Text className="text-red-500 text-xl font-normal">
                Logout <MaterialIocns name="logout" size={20} />
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Account;
