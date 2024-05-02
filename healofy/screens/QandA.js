import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function QandA() {
  const navigation=useNavigation();
  return (
    <View style={{ flex: 1, paddingBottom: 0 }}>
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={{ alignItems: 'center', marginTop: 30 }}>
          <Text style={styles.title}>Q&A</Text>
        </View>

        <View style={styles.container}>
          {/* Sample post layout */}
          <View style={styles.postContainer}>
            <View style={{ flexDirection: 'row', marginTop: 0 }}>
              <FontAwesome
                name="user"
                size={20}
                color="#124b46"
                style={{ marginTop: 9, marginRight: 5 }}
              />
              <Text style={styles.postUsername}>Username</Text>
            </View>

            <View
            style={{
              paddingHorizontal: 7,
              paddingVertical: 5,
              borderRadius: 8,
              width:'37%',
              marginTop:10,
              marginBottom:10,
              backgroundColor: "#124b46",
              flexDirection:'row',
            }}
          >
            <Text style={{color:"white",fontSize:18}}>Questions</Text>
            <FontAwesome name="arrow-down" size={20} color="white" style={{marginLeft:10}} />
          </View>
    
        <Text style={styles.postDescription}>Post Description</Text>
            <View
            style={{
              paddingHorizontal: 7,
              paddingVertical: 5,
              borderRadius: 8,
              width:'33%',
              marginTop:10,
              marginBottom:10,
              backgroundColor: "#124b46",
              flexDirection:'row',
            }}
          >
            <Text style={{color:"white",fontSize:18}}>Answers</Text>
            <FontAwesome name="arrow-down" size={20} color="white" style={{marginLeft:10}} />
          </View>

            {/* Placeholder for comment list */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <Text style={{ flex: 1,fontSize:18 }}>Sample comment text</Text>
            </View>
          </View>
        </View>

        <View>
          <TouchableOpacity
            style={{
              backgroundColor: '#124b46',
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 5,
              width: 180,
              alignSelf: 'center',
              marginTop: 30,
              marginBottom: 20,
            }}
            onPress={() => {
              navigation.navigate("Home")
            }}
          >
            <Text style={{ color: 'white', alignSelf: 'center' }}>Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Fab button */}
      <TouchableOpacity style={styles.fab}
     onPress={() => {
      navigation.navigate("Question")
    }}
      >
        <FontAwesome name="plus" size={24} color="#124b46" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  postUsername: {
    marginTop: 10,
    marginBottom: 10,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    textDecorationLine: 'underline',
  },
  postDescription: {
    color: 'black',
    fontSize: 18,
    paddingTop:10,
    paddingBottom:10
  },
  postContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  postTitle: {
    fontSize: 18,
  },
  postContent: {
    fontSize: 16,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#124b46',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#88a5a2',
    borderRadius: 30,
    elevation: 8,
  },
});
