import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WishList({ navigation }) {
  const [product_data, setProduct_data] = useState([]);

  useEffect(() => {
    GetWishList();
  }, []);

  const HandleChange = () => {
    navigation.push("Search");
  };

  const GetWishList = async () => {
    var userId = await AsyncStorage.getItem("user_email");
    const Result = await axios.get(
      `http://192.168.157.37:5000/wishlist-two/wishlist-get?userId=${userId}`
    );
    console.log(Result.data.data);
    if (Result.data.status == "successfull" && Result.data.data == null) {
      WishResult();
      console.log("user not in the database");
    } else if (Result.data.status == "successfull") {
      setProduct_data(Result.data.data.wishProductId);
    }
  };

  const WishResult = () => {
    // alert("Wishlist not added");
    return (
      <View className="flex w-full h-full justify-center items-center z-10">
        <Text className="text-purple-500">Wishlist not added</Text>
      </View>
    )
  }
  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" />

      <View className="h-screen w-screen bg-white">
        {/* Header */}
        <View className=" flex flex-row justify-start items-center pl-5 w-full h-16 shadow-lg shadow-purple-300 bg-white z-10">
          <View className="pr-5">
            <TouchableOpacity
              onPress={() => {
                navigation.pop();
              }}
            >
              <AntDesign name="arrowleft" size={25} color={"black"} />
            </TouchableOpacity>
          </View>
          <View className="flex h-fit pt-1">
            <TouchableOpacity onPress={HandleChange}>
              <View className="flex flex-row justify-normal items-center w-80 h-10 bg-white rounded-xl border border-purple-200 overflow-hidden ">
                <View className="pl-7">
                  <Feather name="search" size={30} color="#8336FE" />
                </View>
                <View className="pl-3">
                  <Text>e.g.oil..</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* Cart mapping  */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          className=" w-screen h-screen "
        >
          <View className="flex-row flex-wrap justify-evenly pt-5 pb-20">
            {product_data.map((data) => {
              return (
                // <View key={data._id} className>
                <View
                  key={data._id}
                  className="w-48 h-64 border-2 border-purple-200 rounded-lg shadow shadow-purple-500 bg-white overflow-hidden mb-2"
                >
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      navigation.navigate("Product", {
                        id: data._id,
                        pro_name: data.name,
                        pro_image: data.image,
                        pro_price: data.price,
                        pro_category: data.category,
                      });
                    }}
                  >
                    <View className="flex w-full h-48 justify-center items-center border-b-2 border-purple-200">
                      <Image
                        source={{
                          uri: `http://192.168.59.37:5000/uploads/${data.image}`,
                        }}
                        className="w-40 h-40"
                      />
                    </View>

                    <View className="w-full h-16 flex flex-col justify-evenly">
                      <View>
                        <Text
                          className="text-base px-2"
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          {data.name}
                        </Text>
                      </View>
                      <View className="flex flex-row justify-evenly items-center w-full h-8">
                        <View className="flex flex-row">
                          <View className="pt-1 pr-1">
                            <FontAwesome name="rupee" />
                          </View>
                          <View>
                            <Text>{data.price}</Text>
                          </View>
                        </View>
                        <View>
                          <Feather name="heart" color={"red"} size={18} />
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                // </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
