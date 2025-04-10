import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import { useRouter } from 'expo-router'


export default function LoginScreen() {
  const router = useRouter()
  return (
    <View style={{ flex: 1 }}>
      <View style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: 5,
      }}>
        <Image source={require('../../assets/images/Login.jpg')} style={{ width: 200, height: 500 }} />
      </View>
      <View style={{
        padding: 20,
        backgroundColor: '#3d66fe',
        height: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}>
        <Text style={{
          fontSize: 30,
          fontWeight: 'bold',
          color: 'white',
          marginBottom: 20,
          textAlign: 'center'
        }}>
          Welcome to Health Tracker
        </Text>
        
        <Text style={{
          fontSize: 16,
          color: 'white',
          marginBottom: 20,
          textAlign: 'center'
        }}>
          Your Journey to Wellness Starts Here!!
        </Text>

        <Text style={{
          fontSize: 14,
          color: 'white',
          marginBottom: 10,
          textAlign: 'center'
        }}>
          Your all-in-one health app for fitness, nutrition, and sleep. Get insights, stay motivated, and make smarter choices—every day.
        </Text>

        <TouchableOpacity 
          style={{
            backgroundColor: 'white',
            padding: 15,
            borderRadius: 30,
            alignItems: 'center',
            marginTop: 20
          }}
          onPress={() => router.push('/login/signin')}
        >
          <Text style={{
            color: 'blue',
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 5

          }}>
            Continue
          </Text>
        </TouchableOpacity>
        <Text style={{
          color: '',
          textAlign: 'center',
          marginTop: 4,
          marginBottom: 10,
        }}> NOTE: Proceeding means you accept our Terms & Conditions.</Text>

      </View>
    </View>
  )
}