import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, Button, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";

export default function Viewappointments() {
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editedDetails, setEditedDetails] = useState({});
    const [token, setToken] = useState('');
    const [doctor, setDoctor] = useState({}); // New state to hold doctor details
    const navigation = useNavigation();

    useEffect(() => {
        fetchAppointments();
        getToken();
    }, []);

    const getToken = async () => {
        try {
            const userToken = localStorage.getItem('token');
            setToken(userToken);
        } catch (error) {
            console.error('Error retrieving token:', error);
        }
    };

    // Fetch appointments and doctor's details
    const fetchAppointments = async () => {
        try {
            const id = localStorage.getItem('pid');
            const apiUrl = `http://localhost:9090/api/appointment/patient/${id}`;
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };

            // Fetch appointments
            const response = await axios.get(apiUrl, config);
            const data = response.data;

            // Update state with appointments
            setAppointments(data);

            if (data.length > 0) {
                // Store the appointment ID and doctor ID in local storage
                localStorage.setItem('appointmentId', data[0].id);
                localStorage.setItem('dId', data[0].doctorId);

                // Fetch doctor's details
                fetchDoctorDetails(data[0].doctorId);
            }

            console.log(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    // Function to fetch doctor's details based on the doctor ID
    const fetchDoctorDetails = async (doctorId) => {
        try {
            const apiUrl = `http://localhost:9090/api/doctor/${doctorId}`;
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };

            // Make the GET request to the API
            const response = await axios.get(apiUrl, config);

            // Update state with the doctor's details
            setDoctor(response.data);
        } catch (error) {
            console.error('Error fetching doctor details:', error);
        }
    };

    // Handle editing an appointment
    const handleEdit = (appointment) => {
        setSelectedAppointment(appointment);
        setEditedDetails({
            firstName: appointment.firstName,
            lastName: appointment.lastName,
            email: appointment.email,
            age: appointment.age,
            severity: appointment.severity,
        });
        setEditModalVisible(true);
    };

    // Handle saving edited appointment details
    const handleSaveEdit = async () => {
        try {

          const appid=localStorage.getItem('appointmentId');
            await fetch(`http://localhost:9090/api/appointment/${appid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(editedDetails),
            });
            setEditModalVisible(false);
            fetchAppointments();
        } catch (error) {
            console.error('Error saving appointment:', error);
        }
    };

    // Handle deleting an appointment
    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:9090/api/appointment/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchAppointments();
        } catch (error) {
            console.error('Error deleting appointment:', error);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text>First Name: {item.firstName}</Text>
            <Text>Last Name: {item.lastName}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Age: {item.age}</Text>
            <Text>Severity: {item.severity}</Text>
            <Text>Date: {item.date}</Text>
            <Text>Time: {item.time}</Text>
            <Text>Doctor: {doctor.firstName} {doctor.lastName}</Text>
            <TouchableOpacity onPress={() => handleEdit(item)}>
                <Text style={styles.button}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={styles.button}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Text style={styles.button}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={styles.container}>
                <FlatList
                    data={appointments}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />

                {/* Edit Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={editModalVisible}
                    onRequestClose={() => setEditModalVisible(false)}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text>Edit Appointment Details</Text>
                            <TextInput
                                style={styles.input}
                                value={editedDetails.firstName}
                                onChangeText={(text) => setEditedDetails({ ...editedDetails, firstName: text })}
                            />

                            <TextInput
                                style={styles.input}
                                value={editedDetails.lastName}
                                onChangeText={(text) => setEditedDetails({ ...editedDetails, lastName: text })}
                            />

                            <TextInput
                                style={styles.input}
                                value={editedDetails.email}
                                onChangeText={(text) => setEditedDetails({ ...editedDetails, email: text })}
                            />

                            <TextInput
                                style={styles.input}
                                value={editedDetails.age}
                                onChangeText={(text) => setEditedDetails({ ...editedDetails, age: text })}
                            />

                            <TextInput
                                style={styles.input}
                                value={editedDetails.severity}
                                onChangeText={(text) => setEditedDetails({ ...editedDetails, severity: text })}
                            />
                            {/* Add other input fields for other details */}
                            <Button title="Save" onPress={handleSaveEdit} />
                        </View>
                    </View>
                </Modal>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
    },
    item: {
        backgroundColor: 'lightblue',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    button: {
        backgroundColor: '#124b46',
        color: 'white',
        width: 100,
        padding: 10,
        alignSelf: 'center',
        marginTop: 20,
        textAlign: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});





// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, Button, ScrollView } from 'react-native';
// import axios from 'axios';
// import { useNavigation } from "@react-navigation/native";

// export default function Viewappointments() {
//     const [appointments, setAppointments] = useState([]);
//     const [selectedAppointment, setSelectedAppointment] = useState(null);
//     const [editModalVisible, setEditModalVisible] = useState(false);
//     const [editedDetails, setEditedDetails] = useState({});
//     const [token, setToken] = useState('');
//     const [doctor, setDoctor] = useState({}); // New state to hold doctor details
//     const navigation = useNavigation();

//     useEffect(() => {
//         fetchAppointments();
//         getToken();
//     }, []);

//     const getToken = async () => {
//         try {
//             const userToken = localStorage.getItem('token');
//             setToken(userToken);
//         } catch (error) {
//             console.error('Error retrieving token:', error);
//         }
//     };

//     // Fetch appointments and doctor's details
//     const fetchAppointments = async () => {
//         try {
//             const id = localStorage.getItem('id');
//             const apiUrl = `http://localhost:9090/api/appointment/patient/${id}`;
//             const config = {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json',
//                 },
//             };

//             // Fetch appointments
//             const response = await axios.get(apiUrl, config);
//             const data = response.data;

//             // Update state with appointments
//             setAppointments(data);

//             if (data.length > 0) {
//                 // Store the appointment ID and doctor ID in local storage
//                 localStorage.setItem('appointmentId', data[0].id);
//                 localStorage.setItem('dId', data[0].doctorId);

//                 // Fetch doctor's details
//                 fetchDoctorDetails(data[0].doctorId);
//             }

//             console.log(response.data);
//         } catch (error) {
//             console.error('Error fetching appointments:', error);
//         }
//     };

//     // Function to fetch doctor's details based on the doctor ID
//     const fetchDoctorDetails = async (doctorId) => {
//         try {
//             const apiUrl = `http://localhost:9090/api/doctor/${doctorId}`;
//             const config = {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json',
//                 },
//             };

//             // Make the GET request to the API
//             const response = await axios.get(apiUrl, config);

//             // Update state with the doctor's details
//             setDoctor(response.data);
//         } catch (error) {
//             console.error('Error fetching doctor details:', error);
//         }
//     };

//     // Handle editing an appointment
//     const handleEdit = (appointment) => {
//         setSelectedAppointment(appointment);
//         setEditedDetails({
//             firstName: appointment.firstName,
//             lastName: appointment.lastName,
//             email: appointment.email,
//             age: appointment.age,
//             severity: appointment.severity,
//         });
//         setEditModalVisible(true);
//     };

//     // Handle saving edited appointment details
//     const handleSaveEdit = async () => {
//         try {
//           const appid=localStorage.getItem('appointmentId');
//             await fetch(`http://localhost:9090/api/appointment/${appid}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`,
//                 },
//                 body: JSON.stringify(editedDetails),
//             });
//             setEditModalVisible(false);
//             fetchAppointments();
//         } catch (error) {
//             console.error('Error saving appointment:', error);
//         }
//     };

//     // Handle deleting an appointment
//     const handleDelete = async (id) => {
//         try {
//             await fetch(`http://localhost:9090/api/appointment/${id}`, {
//                 method: 'DELETE',
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             fetchAppointments();
//         } catch (error) {
//             console.error('Error deleting appointment:', error);
//         }
//     };

//     const renderItem = ({ item }) => (
//         <View style={styles.item}>
//             <Text>First Name: {item.firstName}</Text>
//             <Text>Last Name: {item.lastName}</Text>
//             <Text>Email: {item.email}</Text>
//             <Text>Age: {item.age}</Text>
//             <Text>Severity: {item.severity}</Text>
//             <Text>Date: {item.date}</Text>
//             <Text>Time: {item.time}</Text>
//             <Text>Doctor: {doctor.firstName} {doctor.lastName}</Text>
//             <TouchableOpacity onPress={() => handleEdit(item)}>
//                 <Text style={styles.button}>Edit</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => handleDelete(item.id)}>
//                 <Text style={styles.button}>Delete</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => navigation.navigate("Home")}>
//                 <Text style={styles.button}>Cancel</Text>
//             </TouchableOpacity>
//         </View>
//     );

//     return (
//         <ScrollView style={{ backgroundColor: 'white' }}>
//             <View style={styles.container}>
//                 <FlatList
//                     data={appointments}
//                     renderItem={renderItem}
//                     keyExtractor={(item) => item.id.toString()}
//                 />

//                 {/* Edit Modal */}
//                 <Modal
//                     animationType="slide"
//                     transparent={true}
//                     visible={editModalVisible}
//                     onRequestClose={() => setEditModalVisible(false)}
//                 >
//                     <View style={styles.centeredView}>
//                         <View style={styles.modalView}>
//                             <Text>Edit Appointment Details</Text>
//                             <TextInput
//                                 style={styles.input}
//                                 value={editedDetails.firstName}
//                                 onChangeText={(text) => setEditedDetails({ ...editedDetails, firstName: text })}
//                             />

//                             <TextInput
//                                 style={styles.input}
//                                 value={editedDetails.lastName}
//                                 onChangeText={(text) => setEditedDetails({ ...editedDetails, lastName: text })}
//                             />

//                             <TextInput
//                                 style={styles.input}
//                                 value={editedDetails.email}
//                                 onChangeText={(text) => setEditedDetails({ ...editedDetails, email: text })}
//                             />

//                             <TextInput
//                                 style={styles.input}
//                                 value={editedDetails.age}
//                                 onChangeText={(text) => setEditedDetails({ ...editedDetails, age: text })}
//                             />

//                             <TextInput
//                                 style={styles.input}
//                                 value={editedDetails.severity}
//                                 onChangeText={(text) => setEditedDetails({ ...editedDetails, severity: text })}
//                             />
//                             {/* Add other input fields for other details */}
//                             <Button title="Save" onPress={handleSaveEdit} />
//                         </View>
//                     </View>
//                 </Modal>
//             </View>
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         marginTop: 30,
//     },
//     item: {
//         backgroundColor: 'lightblue',
//         padding: 20,
//         marginVertical: 8,
//         marginHorizontal: 16,
//     },
//     button: {
//         backgroundColor: '#124b46',
//         color: 'white',
//         width: 100,
//         padding: 10,
//         alignSelf: 'center',
//         marginTop: 20,
//         textAlign: 'center',
//     },
//     centeredView: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 22,
//     },
//     modalView: {
//         margin: 20,
//         backgroundColor: 'white',
//         borderRadius: 20,
//         padding: 35,
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5,
//     },
//     input: {
//         height: 40,
//         width: 200,
//         margin: 12,
//         borderWidth: 1,
//         padding: 10,
//     },
// });




// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, Button, ScrollView } from 'react-native';
// import { useNavigation } from "@react-navigation/native";
// import axios from 'axios';

// export default function Viewappointments()  
// {
//   const [appointments, setAppointments] = useState([]);
//   const [selectedAppointment, setSelectedAppointment] = useState(null);
//   const [editModalVisible, setEditModalVisible] = useState(false);
//   const [editedDetails, setEditedDetails] = useState({});
//   const [token, setToken] = useState('');
//   const [doctors, setDoctors] = useState([]);
//   const navigation = useNavigation();
//   // Fetch appointments from backend on component mount
//   useEffect(() => {
//     fetchAppointments();
//     getToken();
//   }, []);
// const id=localStorage.getItem('id');
//   const getToken = async () => {
//     try {
//       const userToken = localStorage.getItem('token');
//       setToken(userToken);
//     } catch (error) {
//       console.error('Error retrieving token:', error);
//     }
//   };

//   // const fetchAppointments = async () => {
//   //   try {
//   //     const id=localStorage.getItem('pid');

//   //     // const response = await fetch(`http://localhost:9090/api/appointment/patient/${id}`, {
//   //     //   headers: {
//   //     //     Authorization: `Bearer ${token}`
//   //     //   }
//   //     // });
//   //     const apiUrl = `http://localhost:9090/api/appointment/patient/${id}`;
//   //     const config = {
//   //       headers: {
//   //           'Authorization': `Bearer ${token}`,
//   //           'Content-Type': 'application/json',
//   //       },
//   //   };
//   //     // const data = await response.json();

//   //     const response = await axios.get(apiUrl, config);
//   //     const data = await response.data;
//   //     setAppointments(data);
//   //     console.log(response.data.JSON);
//   //     // localStorage.setItem('appid',response.data.id);
//   //   } catch (error) {
//   //     console.error('Error fetching appointments:', error);
//   //   }
//   // };

//   const fetchAppointments = async () => {
//     try {
//         const id = localStorage.getItem('id');
//         const apiUrl = `http://localhost:9090/api/appointment/patient/${id}`;
//         const config = {
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//             },
//         };

//         // Fetch appointments
//         const response = await axios.get(apiUrl, config);
//         const data = response.data;

//         // Update state and local storage
//         setAppointments(data);
//         if (data.length > 0) {
//             // Store the appointment ID of the first appointment in local storage
//             // console.log(data[0].id);
//             localStorage.setItem('appointmentId', data[0].id);
//             localStorage.setItem('dId', data[0].doctorId);
//         }

//         console.log(response.data);
//     } catch (error) {
//         console.error('Error fetching appointments:', error);
//     }
// };


//   const handleEdit = (appointment) => {
//     setSelectedAppointment(appointment);
//     setEditedDetails({
//       firstName: appointment.firstName,
//       lastName: appointment.lastName,
//       email: appointment.email,
//       age: appointment.age,
//       severity: appointment.severity
//     });
//     setEditModalVisible(true);
//   };

//   const handleSaveEdit = async () => {
//     try {
//       await fetch(`http://localhost:9090/api/appointment/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify(editedDetails)
//       });
//       setEditModalVisible(false);
//       fetchAppointments();
//     } catch (error) {
//       console.error('Error saving appointment:', error);
//     }
//   };


//   const handleDelete = async (id) => {
//     try {
//       await fetch(`http://localhost:9090/api/appointment/${id}`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       fetchAppointments();
//     } catch (error) {
//       console.error('Error deleting appointment:', error);
//     }
//   };


//   useEffect(() => {
//     // Function to fetch doctors
//     const fetchDoctors = async () => {
//         try {
//             // Retrieve JWT token from local storage
//             const token = localStorage.getItem('token');
//             const did = localStorage.getItem('dId');
//             // Define the API URL and headers
//             const apiUrl = `http://localhost:9090/api/doctors/${did}`;
//             const config = {
//                 headers: {
//                     'Authorization': `Bearer ${token}`, // Use the token in the Authorization header
//                     'Content-Type': 'application/json', // Optional: specify content type
//                 }
//             };

//             // Make the GET request to the API
//             const response = await axios.get(apiUrl, config);

//             // Update state with the list of doctors
//             // console.log(response.data.id);
//             setDoctors(response.data);
//             // console.log('Get doc done');
//         } catch (error) {
//             console.error('Error fetching doctors:', error);
//         }
//     };
//     fetchDoctors();
// }, []);


//   const renderItem = ({ item },doctors) => (
//     <View style={styles.item}>
//       <Text>First Name: {item.firstName}</Text>
//       <Text>Last Name: {item.lastName}</Text>
//       <Text>Email: {item.email}</Text>
//       <Text>Age: {item.age}</Text>
//       <Text>Severity: {item.severity}</Text>
//       <Text>Date: {item.date}</Text>
//       <Text>Time: {item.time}</Text>
//       <Text>Doctor: {doctors.firstName}</Text>
//       <TouchableOpacity onPress={() => handleEdit(item)}>
//         <Text style={styles.button}>Edit</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => handleDelete(item.id)}>
//         <Text style={styles.button}>Delete</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => navigation.navigate("Home")}>
//         <Text style={styles.button}>Cancel</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <ScrollView style={{backgroundColor:'white'}}>
//     <View style={styles.container}>
//       <FlatList
//         data={appointments}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id.toString()}
//       />

//       {/* Edit Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={editModalVisible}
//         onRequestClose={() => setEditModalVisible(false)}
//       >
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Text>Edit Appointment Details</Text>
//             <TextInput
//               style={styles.input}
//               value={editedDetails.firstName}
//               onChangeText={(text) => setEditedDetails({ ...editedDetails, firstName: text })}
//             />

// <TextInput
//               style={styles.input}
//               value={editedDetails.lastName}
//               onChangeText={(text) => setEditedDetails({ ...editedDetails, lastName: text })}
//             />

// <TextInput
//               style={styles.input}
//               value={editedDetails.email}
//               onChangeText={(text) => setEditedDetails({ ...editedDetails, email: text })}
//             />

// <TextInput
//               style={styles.input}
//               value={editedDetails.age}
//               onChangeText={(text) => setEditedDetails({ ...editedDetails, age: text })}
//             />

// <TextInput
//               style={styles.input}
//               value={editedDetails.severity}
//               onChangeText={(text) => setEditedDetails({ ...editedDetails, severity: text })}
//             />
//             {/* Add other input fields for other details */}
//             <Button title="Save" onPress={handleSaveEdit} />
//           </View>
//         </View>
//       </Modal>
//     </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 30,
//     fontSize:40
//   },
//   item: {
//     backgroundColor: 'lightblue',
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//     color:"white",
//     fontSize:30
//   },
//   button: {
//     backgroundColor: '#124b46',
//     color: 'white',
//     width:100,
//     padding: 10,
//     alignSelf:'center',
//     marginTop: 20,
//     textAlign: 'center',
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 22
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5
//   },
//   input: {
//     height: 40,
//     width: 200,
//     margin: 12,
//     borderWidth: 1,
//     padding: 10
//   }
// });

