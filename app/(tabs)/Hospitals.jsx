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
  ActivityIndicator
} from 'react-native';
import { MOCK_DATA } from '../Mock/Data';

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
            <Text style={styles.facilityAddress} numberOfLines={1} ellipsizeMode="tail">
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🩺 Nearby Healthcare Facilities</Text>

      <View style={styles.searchContainer}>
        <TextInput
          value={searchCity}
          onChangeText={setSearchCity}
          placeholder="Search another city..."
          style={styles.input}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.resultsText}>
        {places.length} facilities found in {activeCity}
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#2196F3" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={places}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3f2fd',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 15,
    color: '#0d47a1',
  },
  searchContainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#90caf9',
  },
  searchButton: {
    marginLeft: 8,
    backgroundColor: '#1976d2',
    borderRadius: 8,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  resultsText: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 10,
  },
  listContainer: {
    paddingHorizontal: 15,
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
    borderLeftColor: '#1976d2',
  },
  facilityContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 15,
  },
  facilityIcon: {
    fontSize: 30,
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
    color: '#1976d2',
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
    backgroundColor: '#1976d2',
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
