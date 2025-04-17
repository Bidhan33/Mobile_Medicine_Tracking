import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function Inputs() {
  const [selectedType, setSelectedType] = useState('Tablet');
  
  const medicationTypes = ['Tablet', 'Capsules', 'Drops', 'Syrup', 'Injec'];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.header}>Add New Medication</Text>
        <Text style={styles.subHeader}>Medication Name</Text>
        
        {/* Medication Name Input */}
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name="add" size={24} color="#3498db" />
          </View>
          <TextInput
            placeholder="Name"
            style={styles.input}
          />
        </View>
        
        {/* Type Selection */}
        <Text style={styles.label}>Type</Text>
        <View style={styles.typeContainer}>
          {medicationTypes.map((type) => (
            <TouchableOpacity 
              key={type}
              style={[
                styles.typeButton,
                selectedType === type && styles.selectedTypeButton
              ]}
              onPress={() => setSelectedType(type)}
            >
              <Text 
                style={[
                  styles.typeText,
                  selectedType === type && styles.selectedTypeText
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Dose Input */}
        <Text style={styles.label}>Dose</Text>
        <TextInput
          placeholder="Ex. 2, 15ml etc"
          style={styles.fullInput}
        />
        
        {/* When to Take Dropdown */}
        <Text style={styles.label}>When to Take</Text>
        <TouchableOpacity style={styles.dropdown}>
          <Text>Morning</Text>
          <Ionicons name="chevron-down" size={20} color="#999" />
        </TouchableOpacity>
        
        {/* Date Selection */}
        <View style={styles.dateContainer}>
          <View style={styles.dateField}>
            <Text style={styles.label}>Start Date</Text>
            <TextInput
              placeholder="12/26/2024"
              style={styles.dateInput}
            />
          </View>
          
          <View style={styles.dateField}>
            <Text style={styles.label}>End Date</Text>
            <TextInput
              placeholder="12/26/2024"
              style={styles.dateInput}
            />
          </View>
        </View>
        
        {/* Reminder Section */}
        <Text style={styles.label}>Get Reminder</Text>
        <TouchableOpacity>
          <Text style={styles.addReminder}>+ Add Reminder</Text>
        </TouchableOpacity>
        
        {/* Submit Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>BUTTON</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    padding: 20,
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    marginTop: 15,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 20,
    overflow: 'hidden',
  },
  iconContainer: {
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  fullInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  typeContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  typeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    marginRight: 8,
  },
  selectedTypeButton: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  typeText: {
    color: '#666',
  },
  selectedTypeText: {
    color: '#fff',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateField: {
    width: '48%',
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
  },
  addReminder: {
    color: '#3498db',
    fontWeight: '500',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});










import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'



export default function Inputs() {
  return (
    <View 
    style={{ 
        padding: 20 

    }}>

      <Text style={styles.header}>Add New Medicine</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    header:{
        fontSize:25,
        fontWeight: "700",
    }

})