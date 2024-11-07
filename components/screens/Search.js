import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import axios from "axios";

export default function Search({ navigation }) {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [product_data, setProduct_data] = useState([]);

  const getData = async () => {
    // alert(name);
    try {
      const result = await axios.get(
        `http://192.168.157.37:5000/search/${name}`
      );
      console.log(result.data.data);
      setProduct_data(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const BackHandler = () => {
    navigation.pop();
  };
  return (
    <View className="flex">
      <View className="w-screen h-20 bg-yellow-  border-b border-purple-300">
        <View className="flex flex-row w-full h-full justify-evenly items-center">
          <View className="pr-3 pl-5">
            <TouchableOpacity onPress={BackHandler}>
              <AntDesign name="arrowleft" size={25} color={"#a855f7"} />
            </TouchableOpacity>
          </View>
          <View className="flex flex-row">
            <View className=" absolute pt-2 pl-4">
              <Feather
                name="search"
                color={"#d8b4fe"}
                size={23}
              />
            </View>
            <View className="w-[80%] h-fit relative">
              <TextInput
                placeholder="Search here"
                placeholderTextColor={"#d8b4fe"}
                className=" w-[100%] h-10 rounded-full  border border-purple-500 pl-12 text-base "
                onChangeText={(text) => {
                  setName(text);
                  setBrand(text);
                }}
                onSubmitEditing={() => {
                  getData();
                }}
              />
            </View>
          </View>
        </View>
      </View>

      <View>
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
                  <View className="flex w-full h-48 justify-center items-center border-b-2 border-purple-200">
                    <Image
                      source={{
                        uri: `http://192.168.157.37:5000/uploads/${data.image}`,
                      }}
                      className="w-40 h-40"
                    />
                  </View>
                  <TouchableOpacity
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
    </View>
  );
}
