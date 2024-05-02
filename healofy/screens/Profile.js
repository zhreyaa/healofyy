import { StyleSheet,TouchableOpacity, Text, View, Image, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { UserType } from "../UserContext";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Editprofile from "./Viewprofile";

export default function ProfileScreen()
 {

  const username=localStorage.getItem('username');

const navigation = useNavigation()
  
  const handleEditProfile = () => {
 
    navigation.navigate("Viewprofile");
  };

  const handleLogout = () => {
    navigation.replace("Login");
    console.log("Logged out"); // Placeholder for actual logout logic
  };

  const handleViewAppointments=()=>{
    navigation.navigate("Viewappointments")
  }
  return (
    <ScrollView style={{padding: 15, backgroundColor:"white" }}>
    <Image style={{
            flexDirection: "row",
            alignSelf: "center"}} source={require("../assets/healofy.png")}/>
      <View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Text style={{ flexDirection: "row", alignContent: "center",fontSize: 20, fontWeight: "bold",marginLeft:85}}>Hello, {username}</Text>
          <View
            style={{
              paddingHorizontal: 7,
              paddingVertical: 5,
              borderRadius: 8,
              backgroundColor: "#124b46",
            }}
          >
            <Text style={{color:"white"}}>Healofy</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            marginTop: 15,
          }}
        >
        </View>
        {/* Edit Profile and Logout buttons */}
        <View style={{alignItems: "center", gap: 10, marginTop: 20 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleEditProfile}
          >
            <Text style={styles.buttonText}>View Profile</Text>
          </TouchableOpacity>
          <View style={{marginTop:15}}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleViewAppointments}
          >
            <Text style={styles.buttonText}>View Appointments</Text>
          </TouchableOpacity>
          </View>
</View>
<View style={{alignItems: "center", gap: 10, marginTop: 20 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogout}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  topBar: {
    backgroundColor: "#124b46", // Color #124b46 for the top bar
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
},
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderColor: "#124b46",
    backgroundColor:'#124b46',
    borderWidth: 1,
    width:200,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize:18
  },
});
