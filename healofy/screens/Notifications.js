import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { TextInput } from "react-native-web";
import { useNavigation } from "@react-navigation/native";

export default function Notifications()
{
  const navigation=useNavigation();

  return (
    <ScrollView style={{backgroundColor:"white" }}>
      <View style={{ padding: 10,marginTop:50 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color:"#124b46", alignSelf :"center"}}>NOTIFICATIONS</Text>
        <View
        style={{
          marginTop:30,
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          padding: 20,
          backgroundColor:"#124b46",
          // paddingTop:20
        }}>
        <View>
        <Image
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            resizeMode: "contain",
          }}
          source={require("../assets/healofy.png")}
        />

        {/* <Text style={{color:"white"}} >Shreya Chavan</Text> */}
      </View>
      <View style={{ flexDirection: "row", marginRight:20 }}>
        <Text style={{color:"white"}}>You have an appointment with Dr.Smith at 4pm.</Text>
      </View>
      
      
</View>
      </View>
      <View style={{ marginTop: 20 }}>
    <TouchableOpacity
      style={{
        backgroundColor: "#124b46",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: 180,
        alignSelf: "center",
        marginBottom:20
      }}
      onPress={() => navigation.navigate("Home")}
    >
      <Text style={{color: "white", alignSelf:"center" }}>Go back</Text>
    </TouchableOpacity>
  </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({});