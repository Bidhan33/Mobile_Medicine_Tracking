import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useState, useEffect, useCallback } from "react";
import React from "react";
import { GetDateRangeToDisplay } from "../constant/Time";
import moment from "moment";
import EmptyState from "../components/EmptyState";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../config/Firebase";
import { getLocalStorage } from "../Service/Storage";
import MedcardList from "../components/MedcardList";
import { useRouter, useFocusEffect } from "expo-router";

export default function MedList() {
  const [medList, setMedList] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const router = useRouter();

  const GetDateRangeList = () => {
    const range = GetDateRangeToDisplay();
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
        // Include the document ID in the data
        meds.push({
          ...doc.data(),
          docId: doc.id
        });
      });
      setMedList(meds);
    } catch (e) {
      console.log(e);
      alert("Error loading medications");
    }
  };

 
  useEffect(() => {
    GetDateRangeList();
    getMedList();
  }, []);

  
  useFocusEffect(
    useCallback(() => {
      
      getMedList();
      return () => {
        
      };
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

  console.log("Filtered medicines for selected date:", selectedDate, filteredMeds);

  return (
    <ScrollView style={{ marginTop: 10, flex: 1 }} contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
      <Image
        source={require("./../assets/images/6.jpeg")}
        style={{
          width: "100%",
          height: 200,
          borderRadius: 15,
        }}
      />

      <FlatList
        data={dateRange}
        horizontal
        style={{ marginTop: 15 }}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const isSelected = selectedDate === item.formattedDate;
          return (
            <TouchableOpacity
              style={[
                styles.dateGroup,
                { backgroundColor: isSelected ? "green" : "white" },
              ]}
              onPress={() => setSelectedDate(item.formattedDate)}
            >
              <Text
                style={[
                  styles.day,
                  { color: isSelected ? "white" : "#000" },
                ]}
              >
                {item.day}
              </Text>
              <Text
                style={[
                  styles.date,
                  { color: isSelected ? "white" : "#000" },
                ]}
              >
                {item.date}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      {filteredMeds.length > 0 ? (
        filteredMeds.map((item, index) => (
          <TouchableOpacity 
            onPress={() => router.push({
              pathname: "/action-modal",
              params: { 
                ...item,
                selectedDate: selectedDate 
              },
            })}
            key={index}
          >
            <MedcardList
              medicine={item}
              selectedDate={selectedDate}
              index={index}
              totalMeds={filteredMeds.length}
            />
          </TouchableOpacity>
        ))
      ) : (
        <EmptyState />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  dateGroup: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    marginRight: 10,
    borderRadius: 8,
    height: 90,
    justifyContent: "center",
    paddingBottom: 10,
  },
  day: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  date: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
  },
});