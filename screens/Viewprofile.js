import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Alert,TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Octicons } from '@expo/vector-icons';

const ViewProfile = ({ navigation }) => {
    const [profileData, setProfileData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch profile data on component mount
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('id');
                const username = localStorage.getItem('username');
                const response = await axios.get(`http://localhost:9090/api/user/${username}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {
                    setProfileData(response.data);
                } else {
                    console.error('Failed to fetch profile data');
                    Alert.alert('Error', 'Failed to fetch profile data.');
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
                Alert.alert('Error', 'An error occurred while fetching your profile data.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfileData();
    }, []);

    // Display loading indicator if data is still being fetched
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#124b46" />
            </View>
        );
    }

    // Display profile information
    return (
        <ScrollView style={{ backgroundColor: 'white'}}>
            <View style={{ padding: 20, marginTop:50  }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#124b46', marginBottom: 50, alignSelf:'center',textDecorationLine:'underline' }}>
                    View Profile
                </Text>
                <ProfileDetail label="First Name:" value={profileData.firstName} icon="person" />
                <ProfileDetail label="Last Name:" value={profileData.lastName} icon="person" />
                <ProfileDetail label="Email:" value={profileData.email} icon="mail" />
                <ProfileDetail label="Username:" value={profileData.username} icon="person" />

                <TouchableOpacity
      style={{
        backgroundColor: "#124b46",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: 180,
        alignSelf: "center",
        marginTop:30
      
      }}
      onPress={() => navigation.goBack()}
    >
      <Text style={{color: "white", alignSelf:"center" }}>Go Back</Text>
    </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

// Define a component to display a single profile detail
// const ProfileDetail = ({ label, value, icon }) => (
//     <View style={{ marginBottom: 15,flexDirection: 'row', alignItems: 'center',marginLeft:50 }}>
//          <Octicons name={icon} size={30} color="#124b46" style={{ marginRight: 10, alignItems:'center' }} />
//         <Text style={{ color: '#124b46', fontWeight: 'bold',paddingRight:20, alignItems:'center' }}>{label}</Text>
//             <Text style={{ fontSize: 20 }}>{value}</Text>
          
//     </View>
// );

// Define a component to display a single profile detail
const ProfileDetail = ({ label, value, icon }) => (
    <View style={styles.detailBox}>
        <Octicons name={icon} size={30} color="#124b46" style={styles.icon} />
            <Text style={styles.label}>{label}</Text>
        <View style={styles.textContainer}>
            <Text style={styles.value}>{value}</Text>
        </View>
    </View>
);

// Define the styles for the ViewProfile component and ProfileDetail component
const styles = {
    scrollContainer: {
        backgroundColor: 'white',
    },
    container: {
        padding: 20,
        marginTop: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#124b46',
        marginBottom: 50,
        alignSelf: 'center',
        textDecorationLine: 'underline',
    },
    goBackButton: {
        backgroundColor: '#124b46',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: 180,
        alignSelf: 'center',
        marginTop: 30,
    },
    goBackButtonText: {
        color: 'white',
        alignSelf: 'center',
    },
    detailBox: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#124b46',
        borderRadius: 5,
        marginBottom: 15,
        backgroundColor: 'white',
        width: '100%',
        alignSelf: 'center',
    },
    icon: {
        marginRight: 10,
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
    },
    label: {
        color: '#124b46',
        fontWeight: 'bold',
        paddingRight: 20,
    },
    value: {
        fontSize: 20,
    },
};


export default ViewProfile;
