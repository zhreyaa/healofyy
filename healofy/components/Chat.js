// import React, { useState, useEffect } from "react";
// import { View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
// import axios from "axios";
// import { FontAwesome } from "@expo/vector-icons";

// export default function ChatScreen({ navigation, route }) {
//     // Define states for chat and new message
//     const [chats, setChats] = useState([]);
//     const [newMessage, setNewMessage] = useState("");

//     // Retrieve userId, appointmentId, and doctorId from local storage
//     const userId = localStorage.getItem('id');
//     const appointmentId = localStorage.getItem('appointmentId');
//     const doctorId = localStorage.getItem('dId');

//     // State to store doctor's name
//     const [doctorName, setDoctorName] = useState('');

//     // Fetch chats and doctor's name on component mount
//     useEffect(() => {
//         fetchChats();
//         fetchDoctorName();
//     }, []);

//     // Function to fetch chats based on appointmentId
//     const fetchChats = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             const response = await axios.get(`http://localhost:9090/api/${appointmentId}/allChats`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             setChats(response.data);
//         } catch (error) {
//             console.error("Error fetching chats:", error);
//         }
//     };

//     // Function to fetch the doctor's name based on doctorId
//     const fetchDoctorName = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             const response = await axios.get(`http://localhost:9090/api/doctor/${doctorId}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             const doctor = response.data;
//             setDoctorName(`${doctor.firstName} ${doctor.lastName}`);
//         } catch (error) {
//             console.error("Error fetching doctor name:", error);
//         }
//     };

//     // Function to send a new chat message
//     const sendMessage = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             const username = localStorage.getItem('username');
//             const chatData = {
//                 name: username,
//                 content: newMessage,
//                 sentAt: new Date(),
//                 roleId: 1, // Set the user roleId as 1
//             };

//             // Send the chat message using the API request
//             await axios.post(`http://localhost:9090/api/${appointmentId}/${userId}/createChat`, chatData, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     "Content-Type": "application/json",
//                 },
//             });

//             // Update the chat list after sending the message
//             fetchChats();
//             setNewMessage("");
//         } catch (error) {
//             console.error("Error sending message:", error);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             {/* Top bar containing go back button, FontAwesome icon, and doctor's name */}
//             <View style={styles.topBar}>
//                 <TouchableOpacity onPress={navigation.goBack} style={styles.goBackButton}>
//                     <FontAwesome name="arrow-left" size={20} color="white" />
//                 </TouchableOpacity>
//                 <FontAwesome name="user-md" size={24} color="white" style={styles.icon} />
//                 <Text style={styles.doctorName}>{doctorName}</Text>
//             </View>

//             <ScrollView style={styles.chatContainer}>
//                 <View>
//                     {chats.map((chat) => (
//                         <View
//                             key={chat.id}
//                             style={[
//                                 styles.chatBubble,
//                                 chat.roleId === 1 ? styles.patientBubble : styles.doctorBubble,
//                                 chat.roleId === 1 ? styles.right : styles.left,
//                             ]}
//                         >
//                             <Text style={styles.chatText}>{chat.content}</Text>
//                         </View>
//                     ))}
//                 </View>
//             </ScrollView>

//             <View style={styles.inputContainer}>
//                 <TextInput
//                     value={newMessage}
//                     onChangeText={setNewMessage}
//                     placeholder="Type your message here..."
//                     style={styles.textInput}
//                 />
//                 <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
//                     <FontAwesome name="send" size={20} color="white" />
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "white",
//     },
//     topBar: {
//         backgroundColor: "#124b46", // Color #124b46 for the top bar
//         padding: 15,
//         flexDirection: "row",
//         alignItems: "center",
//     },
//     goBackButton: {
//         marginRight: 10,
//     },
//     icon: {
//         marginRight: 10,
//     },
//     doctorName: {
//         color: "white", // White text color for the doctor's name
//         fontSize: 18,
//         fontWeight: "bold",
//     },
//     chatContainer: {
//         flex: 1,
//         padding: 20,
//     },
//     chatBubble: {
//         padding: 10,
//         borderRadius: 5,
//         marginBottom: 10,
//         maxWidth: "80%", // Limit the width of chat bubbles
//     },
//     patientBubble: {
//         backgroundColor: "#e0e0e0", // Light gray for patient messages
//     },
//     doctorBubble: {
//         backgroundColor: "#e0f7fa", // Light teal for doctor messages
//     },
//     left: {
//         alignSelf: "flex-start", // Align left for patient messages
//     },
//     right: {
//         alignSelf: "flex-end", // Align right for doctor messages
//     },
//     chatText: {
//         fontSize: 16,
//         color: "black",
//     },
//     inputContainer: {
//         flexDirection: "row",
//         alignItems: "center",
//         padding: 10,
//         borderTopWidth: 1,
//         borderColor: "#ccc",
//     },
//     textInput: {
//         flex: 1,
//         borderWidth: 1,
//         borderColor: "#ccc",
//         borderRadius: 5,
//         paddingHorizontal: 10,
//     },
//     sendButton: {
//         padding: 10,
//         marginLeft: 10,
//         backgroundColor: "#124b46",
//         borderRadius: 5,
//     },
// });




