import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { useLocalSearchParams, router } from 'expo-router'
import { StyleSheet, Image } from 'react-native'
import MedcardList from '../../components/MedcardList'
import { AntDesign } from '@expo/vector-icons'
import { doc } from 'firebase/firestore'
import { db } from '../../config/Firebase'
import { updateDoc, arrayUnion } from 'firebase/firestore'
import moment from 'moment'

export default function MedActionModal() {
  const medicine = useLocalSearchParams();
  
  const UpdateActionStatus = async(status) => {
    try {
      const docRef = doc(db, 'medications', medicine?.docId);
      
      const currentTime = moment().format('LT');
      
      await updateDoc(docRef, {
        action: arrayUnion({
          status: status,
          date: medicine?.selectedDate,
          time: currentTime
        })
      });
      
      Alert.alert(
        'Success',
        'Action updated successfully',
        [{text: 'OK', onPress: () => router.back()}]
      );
    } catch(e) {
      console.log(e);
      Alert.alert('Error', 'Failed to update action status');
    }
  };
  
  return (
    <View style={styles.container}>
      <Image 
        source={require('./../../assets/images/12.jpg')}
        style={{
          width: 120,
          height: 120
        }}
      />
      <Text style={{fontSize: 20}}>{medicine?.selectedDate}</Text>
      <Text style={{fontSize: 30, fontWeight: 'bold', color: 'blue'}}>{medicine?.reminders}</Text>
      <Text style={{fontSize: 15}}>It's Time To Take</Text>
      
      <MedcardList medicine={medicine}/>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.missedButton]}
          onPress={() => UpdateActionStatus('missed')}
        >
          <AntDesign name="close" size={24} color="white" />
          <Text style={styles.buttonText}>Missed</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.takenButton]}
          onPress={() => UpdateActionStatus('taken')}
        >
          <AntDesign name="check" size={24} color="white" />
          <Text style={styles.buttonText}>Taken</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => router.back()}
      >
        <AntDesign name="closecircle" size={40} color="#555" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: '100%',
    position: 'relative'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 30
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    width: '45%'
  },
  missedButton: {
    backgroundColor: '#FF6B6B'
  },
  takenButton: {
    backgroundColor: '#4CAF50'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16
  },
  closeButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center'
  }
})