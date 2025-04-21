import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { getLocalStorage } from "../Service/Storage";
import { useRouter } from "expo-router"; // useRouter hook for navigation
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Header() {
  const [user, setUser] = useState(null);

  const router = useRouter(); // useRouter hook directly

  useEffect(() => {
    GetUserDetail();
  }, []);

  const GetUserDetail = async () => {
    const userInfo = await getLocalStorage("userDetail");
    console.log("Retrieved user:", userInfo);
    setUser(userInfo);
  };

  return (
    <View style={{ marginTop: 10, paddingHorizontal: 20 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("./../assets/images/hello.png")}
            style={{ width: 38, height: 40, right: 14, marginRight: 5 }}
          />
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              color: "#000",
              fontStyle: "italic",
            }}
          >
            Back Again! Time For Your Meds 💊
          </Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/add-new-medicine')}>
          <AntDesign
            name="medicinebox"
            size={30}
            color="black"
            style={{ marginLeft: 50, height: 40 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
