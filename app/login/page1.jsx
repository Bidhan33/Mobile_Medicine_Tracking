import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar, Dimensions, Animated, Easing } from 'react-native';
import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(100);

  useEffect(() => {
    // Animation sequence
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Gradient Background Header */}
      <LinearGradient
        colors={['#4A90E2', '#4285F4']}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Animated.View style={[styles.headerContent, { opacity: fadeAnim }]}>
          <Text style={styles.appName}>MediRemind</Text>
          <Text style={styles.tagline}>Your Personal Medication Companion</Text>
        </Animated.View>
      </LinearGradient>

      {/* Main Content */}
      <Animated.ScrollView 
        style={[styles.scrollView, { 
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }] 
        }]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Animated Illustration */}
        <Animated.View style={[styles.imageContainer, { opacity: fadeAnim }]}>
          <Image 
            source={require('../../assets/images/3.jpg')} 
            style={styles.welcomeImage} 
            resizeMode="contain"
          />
        </Animated.View>

        {/* Feature Cards */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureCard}>
            <MaterialIcons name="alarm" size={28} color="#4285F4" />
            <Text style={styles.featureTitle}>Smart Reminders</Text>
            <Text style={styles.featureDesc}>Never miss a dose with timely alerts</Text>
          </View>

          <View style={styles.featureCard}>
            <MaterialIcons name="list-alt" size={28} color="#4285F4" />
            <Text style={styles.featureTitle}>Medication Tracker</Text>
            <Text style={styles.featureDesc}>Manage all your prescriptions</Text>
          </View>
        </View>

        {/* App Description */}
        <Text style={styles.contentDescription}>
          Take control of your health with our intuitive medication management system designed to simplify your healthcare routine.
        </Text>

        {/* CTA Buttons */}
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => router.push('/login/signup')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#4285F4', '#34A853']}
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
            <MaterialIcons name="arrow-forward" size={24} color="white" />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => router.push('/login/signin')}
          activeOpacity={0.6}
        >
          <Text style={styles.secondaryButtonText}>Existing Account? Sign In</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.termsText}>
          By continuing, you agree to our Terms and Privacy Policy
        </Text>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerGradient: {
    paddingTop: StatusBar.currentHeight + 40,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  headerContent: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  appName: {
    fontSize: 32,
    fontWeight: '800',
    color: 'white',
    fontFamily: 'Roboto_700Bold',
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 8,
    fontFamily: 'Roboto_400Regular',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  welcomeImage: {
    width: width * 0.8,
    height: 220,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  featureCard: {
    backgroundColor: 'white',
    width: '48%',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  featureDesc: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
  },
  contentDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  primaryButton: {
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 15,
    shadowColor: '#4285F4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 10,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: '#4285F4',
  },
  secondaryButtonText: {
    color: '#4285F4',
    fontSize: 16,
    fontWeight: '600',
  },
  termsText: {
    color: '#999',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 10,
  }
});