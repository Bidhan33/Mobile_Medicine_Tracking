import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function MedicationTypeSelector({ selectedTypes, setSelectedTypes }) {
  const [availableTypes, setAvailableTypes] = useState([
    'Tablet', 'Capsules', 'Drops', 'Syrup', 'Injec', 'Inhaler', 'Patch', 'Cream'
  ]);
  const [customType, setCustomType] = useState('');
  const [typeModalVisible, setTypeModalVisible] = useState(false);

  const toggleTypeSelection = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(item => item !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const addCustomType = () => {
    if (customType.trim() !== '' && !availableTypes.includes(customType.trim())) {
      const newType = customType.trim();
      setAvailableTypes([...availableTypes, newType]);
      setSelectedTypes([...selectedTypes, newType]);
      setCustomType('');
      setTypeModalVisible(false);
    }
  };

  return (
    <View>
      <Text style={styles.label}>Type (Select all that apply)</Text>
      <View style={styles.typeContainer}>
        {availableTypes.map((type) => (
          <TouchableOpacity 
            key={type}
            style={[
              styles.typeButton,
              selectedTypes.includes(type) && styles.selectedTypeButton
            ]}
            onPress={() => toggleTypeSelection(type)}
          >
            <Text 
              style={[
                styles.typeText,
                selectedTypes.includes(type) && styles.selectedTypeText
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity 
          style={styles.addTypeButton}
          onPress={() => setTypeModalVisible(true)}
        >
          <Ionicons name="add-circle" size={24} color="#3498db" />
        </TouchableOpacity>
      </View>
      
      {/* Custom Type Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={typeModalVisible}
        onRequestClose={() => setTypeModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Add Custom Medication Type</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter medication type"
              value={customType}
              onChangeText={setCustomType}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setTypeModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.addButton]}
                onPress={addCustomType}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  typeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
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
  addTypeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f2f2f2',
  },
  addButton: {
    backgroundColor: '#3498db',
  },
  cancelButtonText: {
    color: '#666',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});