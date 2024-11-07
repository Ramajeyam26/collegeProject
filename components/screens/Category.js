import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";

const Category = ({ route, navigation }) => {
  const { category_data } = route.params;
  const [product_data, setProduct_data] = useState([]);
  useEffect(() => {
    getData();
    AllData();
  }, []);

  const HandleChange = () => {
    navigation.push("Search");
  };

  const getData = async () => {
    try {
      const result = await axios.get(
        `http://192.168.157.37:5000/category/${category_data}`
      );
      console.log(result.data.data);
      if (result.data.status == "successfully") {
        setProduct_data(result.data.data);
        // console.log(result.data.data.name)
      } else if (result.data.status == "failed") {
        console.log("Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllData = async () => {
  try {
    const result2 = await axios.get(`http://192.168.157.37:5000/get-all-data`);
    if (result2.data.status=="successfully") {
      setProduct_data(result2.data.data);
    }
  } catch (error) {
    console.log(error);
  }
}

  const AllData = () => {
    if (category_data == "All") {
      getAllData();
    }
  }
  
  return (
    <SafeAreaView>
      <ScrollView className="bg-white">
        <View className="flex w-screen h-screen">
          <View
            className="w-screen h-[7.5%] bg-blue- flex flex-row justify-normal items-center pl-5 "
            style={styles.header}
          >
            <View className="flex  pr-3">
              <TouchableOpacity
                onPress={() => {
                  navigation.pop();
                }}
              >
                <AntDesign name="arrowleft" size={25} color={"black"} />
              </TouchableOpacity>
            </View>
            <View className="flex  w- h-fit pt-1">
            <TouchableOpacity onPress={HandleChange}>
              <View className="flex flex-row justify-normal items-center w-80 h-12 bg-white rounded-xl border border-purple-200 overflow-hidden ">
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
          <View className="bg-transparent h-screen">
            <View className="w-screen h-16 flex justify-center items-start pl-5 border-b-2 border-purple-200">
              <Text className="text-3xl text-purple-500">{category_data}</Text>
            </View>
            {/* 
            <View className="w-48 h-64 border-2 border-purple-200 rounded-lg shadow shadow-purple-500 bg-white overflow-hidden">
              <View className="flex w-full h-48 justify-center items-center border-b-2 border-purple-200">
                <Image source={require("../logo.png")} className="w-40 h-40" />
              </View>
              <View className="w-full h-16 flex flex-col justify-evenly">
                <View>
                  <Text
                    className="text-base px-2"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    TOTAL 15w-40 one litrea;sfjasadffasdfasdfdasksljfjasdflk
                  </Text>
                </View>
                <View className="flex flex-row justify-evenly items-center w-full h-8">
                  <View className="flex flex-row">
                    <View className="pt-1 pr-1">
                      <FontAwesome name="rupee" />
                    </View>
                    <View>
                      <Text>300</Text>
                    </View>
                  </View>
                  <View>
                    <Feather name="heart" color={"red"} size={18} />
                  </View>
                </View>
              </View>
            </View> */}

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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Category;
const styles = StyleSheet.create({
  header: {
    shadowColor: "gray",
    elevation: 30,
    backgroundColor: "white",
  },
});
