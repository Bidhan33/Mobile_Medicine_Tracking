import { View, ScrollView, KeyboardAvoidingView, Platform, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { 
  Text,
  TextInput,
  Button,
  Card,
  IconButton,
  Checkbox
} from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { auth } from '../../config/Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { updateProfile } from 'firebase/auth';
import { setLocalStorage } from '../../Service/Storage';

const SignUpScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  
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
      
      alert(message);
    }
  };

  const onCreateAccount = async () => {
    if (!email || !password || !confirmPassword || !name) {
      showToast('Please fill in all fields');
      return;
    } else if (password !== confirmPassword) {
      showToast('Passwords do not match');
      return;
    } else if (!termsAccepted) {
      showToast('Please accept the Terms and Conditions');
      return;
    }
  
    setIsLoading(true);
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      await updateProfile(user, {
        displayName: name,
      });
  
      console.log('User registered:', user);
      showToast('Account created successfully!');

      await setLocalStorage('userDetail', user); 
      router.push('/(tabs)');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
  
      if (errorCode === 'auth/email-already-in-use') {
        showToast('Email already in use');
      } else if (errorCode === 'auth/weak-password') {
        showToast('Password is too weak. Please use at least 6 characters');
      } else if (errorCode === 'auth/invalid-email') {
        showToast('Invalid email address');
      } else {
        showToast('Registration failed: ' + errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
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
              Create your account
            </Text>
          </View>

          <Card style={styles.card}>
            <Card.Content>
              <TextInput
                label="Full Name"
                mode="outlined"
                left={<TextInput.Icon icon="account" />}
                style={styles.input}
                value={name}
                onChangeText={setName}
              />

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
              <TextInput
                label="Confirm Password"
                mode="outlined"
                left={<TextInput.Icon icon="lock-check" />}
                style={styles.input}
                secureTextEntry={!showPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />

              <View style={styles.checkboxContainer}>
                <Checkbox
                  status={termsAccepted ? 'checked' : 'unchecked'}
                  onPress={() => setTermsAccepted(!termsAccepted)}
                />
                <Text variant="bodyMedium" style={styles.termsText}>
                  I agree to the Terms and Conditions
                </Text>
              </View>

              <Button 
                mode="contained" 
                style={styles.primaryButton}
                onPress={onCreateAccount}
                icon="account-plus"
                buttonColor="#3e6bf4"
                loading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </Button>

              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text variant="bodySmall" style={styles.dividerText}>
                  or
                </Text>
                <View style={styles.dividerLine} />
              </View>

              <Button 
                mode="outlined" 
                style={styles.secondaryButton}
                onPress={() => router.push('/login/signin')}
                icon="login"
                disabled={isLoading}
              >
                Already have an account? Sign In
              </Button>
            </Card.Content>
          </Card>

          <View style={styles.socialContainer}>
            <Text variant="bodyMedium" style={styles.socialText}>
              Or sign up with
            </Text>
            <View style={styles.socialIcons}>
              <IconButton
                icon="google"
                iconColor="#DB4437"
                size={32}
                onPress={() => console.log('Google sign up')}
                disabled={isLoading}
              />
              <IconButton
                icon="facebook"
                iconColor="#4267B2"
                size={32}
                onPress={() => console.log('Facebook sign up')}
                disabled={isLoading}
              />
              <IconButton
                icon="apple"
                size={32}
                onPress={() => console.log('Apple sign up')}
                disabled={isLoading}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

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
    marginBottom: 8,
  },
  welcomeText: {
    color: '#555',
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  termsText: {
    flex: 1,
    color: '#555',
    marginLeft: 8,
  },
  primaryButton: {
    marginTop: 8,
    borderRadius: 8,
    paddingVertical: 6,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#3d66fe',
  },
  dividerText: {
    width: 40,
    textAlign: 'center',
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
});

export default SignUpScreen;