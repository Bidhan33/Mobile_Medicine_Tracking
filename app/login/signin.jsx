import { View, ScrollView, KeyboardAvoidingView, Platform, Image, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { auth } from '../../config/Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { 
  Text,
  TextInput,
  Button,
  Card,
  IconButton,
  Checkbox,
  Divider
} from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { setLocalStorage } from '../../Service/Storage';

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Function to show toast message
  const showToast = (message) => {
    if (Platform.OS === 'android') {
      ToastAndroid.showWithGravityAndOffset(
        message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        50
      );
    } else {
      // Fallback for iOS - you might want to implement a custom iOS solution
      alert(message);
    }
  };

  const onSignInClick = () => {
    if (!email || !password) {
      showToast('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    console.log('Attempting to sign in with:', email);
    
    signInWithEmailAndPassword(auth, email, password)
      .then(async(userCredential) => {
        const user = userCredential.user;
        console.log('User signed in successfully:', user.uid);
        await setLocalStorage('userDetail', user); 
        
        try {
          console.log('Attempting navigation...');
          
          router.replace('/(tabs)');
        } catch (navError) {
          console.error('Navigation error:', navError);
          showToast('Authentication successful but navigation failed. Please try again.');
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Firebase auth error:', errorCode, errorMessage);
        
        if (errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
          showToast('Invalid email or password');
        } else {
          showToast(`Sign-in error: ${errorMessage}`);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      style={{ flex: 1 }}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text variant="displaySmall" style={styles.appName}>
              HealthTrack
            </Text>
            <Text variant="titleMedium" style={styles.welcomeText}>
              Welcome back!
            </Text>
          </View>

          <Card style={styles.card}>
            <Card.Content>
              <TextInput
                label="Email"
                mode="outlined"
                left={<TextInput.Icon icon="email" />}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={(value) => setEmail(value)}
              />
              
              <TextInput
                label="Password"
                mode="outlined"
                left={<TextInput.Icon icon="lock" />}
                right={<TextInput.Icon 
                  icon={showPassword ? "eye-off" : "eye"} 
                  onPress={() => setShowPassword(!showPassword)}
                />}
                style={styles.input}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(value) => setPassword(value)}
              />
              
              <Button 
                mode="text" 
                style={styles.forgotPassword}
                onPress={() => router.push('/forgot-password')}
                textColor="#3d66fe"
              >
                Forgot Password?
              </Button>
              
              <Button 
                mode="contained" 
                style={styles.primaryButton}
                onPress={onSignInClick}
                icon="login"
                loading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
              
              <View style={styles.dividerContainer}>
                <Divider style={styles.dividerLine} />
                <Text variant="bodySmall" style={styles.dividerText}>
                  or
                </Text>
                <Divider style={styles.dividerLine} />
              </View>
              
              <Button 
                mode="outlined" 
                style={styles.secondaryButton}
                onPress={() => router.push('/login/signup')}
                icon="account-plus"
                disabled={isLoading}
              >
                Create Account
              </Button>
            </Card.Content>
          </Card>
          
          <View style={styles.socialContainer}>
            <Text variant="bodyMedium" style={styles.socialText}>
              Or sign in with
            </Text>
            <View style={styles.socialIcons}>
              <IconButton
                icon="google"
                iconColor="#DB4437"
                size={32}
                onPress={() => console.log('Google sign in')}
                disabled={isLoading}
              />
              <IconButton
                icon="facebook"
                iconColor="#4267B2"
                size={32}
                onPress={() => console.log('Facebook sign in')}
                disabled={isLoading}
              />
              <IconButton
                icon="apple"
                size={32}
                onPress={() => console.log('Apple sign in')}
                disabled={isLoading}
              />
            </View>
          </View>
          
          <Text variant="bodySmall" style={styles.footerText}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    paddingHorizontal: 16,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  appName: {
    color: '#3d66fe',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  welcomeText: {
    color: '#555',
    marginBottom: 2,
  },
  card: {
    marginTop: 16,
    borderRadius: 16,
    elevation: 4,
    backgroundColor: '#f0f4f8',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  primaryButton: {
    marginTop: 8,
    borderRadius: 8,
    paddingVertical: 6,
    backgroundColor: '#3d66fe',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    gap: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    color: '#999',
  },
  secondaryButton: {
    marginTop: 8,
    borderRadius: 8,
    borderColor: '#3d66fe',
  },
  socialContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  socialText: {
    color: '#555',
    marginBottom: 16,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    color: '#777',
    textAlign: 'center',
    marginTop: 24,
    marginHorizontal: 40,
  },
});