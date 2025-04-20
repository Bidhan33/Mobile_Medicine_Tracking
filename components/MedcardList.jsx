import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'; 
import moment from 'moment';

export default function MedcardList({ medicine, selectedDate }) {
  
  const shouldDisplayMedicine = () => {
    if (!selectedDate) return false;
    
    const selectedMoment = moment(selectedDate, "DD/MM/YYYY");
    
    if (medicine.dates && medicine.dates.includes(selectedDate)) {
      return true;
    }
    
    const startDate = moment(medicine.startDate);
    const endDate = moment(medicine.endDate);
    
    return selectedMoment.isSameOrAfter(startDate, 'day') && 
           selectedMoment.isSameOrBefore(endDate, 'day');
  };

  if (!shouldDisplayMedicine()) {
    return null;
  }

  const getMedicineIcon = () => {
    return require('../assets/images/8.png');
  };

 
  const reminderTime = medicine.reminders && medicine.reminders[0];

  return (
    <View style={styles.container}>
      <View style={styles.medicineCard}>
        <View style={styles.iconContainer}>
          <Image 
            source={getMedicineIcon()}
            style={styles.medicineIcon}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.medicineName}>{medicine.name}</Text>
          <Text style={styles.timingText}>{medicine.whenToTake}</Text>
          <Text style={styles.doseText}>
            {medicine.dose} {medicine.types && medicine.types.length > 0 ? medicine.types[0] : ''}
          </Text>
        </View>
        
        
        {reminderTime && (
          <View style={styles.reminderContainer}>
            <MaterialIcons name="access-time" size={24} color="black" />
            <Text style={styles.reminderText}>{reminderTime}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20, 
    paddingHorizontal: 6,
    marginBottom: 1, 
  },
  medicineCard: {
    backgroundColor: '#42ecf5',
    borderRadius: 15,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center', 
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  iconContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginRight: 15,
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  medicineIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  infoContainer: {
    flex: 1,
  },
  medicineName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  timingText: {
    fontSize: 18,
    color: '#333',
  },
  doseText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginTop: 2,
  },
  reminderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15, 
  },
  reminderText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 5,
  },
});
