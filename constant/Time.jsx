import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';



export function WhenToTakeDropdown({ whenToTake, setWhenToTake }) {
  const [modalVisible, setModalVisible] = useState(false);
  const timingOptions = [
    'Morning', 'Afternoon', 'Evening', 'Before Sleeping',
    'Before Meals', 'After Meals', 'Before Breakfast', 'After Breakfast',
    'Before Lunch', 'After Lunch', 'Before Dinner', 'After Dinner'
  ];

  return (
    <View style={styles.dropdownContainer}>
      <Text style={styles.label}>When to Take</Text>
      <TouchableOpacity 
        style={styles.dropdown} 
        onPress={() => setModalVisible(true)}
      >
        <Text>{whenToTake || "Select timing"}</Text>
        <Ionicons 
          name="chevron-down" 
          size={20} 
          color="#999" 
        />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select When to Take</Text>
            <FlatList
              data={timingOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={[
                    styles.option,
                    whenToTake === item && styles.selectedOption
                  ]}
                  onPress={() => {
                    setWhenToTake(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={whenToTake === item ? styles.selectedOptionText : styles.optionText}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}


export function DateSelector({ label, date, setDate }) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatDate = (date) => {
    return date ? date.toLocaleDateString() : 'Select a date';
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View style={styles.dateField}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity 
        style={styles.dateInput}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>{formatDate(date)}</Text>
        <Ionicons name="calendar" size={20} color="#3498db" />
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
    </View>
  );
}

// Reminder Picker Component - unchanged
export function ReminderPicker({ reminders, setReminders }) {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);

  const formatTime = (date) => {
    return date ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
  };

  const addReminder = () => {
    setEditingReminder(null);
    setShowTimePicker(true);
  };

  const editReminder = (index) => {
    setEditingReminder(index);
    setShowTimePicker(true);
  };

  const removeReminder = (index) => {
    const updatedReminders = [...reminders];
    updatedReminders.splice(index, 1);
    setReminders(updatedReminders);
  };

  const onTimeChange = (event, selectedTime) => {
    if (event.type === 'set' && selectedTime) {
      const updatedReminders = [...reminders];
      if (editingReminder !== null) {
        updatedReminders[editingReminder] = selectedTime;
      } else {
        updatedReminders.push(selectedTime);
      }
      setReminders(updatedReminders);
    }
    setShowTimePicker(false);
    setEditingReminder(null);
  };

  return (
    <View style={styles.reminderContainer}>
      <Text style={styles.label}>Get Reminder</Text>

      {reminders.length > 0 && (
        <View style={styles.reminderList}>
          {reminders.map((reminder, index) => (
            <View key={index} style={styles.reminderItem}>
              <Ionicons name="alarm" size={20} color="#3498db" />
              <Text style={styles.reminderTime}>{formatTime(reminder)}</Text>
              <View style={styles.reminderActions}>
                <TouchableOpacity onPress={() => editReminder(index)}>
                  <Ionicons name="pencil" size={20} color="#999" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeReminder(index)}>
                  <Ionicons name="trash" size={20} color="#ff6b6b" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.addReminderButton} onPress={addReminder}>
        <Ionicons name="add-circle" size={18} color="#3498db" />
        <Text style={styles.addReminderText}>Add Reminder</Text>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          value={
            editingReminder !== null
              ? reminders[editingReminder] || new Date()
              : new Date()
          }
          mode="time"
          is24Hour={false}
          display="default"
          onChange={onTimeChange}
        />
      )}
    </View>
  );
}

export const GetDateRangeToDisplay = () => {
  const dateList=[];
  for(let i=0; i<7; i++){
    dateList.push({
      date:moment().add(i, 'days').format('DD'),
      day:moment().add(i, 'days').format('dd'),
      formattedDate:moment().add(i, 'days').format('DD/MM/YYYY'),
    })

  }
  return dateList;
};
const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  dropdownContainer: {
    marginBottom: 20,
    zIndex: 1,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    maxHeight: '70%',
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
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  selectedOption: {
    backgroundColor: '#e6f2ff',
  },
  optionText: {
    color: '#333',
  },
  selectedOptionText: {
    color: '#3498db',
    fontWeight: '500',
  },
  cancelButton: {
    marginTop: 10,
    padding: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
  },
  dateField: {
    width: '48%',
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
  },
  reminderContainer: {
    marginBottom: 20,
  },
  reminderList: {
    marginBottom: 10,
  },
  reminderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    borderRadius: 8,
    marginBottom: 8,
  },
  reminderTime: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  reminderActions: {
    flexDirection: 'row',
    width: 60,
    justifyContent: 'space-between',
  },
  addReminderButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addReminderText: {
    color: '#3498db',
    fontWeight: '500',
    marginLeft: 5,
  },
});
