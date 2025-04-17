import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { TypeFormatFlags } from "typescript";
import { useRouter } from "expo-router";
export default function EmptyState() {
  const router = useRouter();
  return (
    <View
      style={{
        marginTop: 80,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Image
        source={require("./../assets/images/1.png")}
        style={{
          width: 120,
          height: 120,
        }}
      />
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: "#000",
          marginTop: 30,
        }}
      >
        No Medidications!
      </Text>
      <Text
        style={{
          fontSize: 18,
          color: "#A9A9A9",
          textAlign: "center",
          marginTop: 10,
        }}
      >
        You have no medications to take at this time. Please setup a new one.
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: "#4CAF50",
          padding: 15,
          borderRadius: 10,
          width: "100%",
          marginTop: 30,
        }}
        onPress={() => router.push("/add-new-medicine")}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          + Add New Medicine
        </Text>
      </TouchableOpacity>
    </View>
  );
}
