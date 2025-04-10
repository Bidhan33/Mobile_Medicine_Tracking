import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { auth } from '../../config/Firebase'; // Adjust the path as necessary
import { onAuthStateChanged } from 'firebase/auth';

export default function Index() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up authentication listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Clean up the listener when component unmounts
    return unsubscribe;
  }, []);

  // Show loading while checking authentication
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // If no user is logged in, redirect to login page
  if (!user) {
    return <Redirect href='/login' />;
  }

  // If user is logged in, show the home screen
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Welcome to HealthTrack</Text>
      <Text style={{ marginTop: 10 }}>You are logged in as: {user.email}</Text>
    </View>
  );
}