import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";

export default function ChatScreen({ route }) {
    // Define states for chat and new message
    const [chats, setChats] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    // Retrieve userId, appointmentId, and doctorId from local storage
    const userId = localStorage.getItem('id');
    const appointmentId = localStorage.getItem('appointmentId');
    const doctorId = localStorage.getItem('dId');

    // State to store doctor's name
    const [doctorName, setDoctorName] = useState('');

    // Fetch chats and doctor's name on component mount
    useEffect(() => {
        fetchChats();
        fetchDoctorName();
    }, []);

    // Function to fetch chats based on appointmentId
    const fetchChats = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`http://localhost:9090/api/${appointmentId}/allChats`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setChats(response.data);
        } catch (error) {
            console.error("Error fetching chats:", error);
        }
    };

    // Function to fetch the doctor's name based on doctorId
    const fetchDoctorName = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`http://localhost:9090/api/doctor/${doctorId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const doctor = response.data;
            setDoctorName(`${doctor.firstName} ${doctor.lastName}`);
        } catch (error) {
            console.error("Error fetching doctor name:", error);
        }
    };

    // Function to send a new chat message
    const sendMessage = async () => {
        try {
            const token = localStorage.getItem("token");
            const username = localStorage.getItem('username');
            const chatData = {
                name: username,
                content: newMessage,
                sentAt: new Date(),
                roleId: 1, // Set the user roleId as 1
            };

            // Send the chat message using the API request
            await axios.post(`http://localhost:9090/api/${appointmentId}/${userId}/createChat`, chatData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            // Update the chat list after sending the message
            fetchChats();
            setNewMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <View style={styles.container}>
            {/* Top bar containing doctor's name with FontAwesome icon */}
            <View style={styles.topBar}>
                <FontAwesome name="user-md" size={24} color="white" style={styles.icon} />
                <Text style={styles.doctorName}>{doctorName}</Text>
            </View>

            <ScrollView style={styles.chatContainer}>
                <View>
                    {chats.map((chat) => (
                        <View
                            key={chat.id}
                            style={[
                                styles.chatBubble,
                                chat.roleId === 1 ? styles.patientBubble : styles.doctorBubble,
                                chat.roleId === 1 ? styles.right : styles.left,
                            ]}
                        >
                            <Text style={styles.chatText}>{chat.content}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.inputContainer}>
                <TextInput
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="Type your message here..."
                    style={styles.textInput}
                />
                <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                    <FontAwesome name="send" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    topBar: {
        backgroundColor: "#124b46", // Color #124b46 for the top bar
        padding: 15,
        marginTop:50,
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        marginRight: 10,
    },
    doctorName: {
        color: "white", // White text color for the doctor's name
        fontSize: 18,
        fontWeight: "bold",
    },
    chatContainer: {
        flex: 1,
        padding: 20,
    },
    chatBubble: {
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        maxWidth: "80%", // Limit the width of chat bubbles
    },
    patientBubble: {
        backgroundColor: "#e0e0e0", // Light gray for patient messages
    },
    doctorBubble: {
        backgroundColor: "#e0f7fa", // Light teal for doctor messages
    },
    left: {
        alignSelf: "flex-start", // Align left for patient messages
    },
    right: {
        alignSelf: "flex-end", // Align right for doctor messages
    },
    chatText: {
        fontSize: 16,
        color: "black",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderTopWidth: 1,
        borderColor: "#ccc",
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    sendButton: {
        padding: 10,
        marginLeft: 10,
        backgroundColor: "#124b46",
        borderRadius: 5,
    },
});
