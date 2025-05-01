import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

export default function WelcomeScreen() {
  const router = useRouter()
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#4285F4" barStyle="light-content" />
      
      {/* Top Header Section - Extended to top of screen */}
      <View style={styles.headerSection}>
        <Text style={styles.appName}>MediRemind</Text>
        <Text style={styles.tagline}>Never Miss a Dose Again</Text>
      </View>
      
      {/* Middle Image Section */}
      <View style={styles.imageContainer}>
        <Image 
          source={require('../../assets/images/3.jpg')} 
          style={styles.welcomeImage} 
          resizeMode="contain"
        />
      </View>
      
      {/* Bottom Content Section */}
      <View style={styles.contentSection}>
        <Text style={styles.contentTitle}>
          Your Smart Medication Assistant
        </Text>
        
        <Text style={styles.contentDescription}>
          Stay on track with your medication schedule and never worry about 
          missed doses with our intuitive medication reminder app.
        </Text>
        
        <Text style={styles.featureText}>
          • Timely medication reminders{'\n'}
          • Track multiple prescriptions{'\n'}
          • Refill notifications{'\n'}
          • Medication history log
        </Text>
        
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => router.push('/login/signup')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => router.push('/login/signin')}
        >
          <Text style={styles.secondaryButtonText}>I Already Have An Account</Text>
        </TouchableOpacity>
        
        <Text style={styles.termsText}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerSection: {
    backgroundColor: '#4285F4',
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    // Ensure it expands to the top edge of the screen
    marginTop: -1,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  tagline: {
    fontSize: 16,
    color: 'white',
    marginTop: 8,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  welcomeImage: {
    width: 300,
    height: 200,
  },
  contentSection: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  contentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  contentDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 22,
  },
  featureText: {
    fontSize: 15,
    color: '#444',
    marginBottom: 24,
    lineHeight: 24,
    backgroundColor: '#f0f8ff',
    padding: 15,
    borderRadius: 10,
  },
  continueButton: {
    backgroundColor: '#4285F4',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#4285F4',
  },
  secondaryButtonText: {
    color: '#4285F4',
    fontSize: 16,
    fontWeight: '500',
  },
  termsText: {
    color: '#888',
    textAlign: 'center',
    fontSize: 12,
  }
});