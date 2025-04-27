import { View, Text } from 'react-native';
import React, {useEffect, useState} from 'react';
import { Tabs } from 'expo-router';
import { auth } from '../../config/Firebase'
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { onAuthStateChanged } from 'firebase/auth';
import { getLocalStorage } from '../../Service/Storage';
import { use } from 'react';


export default function TabLayout() {
  const router = useRouter();
  useEffect(() => {
    GetUserDetail();
  }, []);
  const GetUserDetail=async()=> {

    const userInfo=await getLocalStorage('userDetail');
    console.log('Retrieved user:', userInfo);
    if(!userInfo){
      router.replace('/login');
    }
    return null;
  }


 
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen 
        name='index' 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          )
        }} 
      />
     
      <Tabs.Screen 
        name='Hospitals' 
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="medkit" size={size} color={color} />
          )
        }} 
      />
        <Tabs.Screen 
        name='History' 
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="history" size={size} color={color} />
          )
        }} 
      />
       <Tabs.Screen 
        name='Profile' 
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          )
        }} 
        />
    </Tabs>
  );
}
