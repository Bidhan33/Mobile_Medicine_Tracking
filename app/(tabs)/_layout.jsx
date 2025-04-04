import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabLayout() {
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
        name='AddNew' 
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="plus" size={size} color={color} />
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
      <Tabs.Screen 
        name='Medicine' 
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="medkit" size={size} color={color} />
          )
        }} 
      />
    </Tabs>
  );
}
