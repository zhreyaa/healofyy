import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ChatListScreen() {
    const [doctor, setDoctor] = useState({});
    const navigation = useNavigation();

    useEffect(() => {
        // Fetch doctor's details when the component mounts
        fetchDoctor();
    }, []);

    // Fetch doctor's details based on the doctor ID stored in local storage
    const fetchDoctor = async () => {
        try {
            // Retrieve JWT token and doctor ID from local storage
            const token = localStorage.getItem('token');
            const doctorId = localStorage.getItem('dId');

            // Define the API URL and headers
            const apiUrl = `http://localhost:9090/api/doctor/${doctorId}`;
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            };

            // Fetch doctor's details
            const response = await axios.get(apiUrl, config);
            setDoctor(response.data);

            // Log the response for debugging
            console.log('Doctor details fetched');
        } catch (error) {
            console.error('Error fetching doctor details:', error);
        }
    };

    // Render the doctor's details and allow navigation to the chat page
    return (
        <ScrollView style={{ backgroundColor: "white" }}>
            <View style={{ alignItems: "center", marginTop: 30 }}>
                <Image
                    style={{ width: 100, height: 80, resizeMode: "contain" }}
                    source={require("./../assets/healofy.png")}
                />
            </View>

            <View style={styles.topBar}>
                {/* <FontAwesome name="user-md" size={24} color="white" style={styles.icon} /> */}
                <Text style={{paddingLeft:130,fontSize:18,color:'white'}}>Your Chats</Text>
            </View>

            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.doctorContainer}
                    onPress={() => navigation.navigate("Chat", { doctorId: doctor.id })}
                >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <FontAwesome name="user-md" size={24} color="#124b46" />
                        <Text style={styles.doctorName}>{doctor.firstName} {doctor.lastName}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({

    topBar: {
        backgroundColor: "#124b46", // Color #124b46 for the top bar
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
    },
    container: {

        flex: 1,
        backgroundColor: "white",
        padding: 20,
        paddingTop:50
    },
    doctorContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: "#f9f9f9",
    },
    doctorName: {
        marginLeft: 10,
        fontSize: 18,
        color: "black",
    },
});


// import React, { useState, useEffect } from "react";
// import { View, ScrollView, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
// import axios from "axios";
// import { FontAwesome } from "@expo/vector-icons";

// export default function ChatListScreen({ navigation }) {
//     const [doctors, setDoctors] = useState([]);
//     useEffect(() => {
//         // Function to fetch doctors
//         const fetchDoctors = async () => {
//             try {
//                 // Retrieve JWT token from local storage
//                 const token = localStorage.getItem('token');

//                 // Define the API URL and headers
//                 const apiUrl = 'http://localhost:9090/api/allDoctors';
//                 const config = {
//                     headers: {
//                         'Authorization': `Bearer ${token}`, // Use the token in the Authorization header
//                         'Content-Type': 'application/json', // Optional: specify content type
//                     }
//                 };
//                 const response = await axios.get(apiUrl, config);
//                 setDoctors(response.data);

//                 // Make the GET request to the API
//                 console.log('Get done');
//             } catch (error) {
//                 console.error('Error fetching doctors:', error);
//             }
//         };
//         fetchDoctors();
//     }, []);

//     return (
//         <ScrollView style={{ backgroundColor: "white" }}>
//             <View style={{ alignItems: "center", marginTop: 30 }}>
//                 <Image
//                     style={{ width: 100, height: 60, resizeMode: "contain" }}
//                     source={require("./../assets/healofy.png")}
//                 />
//             </View>

//             <View style={styles.container}>
//                 {doctors.map((doctor) => (
//                     <TouchableOpacity
//                         key={doctor.id}
//                         style={styles.doctorContainer}
//                         onPress={() => navigation.navigate("Chat", { doctorId: doctor.id })}
//                     >
//                         <View style={{ flexDirection: "row", alignItems: "center" }}>
//                             <FontAwesome name="user-md" size={24} color="#124b46" />
//                             <Text style={styles.doctorName}>{doctor.firstName} {doctor.lastName}</Text>
//                         </View>
//                     </TouchableOpacity>
//                 ))}
//             </View>
//         </ScrollView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "white",
//         padding: 20,
//     },
//     doctorContainer: {
//         flexDirection: "row",
//         alignItems: "center",
//         padding: 10,
//         borderWidth: 1,
//         borderColor: "#ccc",
//         borderRadius: 5,
//         marginBottom: 10,
//         backgroundColor: "#f9f9f9",
//     },
//     doctorName: {
//         marginLeft: 10,
//         fontSize: 18,
//         color: "black",
//     },
// });
