



import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '../../config/Firebase'; // Adjust the import based on your file structure

export default function ProfileScreen() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState('');
  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    // Fetch current user data
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          setUserEmail(currentUser.email);
        } else {
          // Try to get from Firestore if not logged in directly
          const userDocRef = doc(db, "users", "currentUser");
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserEmail(userDoc.data().userEmail);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Fallback email from your terminal data
        setUserEmail("adhikari12bidhan12@gmail.com");
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/login');
    } catch (error) {
      Alert.alert("Logout Error", "Failed to log out. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      {/* Profile Info */}
      <View style={styles.profileInfo}>
        <View style={styles.avatarContainer}>
          <FontAwesome5 name="star" size={50} color="#FFC107" />
        </View>
        <Text style={styles.userName}>Tubeguruji</Text>
        <Text style={styles.userEmail}>{userEmail}</Text>
      </View>

      {/* Navigation Options */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => router.push('/')}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#4285F4' }]}>
            <FontAwesome5 name="plus-circle" size={22} color="white" />
          </View>
          <Text style={styles.navButtonText}>Add New Medication</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => router.push('/Hospitals')}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#4285F4' }]}>
            <FontAwesome5 name="briefcase-medical" size={22} color="white" />
          </View>
          <Text style={styles.navButtonText}>Hospitals</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => router.push('/History')}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#4285F4' }]}>
            <FontAwesome5 name="history" size={22} color="white" />
          </View>
          <Text style={styles.navButtonText}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navButton}
          onPress={handleLogout}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#EA4335' }]}>
            <FontAwesome5 name="sign-out-alt" size={22} color="white" />
          </View>
          <Text style={styles.navButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileInfo: {
    alignItems: 'center',
    padding: 25,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF9C4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  navigationContainer: {
    padding: 15,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});