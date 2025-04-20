import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MedicineHeader from '../../components/MedicineHeader'
import Inputs from '../../components/Inputs'


export default function Medicine() {
  return (
    <View style={styles.container}>
       <MedicineHeader />
       <Inputs />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});