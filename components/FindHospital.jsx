import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Linking,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  StatusBar,
  ScrollView
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { MOCK_DATA } from './../app/Mock/Data';

const HealthcareFacilitiesScreen = () => {
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [activeCity, setActiveCity] = useState('Helsinki');
  const [searchCity, setSearchCity] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchPlacesFromAPI = async (city) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=hospital+in+${city}&limit=10`,
        {
          headers: {
            'User-Agent': 'ReactNativeApp/1.0 (your-email@example.com)',
            'Accept-Language': 'en',
          }
        }
      );
  
      const contentType = response.headers.get('content-type');
      if (!response.ok || !contentType.includes('application/json')) {
        throw new Error('Invalid response format');
      }
  
      const data = await response.json();
  
      if (data && data.length > 0) {
        const formatted = data.map((item, index) => ({
          id: `${item.place_id}-${index}`,
          name: item.display_name.split(',')[0],
          type: 'Healthcare Facility',
          address: item.display_name,
          lat: item.lat,
          lon: item.lon,
        }));
        setPlaces(formatted);
      } else {
        throw new Error('Empty data from API');
      }
    } catch (error) {
      console.warn("API fetch failed, using mock data", error.message);
      const fallbackCity = city.toLowerCase();
      setPlaces(MOCK_DATA[fallbackCity] || []);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPlace = (place) => {
    setSelectedPlace(place.id === selectedPlace?.id ? null : place);
  };

  const openDirections = (place) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lon}&travelmode=driving`;
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert("Error", "Cannot open Google Maps.");
        }
      })
      .catch(() => {
        Alert.alert("Error", "Something went wrong while opening Google Maps.");
      });
  };

  const handleCityChange = (cityName) => {
    setActiveCity(cityName);
    setSelectedPlace(null);
    fetchPlacesFromAPI(cityName);
  };

  const handleSearch = () => {
    if (searchCity.trim()) {
      handleCityChange(searchCity.trim());
      setSearchCity('');
    }
  };

  useEffect(() => {
    fetchPlacesFromAPI(activeCity);
  }, []);

  const renderItem = ({ item }) => {
    const isSelected = selectedPlace && selectedPlace.id === item.id;
    
    return (
      <TouchableOpacity
        style={[styles.facilityItem, isSelected && styles.selectedItem]}
        onPress={() => handleSelectPlace(item)}
      >
        <View style={styles.facilityContent}>
          <View style={styles.iconContainer}>
            <Text style={styles.facilityIcon}>⚕️</Text>
          </View>
          <View style={styles.facilityDetails}>
            <Text style={styles.facilityName}>{item.name}</Text>
            <Text style={styles.facilityType}>{item.type}</Text>
            <Text numberOfLines={1} style={styles.facilityAddress}>
              {item.address}
            </Text>
          </View>
        </View>
        
        {isSelected && (
          <View style={styles.selectedItemDetails}>
            <Text style={styles.selectedItemAddress}>{item.address}</Text>
            <TouchableOpacity 
              style={styles.directionsButton}
              onPress={() => openDirections(item)}
            >
              <Text style={styles.directionsButtonText}>Open in Google Maps</Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
      {/* Green Header */}
      <LinearGradient
        colors={['#34c759', '#219c50']}
        style={styles.headerContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>
            <Text style={styles.iconText}>🩺</Text> Nearby Healthcare Facilities  And Hospitals
          </Text>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search another city..."
            placeholderTextColor="#888"
            value={searchCity}
            onChangeText={setSearchCity}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.resultsText}>
          {places.length} facilities found in {activeCity}
        </Text>
        
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#00B140" />
          </View>
        ) : (
          <FlatList
            data={places}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
            scrollEnabled={false}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF7FF',
  },
  headerContainer: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingBottom: 30,
    height:170,
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
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "white",
    textAlign: "center",
  },
  iconText: {
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    marginTop: 15,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    fontSize: 16,
  },
  searchButton: {
    marginLeft: 8,
    backgroundColor: '#0077C2',
    borderRadius: 8,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  resultsText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#555',
    marginBottom: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  listContainer: {
    paddingBottom: 20,
  },
  facilityItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
  },
  selectedItem: {
    borderLeftWidth: 4,
    borderLeftColor: '#00B140',
  },
  facilityContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0077C2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  facilityIcon: {
    fontSize: 24,
    color: 'white',
  },
  facilityDetails: {
    flex: 1,
  },
  facilityName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  facilityType: {
    fontSize: 14,
    color: '#0077C2',
    fontWeight: '500',
  },
  facilityAddress: {
    fontSize: 12,
    color: '#555',
  },
  selectedItemDetails: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  selectedItemAddress: {
    fontSize: 14,
    color: '#444',
    marginBottom: 10,
  },
  directionsButton: {
    backgroundColor: '#0077C2',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  directionsButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default HealthcareFacilitiesScreen;