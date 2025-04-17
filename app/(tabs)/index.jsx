import React from 'react';
import { View, Text } from 'react-native';
import Header from '../../components/Header';
import EmptyState from '../../components/EmptyState';

export default function HomeScreen() {
  return (
    <View style 
     ={{
      padding : 20,
      backgroundColor : 'White',
      width : '100%',
      height : '100%',
     }}>
      <Header/>
      <EmptyState/>
    </View>
  );
}
