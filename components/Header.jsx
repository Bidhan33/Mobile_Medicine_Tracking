import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { getLocalStorage } from "../Service/Storage";
import Feather from "@expo/vector-icons/Feather";

export default function Header() {
  const [user, setUser] = useState(null);

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
            source={require("./../assets/images/healthcare.png")}
            style={{ width: 45, height: 50, right: 20,  marginRight: 10 }}
          />
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: "#000",
            }}
          >
            Back again! Time for your meds 💊
          </Text>
        </View>
        <Feather name="settings" size={28} color="black"  style={{ marginLeft: 40 }} />
      </View>
    </View>
  );
}
