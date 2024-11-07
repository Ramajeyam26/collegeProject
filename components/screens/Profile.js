import {
  Button,
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect } from "react";
import Fontisto from "@expo/vector-icons/Fontisto";
import Feather from "@expo/vector-icons/Feather";
import axios from "axios";
import { getItem, setItem } from "../../AsyncPackage/Asyncpack";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile({ route, navigation }) {
  const [username, setUsername] = useState("");
  const [userage, setUserage] = useState(0);
  const [useremail, setUseremail] = useState("");
  const [usermobnum, setUsermobnum] = useState(0);
  const [id, setId] = useState({});
  const [values, setValues] = useState({});

  const { mailID, uname, uage, unumber } = route.params;
  const emailID = mailID.toString();
  useEffect(() => {
    getData();
  }, []);

  // put api

  const putData = async () => {
    await AsyncStorage.setItem("user_name", username);
    await AsyncStorage.setItem("user_age", userage.toString());
    await AsyncStorage.setItem("user_mobilenumber", usermobnum.toString());
    await AsyncStorage.setItem("user_email", useremail);
    const userData = {
      name: username,
      age: userage,
      mobilenumber: usermobnum,
      email: useremail,
    };
    try {
      const result = await axios.put(
        `http://192.168.157.37:5000/profile_update/${id}`,
        userData
      );
      console.log(result);
      if (result.data.status == "successfully") {
        Alert.alert("Upadatd successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get api

  const getData = async () => {
    try {
      const result3 = await axios.get(
        `http://192.168.157.37:5000/profile_get/${emailID}`
      );
      if (result3.data.status == "successfull") {
        console.log(result3.data.data);
        setUsername(result3.data.data[0].name);
        setUserage(result3.data.data[0].age);
        setUseremail(result3.data.data[0].email);
        setUsermobnum(result3.data.data[0].mobilenumber);
        setId(result3.data.data[0]._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandle = () => {
    putData();
    console.log(emailID);
    // alert(usermobnum);
  };

  const BackHandle = async () => {
  
}

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <View className=" flex justify-center items-center w-full h-fit">
        <LinearGradient colors={["#a855f7", "#fcace6"]} style={styles.header} />
      </View>
      <View className=" w-fit h-fit flex justify-center items-center -mt-10">
        <MaterialIcons name="account-circle" style={styles.icon} />
      </View> */}
      <View className="flex flex-row justify-normal items-center  h-16 w-screen shadow-lg shadow-purple-300 bg-white z-10">
        <View>
          <Image
            source={require("../../assets/logo-finalPNG.png")}
            width={20}
            height={20}
            className=" w-28 h-16"
          />
        </View>
        <View>
          <Text className="text-4xl text-purple-500">Profile</Text>
        </View>
      </View>
      <View className="w-full h-40 bg-white justify-center items-center pt-5">
        <View className="w-32 h-32 rounded-full bg-purple-200" />
      </View>
      <View className="flex justify- items-center bg-white h-full top-0">
        <View className="flex ">
          <Text className="text-xl text-purple-500 py-3">Name</Text>
          <Feather name="user" size={25} color="#a855f7" style={styles.icon2} />
          <TextInput
            placeholder="Name"
            placeholderTextColor={"thistle"}
            textAlign="center"
            value={username}
            onChangeText={setUsername}
            className="w-72 h-12 bg-transparent border-[1.5px] rounded-lg border-purple-500 placeholder:text-xl text-gray-500"
          />
        </View>
        <View className="flex ">
          <Text className="text-xl text-purple-500 py-3">Age</Text>
          <Fontisto
            name="heartbeat-alt"
            size={25}
            color="#a855f7"
            style={styles.icon2}
          />
          <TextInput
            placeholder="Age"
            placeholderTextColor={"thistle"}
            textAlign="center"
            inputMode="numeric"
            value={userage.toString()}
            onChangeText={setUserage}
            className="w-72 h-12 bg-transparent border-[1.5px] rounded-lg border-purple-500 placeholder:text-xl text-gray-500"
          />
        </View>
        <View className="flex ">
          <Text className="text-xl text-purple-500 py-3">Mobile Number</Text>
          <Feather
            name="phone"
            size={25}
            color="#a855f7"
            style={styles.icon2}
          />
          <TextInput
            placeholder="Mobile Number"
            placeholderTextColor={"thistle"}
            textAlign="center"
            inputMode="numeric"
            value={usermobnum.toString()}
            onChangeText={setUsermobnum}
            className="w-72 h-12 bg-transparent border-[1.5px] rounded-lg border-purple-500 placeholder:text-xl text-gray-500"
          />
        </View>
        <View className="flex ">
          <Text className="text-xl text-purple-500 py-3">Email</Text>
          <Feather name="mail" size={25} color="#a855f7" style={styles.icon2} />
          <TextInput
            placeholder="EmailID"
            placeholderTextColor={"thistle"}
            textAlign="center"
            value={useremail}
            onChangeText={setUseremail}
            className="w-72 h-12 bg-transparent border-[1.5px] rounded-lg border-purple-500 placeholder:text-xl text-gray-500"
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            submitHandle();
          }}
        >
          <View className="w-72 h-12 flex justify-center items-center border-[1.5px] border-purple-500 rounded-lg mt-5">
            <Text className="text-purple-500 text-xl">Submit</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Tabconfig");
          }}
          activeOpacity={1}
        >
          <View className="w-72 h-12 flex justify-center items-center border-[1.5px] border-purple-500 rounded-lg mt-5 hover:bg-purple-500">
            <Text className="text-purple-500 text-xl">Back</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    width: 470,
    height: 250,
    borderBottomLeftRadius: 4500,
    borderBottomRightRadius: 4500,
  },
  icon: {
    color: "#a855f7",
    fontSize: 90,
    backgroundColor: "white",
    borderRadius: 100,
  },
  icon2: {
    zIndex: 1,
    position: "absolute",
    top: 60,
    left: 10,
  },
});
