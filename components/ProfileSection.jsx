import { View, Text, TouchableOpacity, StyleSheet, Alert, Image, StatusBar, Dimensions, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '.././config/Firebase';
import { LinearGradient } from 'expo-linear-gradient';


const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('Level Up Your Health!');
  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          setUserEmail(currentUser.email);
          
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserName(userData.displayName || 'Level Up Your Health!');
          }
        } else {
          setUserEmail("Guest User");
          setUserName("Guest");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        Alert.alert("Error", "Failed to fetch user information.");
        setUserEmail("Error fetching email");
        setUserName("Error");
      }
    };

    fetchUserData();
  }, [auth, db, router]);

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
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
    
      <LinearGradient
        colors={['#34c759', '#219c50']}
        style={styles.headerContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
      </LinearGradient>

      
      <ScrollView style={styles.content}>
        
        <View style={styles.profileInfo}>
          <View style={styles.avatarContainer}>
            <Image 
              source={require('../assets/images/15.jpg')} 
              style={styles.avatarImage} 
            />
          </View>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
        </View>

       
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => router.push('/')}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#4CAF50' }]}>
              <FontAwesome5 name="plus-circle" size={22} color="white" />
            </View>
            <Text style={styles.navButtonText}>Add New Medication</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => router.push('/Hospitals')}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#00BCD4' }]}>
              <FontAwesome5 name="briefcase-medical" size={22} color="white" />
            </View>
            <Text style={styles.navButtonText}>Hospitals</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => router.push('/History')}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#FF9800' }]}>
              <FontAwesome5 name="history" size={22} color="white" />
            </View>
            <Text style={styles.navButtonText}>History</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={handleLogout}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#F44336' }]}>
              <FontAwesome5 name="sign-out-alt" size={22} color="white" />
            </View>
            <Text style={styles.navButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF7FF',
  },
  headerContainer: {
    width: width,
    paddingTop: StatusBar.currentHeight,
    height: 170,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "white",
    textAlign: "center",
  },
  content: {
    flex: 1,
  },
  profileInfo: {
    alignItems: 'center',
    padding: 25,
    backgroundColor: 'white',
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E1F5FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
    textAlign: 'center',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  navigationContainer: {
    padding: 20,
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
    color: '#333',
  },
});