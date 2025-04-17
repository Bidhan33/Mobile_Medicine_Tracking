import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router'

export default function MedicineHeader() {
    const route = useRouter();
  return (
    <View>
      <Image source={require("./../assets/images/4.png")}
       style={{ 
        width: "100%",
        height: 366 }} />
        <TouchableOpacity 
        style={{
            position: "absolute",
        
          padding: 30,
         
        }}
            onPress={() => route.back()}
        >
        <Ionicons name="chevron-back-circle-outline" size={24} color="black" />
            </TouchableOpacity>
    </View>
  )
}