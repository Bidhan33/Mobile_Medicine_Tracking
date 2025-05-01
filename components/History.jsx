import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Platform } from "react-native";
import { useState, useEffect, useCallback } from "react";
import React from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from ".././config/Firebase";
import { getLocalStorage } from ".././Service/Storage";
import moment from "moment";
import MedcardList from "../components/MedcardList";
import { useFocusEffect } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function History() {
  const [medList, setMedList] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const getPastDateRange = () => {
    const days = 15;
    const range = [];
    for (let i = 0; i < days; i++) {
      const date = moment().subtract(i, "days");
      range.push({
        day: date.format("ddd"),
        date: date.format("DD"),
        month: date.format("MMM"),
        formattedDate: date.format("DD/MM/YYYY"),
      });
    }
    setDateRange(range);
    if (range.length > 0 && !selectedDate) {
      setSelectedDate(range[0].formattedDate);
    }
  };

  const getMedList = async () => {
    try {
      const user = await getLocalStorage("userDetail");
      const q = query(
        collection(db, "medications"),
        where("userEmail", "==", user?.email)
      );
      const querySnapshot = await getDocs(q);
      const meds = [];
      querySnapshot.forEach((doc) => {
        meds.push({
          ...doc.data(),
          docId: doc.id
        });
      });
      setMedList(meds);
    } catch (e) {
      console.log(e);
      alert("Error loading medication history");
    }
  };

  useEffect(() => {
    getPastDateRange();
    getMedList();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getMedList();
      return () => {};
    }, [])
  );

  const filteredMeds = medList.filter((med) => {
    const selectedMoment = moment(selectedDate, "DD/MM/YYYY");

    if (Array.isArray(med.dates)) {
      const hasMatch = med.dates.some(date =>
        moment(date, "DD/MM/YYYY").isSame(selectedMoment, 'day')
      );
      if (hasMatch) return true;
    }

    const start = moment(med.startDate);
    const end = moment(med.endDate);
    return selectedMoment.isBetween(start, end, 'day', '[]');
  });

  const today = moment().format("MMM DD, YYYY");

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Header Section */}
      <LinearGradient
        colors={['#34c759', '#219c50']}
        style={styles.headerContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Medication History</Text>
          <Text style={styles.headerDate}>{today}</Text>
        </View>
      </LinearGradient>

      {/* Main Scroll Content */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Date Selection */}
        <View style={styles.dateSection}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <FlatList
            data={dateRange}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              const isSelected = selectedDate === item.formattedDate;
              return (
                <TouchableOpacity
                  style={[
                    styles.dateGroup,
                    isSelected && styles.selectedDateGroup,
                  ]}
                  onPress={() => setSelectedDate(item.formattedDate)}
                >
                  <Text
                    style={[
                      styles.day,
                      isSelected && styles.selectedDateText,
                    ]}
                  >
                    {item.day}
                  </Text>
                  <Text
                    style={[
                      styles.date,
                      isSelected && styles.selectedDateText,
                    ]}
                  >
                    {item.date}
                  </Text>
                  <Text
                    style={[
                      styles.month,
                      isSelected && styles.selectedDateText,
                    ]}
                  >
                    {item.month}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        {/* Medication List */}
        <View style={styles.medicationSection}>
          <Text style={styles.sectionTitle}>
            {filteredMeds.length > 0
              ? `Medications (${filteredMeds.length})`
              : "No Medications"}
          </Text>

          {filteredMeds.length > 0 ? (
            filteredMeds.map((item, index) => (
              <MedcardList
                medicine={item}
                selectedDate={selectedDate}
                index={index}
                totalMeds={filteredMeds.length}
                key={index}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="medical-outline" size={50} color="#ccc" />
              <Text style={styles.emptyStateText}>
                No medications scheduled for this date
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  content: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContent: {
    paddingBottom: 30,
  },
  headerContainer: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 28,
  },
  headerContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "white",
    textAlign: "center",
  },
  headerDate: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    marginTop: 8,
  },
  dateSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  dateGroup: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "white",
    alignItems: "center",
    marginRight: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  selectedDateGroup: {
    backgroundColor: "#34c759",
  },
  day: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  date: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  month: {
    fontSize: 12,
    color: "#777",
    marginTop: 3,
  },
  selectedDateText: {
    color: "white",
  },
  medicationSection: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 30,
    borderRadius: 12,
    marginTop: 10,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginTop: 15,
  },
});
