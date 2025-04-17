import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator  
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MedicationTypeSelector from '../constant/Type';
import { WhenToTakeDropdown, DateSelector, ReminderPicker } from '../constant/Time';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/Firebase';
import { getLocalStorage } from '../Service/Storage';

export default function Inputs() {
  const [medicationName, setMedicationName] = useState('');
  const [dose, setDose] = useState('');
  const [selectedTypes, setSelectedTypes] = useState(['Tablet']);
  const [whenToTake, setWhenToTake] = useState('Morning');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(false);

  const formatFullDateTime = (date) =>
    date.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

  const formatTimeOnly = (date) =>
    date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

  const handleSubmit = async () => {
    setLoading(true);
    console.log('Loading started:', loading);
    if (
      !medicationName ||
      !dose ||
      !selectedTypes.length ||
      !startDate ||
      !endDate
    ) {
      alert('Please fill all the fields');
      setLoading(false);  
      return;
    }

    const docId = Date.now().toString();
    const user = await getLocalStorage('userDetail');
    const datesBetween = [];
    const currentDate = new Date(startDate);
    const lastDate = new Date(endDate);
    
    while (currentDate <= lastDate) {
      datesBetween.push(new Date(currentDate).toLocaleDateString());
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const medicationData = {
      name: medicationName,
      types: selectedTypes,
      dose,
      whenToTake,
      startDate: formatFullDateTime(startDate),
      endDate: formatFullDateTime(endDate),
      dates: datesBetween, 
      reminders: reminders.map(time => formatTimeOnly(time)),
      userEmail: user?.email || '',
      docId: docId,
    };

    try {
      await setDoc(doc(db, 'medications', docId), medicationData);
      alert('Medication saved successfully!');
      
      setMedicationName('');
      setDose('');
      setSelectedTypes(['Tablet']);
      setWhenToTake('Morning');
      setStartDate(new Date());
      setEndDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
      setReminders([]);
    } catch (error) {
      console.log(error);
      alert('Failed to save medication');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.header}>Add New Medication</Text>

        <Text style={styles.subHeader}>Medication Name</Text>
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name="medkit" size={24} color="#3498db" />
          </View>
          <TextInput
            placeholder="Name"
            style={styles.input}
            value={medicationName}
            onChangeText={setMedicationName}
          />
        </View>

        <MedicationTypeSelector
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
        />

        <Text style={styles.label}>Dose</Text>
        <TextInput
          placeholder="Ex. 2, 15ml etc"
          style={styles.fullInput}
          value={dose}
          onChangeText={setDose}
        />

        <WhenToTakeDropdown
          whenToTake={whenToTake}
          setWhenToTake={setWhenToTake}
        />

        <View style={styles.dateContainer}>
          <DateSelector
            label="Start Date"
            date={startDate}
            setDate={setStartDate}
          />
          <DateSelector
            label="End Date"
            date={endDate}
            setDate={setEndDate}
          />
        </View>

        <ReminderPicker
          reminders={reminders}
          setReminders={setReminders}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>SAVE MEDICATION</Text>
        </TouchableOpacity>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3498db" />
          </View>
        )}
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
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  },
  loadingContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});