import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

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

        {/* Updated Gradient Button */}
        <TouchableOpacity 
          style={{
            borderRadius: 30,
            overflow: 'hidden',
            marginTop: 20,
            shadowColor: '#4285F4',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 10,
            elevation: 5,
          }}
          onPress={() => router.push('/login/page1')}
        >
          <LinearGradient
            colors={['#4285F4', '#34A853']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              paddingVertical: 16,
              paddingHorizontal: 24,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
              Continue
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={{
          color: '#ddd',
          textAlign: 'center',
          marginTop: 10,
          fontSize: 12,
        }}>NOTE: Proceeding means you accept our Terms & Conditions.</Text>

      </View>
    </View>
  )
}
