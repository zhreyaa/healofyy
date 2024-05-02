import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Octicons, Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import axios from 'axios';
import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    StyledFormArea,
    SubTitle,
    RightIcon,
    LeftIcon,
    ButtonText,
    StyledButton,
    StyledInputLabel,
    StyledTextInput,
    Colors,
    Msgbox,
    Line,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent
} from './../components/styles';
import KeyboardAvoidWrap from '../components/KeyboardAvoidWrap';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';

const { brand, darkLight, primary } = Colors;

const Appointment = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedTiming, setSelectedTiming] = useState('');
    const severity=localStorage.getItem('severity');
    const [email, setEmail] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    // const [severity, setSeverity] = useState('');
    const [age, setAge] = useState('');
    const [date, setDate] = useState('');
    const [doctorId, setDoctorId] = useState('');
    const [doctors, setDoctors] = useState([]);

    const patientId = localStorage.getItem('pid');

    // const [time, setTime] = useState('');

    const bookAppointment=()=>{

        const loginUrl = "http://localhost:9090/api/createAppointment";
        const method='POST';
        const data={
            firstName:firstName,
            lastName:lastName,
            email:email,
            severity:severity,
            age:age,
            date:date,
            time:selectedTiming,
            doctorId:doctorId,
            patientId:patientId

        }
    
        const token = localStorage.getItem('token'); // Retrieve JWT token from local storage
    
        axios({
            url: loginUrl,
            method: method,
            headers: {
                Authorization: `Bearer ${token}`, // Set the Authorization header with the JWT token
                'Content-Type': 'application/json', // Set the content type to JSON
            },
            data: data,
        })
        .then((res) => {
            console.log("Appointment booked");
            navigation.navigate('Home');
        })
        .catch((err) => {
            console.log("Some error occurred");
        });
    }


    

    // Define your available time slots
    const timeSlots = [
        '9:00 AM',
        '10:00 AM',
        '11:00 AM',
        '12:00 PM',
        '1:00 PM',
        '2:00 PM',
        '3:00 PM',
        '4:00 PM',
        '5:00 PM',
        '6:00 PM',
        '7:00 PM',
        '8:00 PM',
        'Any time is fine'
    ];

    useEffect(() => {
        // Function to fetch doctors
        const fetchDoctors = async () => {
            try {
                // Retrieve JWT token from local storage
                const token = localStorage.getItem('token');

                // Define the API URL and headers
                const apiUrl = 'http://localhost:9090/api/allDoctors';
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Use the token in the Authorization header
                        'Content-Type': 'application/json', // Optional: specify content type
                    }
                };

                // Make the GET request to the API
                const response = await axios.get(apiUrl, config);

                // Update state with the list of doctors
                setDoctors(response.data);
                console.log('Get done');
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };
        fetchDoctors();
    }, []);

    return (
        // <KeyboardAvoidWrap>
        <ScrollView style=
        {{backgroundColor:'white'}}>
            <StyledContainer>
                <StatusBar style='dark' />
                <InnerContainer>
                    <PageTitle>Appointment</PageTitle>
                    <SubTitle style={{marginLeft:10,marginRight:10,alignSelf:"center"}}>Book an appointment with a doctor</SubTitle>

                    <Formik
                        initialValues={{ name: '', email: '', age: '' }}
                        onSubmit={(values) => {
                            console.log(values);
                            // Perform appointment booking logic here
                        }}
                    >
                        {({ handleChange, handleBlur, values }) => (
                            <StyledFormArea>
                                <MyTextInput
                                    label="firstName"
                                    icon="person"
                                    placeholder="John Doe"
                                    placeholderTextColor={darkLight}
                                    onChangeText={(text)=> setfirstName(text)}
                                    onBlur={handleBlur('firstName')}
                                    values={values.name}
                                />

<MyTextInput
                                    label="lastName"
                                    icon="person"
                                    placeholder="John Doe"
                                    placeholderTextColor={darkLight}
                                    onChangeText={(text)=> setlastName(text)}
                                    onBlur={handleBlur('lastName')}
                                    values={values.name}
                                />

                                <MyTextInput
                                    label="Email Address"
                                    icon="mail"
                                    placeholder="john@example.com"
                                    placeholderTextColor={darkLight}
                                    onChangeText={(text)=> setEmail(text)}
                                    onBlur={handleBlur('email')}
                                    values={values.email}
                                    keyboardType="email-address"
                                />

                                <MyTextInput
                                    label="Age"
                                    icon="calendar"
                                    placeholder="Enter your age"
                                    placeholderTextColor={darkLight}
                                    onChangeText={(text)=> setAge(text)}
                                    onBlur={handleBlur('age')}
                                    values={values.age}
                                    keyboardType="numeric"
                                />

{/* <MyTextInput
                                    label="Severity"
                                    placeholder="Depression"
                                    placeholderTextColor={darkLight}
                                    onChangeText={(text)=> setSeverity(text)}
                                    onBlur={handleBlur('severity')}
                                    values={values.severity}
                                /> */}

<MyTextInput
                                    label="Date"
                                    icon='clock'
                                    placeholder="YYYY-MM-DD"
                                    placeholderTextColor={darkLight}
                                    onChangeText={(text)=> setDate(text)}
                                    onBlur={handleBlur('date')}
                                    values={values.date}
                                />
 {/* Select Doctor Dropdown */}
 <View style={{ marginBottom: 10,marginTop:10 }}>
                                    <StyledInputLabel>Select Doctor</StyledInputLabel>
                                    {doctors.map((doctors, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={{
                                                paddingHorizontal: 15,
                                                paddingVertical: 10,
                                                marginBottom: 10,
                                                backgroundColor: selectedDoctor === doctors ? primary : 'transparent',
                                                borderRadius: 5,
                                            }}
                                            onPress={() => {
                                                setSelectedDoctor(doctors);
                                                setDoctorId(doctors.id);
                                            }}
                                        >
                                            <Text style={{ color: selectedDoctor === doctors ? darkLight : '#124b46' }}>
                                                {doctors.firstName} {doctors.lastName}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>

                                {/* Time Slots */}
                                <View style={{ marginBottom: 20 }}>
                                    <StyledInputLabel>Select Preferred Timing</StyledInputLabel>
                                    {timeSlots.map((time, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={{
                                                paddingHorizontal: 15,
                                                paddingVertical: 10,
                                                marginBottom: 10,
                                                backgroundColor: selectedTiming === time ? primary : 'transparent',
                                                borderRadius: 5,
                                            }}
                                            onPress={() => setSelectedTiming(time)}
                                        >
                                            <Text style={{ color: selectedTiming === time ? darkLight : '#124b46' }}>{time}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>

                                <StyledButton onPress={bookAppointment}>
                                    <ButtonText>
                                        Book Appointment
                                    </ButtonText>
                                </StyledButton>

                                <Line />

                            </StyledFormArea>
                        )}
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        {/* </KeyboardAvoidWrap> */}
        </ScrollView>
    );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    );
};

export default Appointment;

//old code above


//new code below

// import React, { useState, useEffect } from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { Octicons, Ionicons } from '@expo/vector-icons';
// import { Formik } from 'formik';
// import axios from 'axios';
// import {
//     StyledContainer,
//     InnerContainer,
//     PageLogo,
//     PageTitle,
//     StyledFormArea,
//     SubTitle,
//     RightIcon,
//     LeftIcon,
//     ButtonText,
//     StyledButton,
//     StyledInputLabel,
//     StyledTextInput,
//     Colors,
//     Msgbox,
//     Line,
//     ExtraText,
//     ExtraView,
//     TextLink,
//     TextLinkContent
// } from './../components/styles';
// import KeyboardAvoidWrap from '../components/KeyboardAvoidWrap';
// import { View, TouchableOpacity, Text, ScrollView } from 'react-native';

// const { brand, darkLight, primary } = Colors;

// const Appointment = ({ navigation }) => {
//     // const [hidePassword, setHidePassword] = useState(true);
//     const [selectedDoctor, setSelectedDoctor] = useState('');
//     const [selectedTiming, setSelectedTiming] = useState('');

//     const [email, setEmail] = useState('');
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [severity, setSeverity] = useState('');
//     const [age, setAge] = useState('');
//     const [date, setDate] = useState('');
//     const [doctorId, setDoctorId] = useState('');
//     const [patientId, setPatientId] = useState('1');
//     const [doctors, setDoctors] = useState([]);

//     // Define your available time slots
//     const timeSlots = [
//         '9:00 AM',
//         '10:00 AM',
//         '11:00 AM',
//         '12:00 PM',
//         '1:00 PM',
//         '2:00 PM',
//         '3:00 PM',
//         '4:00 PM',
//         '5:00 PM',
//         '6:00 PM',
//         '7:00 PM',
//         '8:00 PM',
//         'Any time is fine'
//     ];

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

//                 // Make the GET request to the API
//                 const response = await axios.get(apiUrl, config);

//                 // Update state with the list of doctors
//                 setDoctors(response.data);
//                 console.log('Get done');
//             } catch (error) {
//                 console.error('Error fetching doctors:', error);
//             }
//         };

//         // Call the function to fetch doctors
//         fetchDoctors();
//     }, []);

//     const bookAppointment = () => {
//         const loginUrl = 'http://localhost:9090/api/createAppointment';
//         const method = 'POST';
//         const data = {
//             firstName: firstName,
//             lastName: lastName,
//             email: email,
//             severity: severity,
//             age: age,
//             date: date,
//             time: selectedTiming,
//             doctorId: doctorId,
//             patientId: patientId
//         };

//         const token = localStorage.getItem('token'); // Retrieve JWT token from local storage

//         axios({
//             url: loginUrl,
//             method: method,
//             headers: {
//                 Authorization: `Bearer ${token}`, // Set the Authorization header with the JWT token
//                 'Content-Type': 'application/json', // Set the content type to JSON
//             },
//             data: data,
//         })
//         .then((res) => {
//             console.log('Appointment booked');
//             navigation.navigate('Home');
//         })
//         .catch((err) => {
//             console.log('Some error occurred');
//         });
//     };

//     return (
//         <ScrollView>
//             <StyledContainer>
//                 <StatusBar style='dark' />
//                 <InnerContainer>
//                     <PageTitle>Appointment</PageTitle>
//                     <SubTitle style={{ marginLeft: 10, marginRight: 10, alignSelf: 'center' }}>
//                         Book an appointment with a doctor
//                     </SubTitle>

//                     <Formik
//                         initialValues={{ name: '', email: '', age: '' }}
//                         onSubmit={(values) => {
//                             console.log(values);
//                             // Perform appointment booking logic here
//                         }}
//                     >
//                         {({ handleChange, handleBlur, values }) => (
//                             <StyledFormArea>
//                                 <MyTextInput
//                                     label="First Name"
//                                     icon="person"
//                                     placeholder="John"
//                                     placeholderTextColor={darkLight}
//                                     onChangeText={(text) => setFirstName(text)}
//                                     onBlur={handleBlur('firstName')}
//                                     value={values.name}
//                                 />

//                                 <MyTextInput
//                                     label="Last Name"
//                                     icon="person"
//                                     placeholder="Doe"
//                                     placeholderTextColor={darkLight}
//                                     onChangeText={(text) => setLastName(text)}
//                                     onBlur={handleBlur('lastName')}
//                                     value={values.name}
//                                 />

//                                 <MyTextInput
//                                     label="Email Address"
//                                     icon="mail"
//                                     placeholder="john@example.com"
//                                     placeholderTextColor={darkLight}
//                                     onChangeText={(text) => setEmail(text)}
//                                     onBlur={handleBlur('email')}
//                                     value={values.email}
//                                     keyboardType="email-address"
//                                 />

//                                 <MyTextInput
//                                     label="Age"
//                                     icon="calendar"
//                                     placeholder="Enter your age"
//                                     placeholderTextColor={darkLight}
//                                     onChangeText={(text) => setAge(text)}
//                                     onBlur={handleBlur('age')}
//                                     value={values.age}
//                                     keyboardType="numeric"
//                                 />

//                                 <MyTextInput
//                                     label="Severity"
//                                     placeholder="Depression"
//                                     placeholderTextColor={darkLight}
//                                     onChangeText={(text) => setSeverity(text)}
//                                     onBlur={handleBlur('severity')}
//                                     value={values.severity}
//                                 />

//                                 <MyTextInput
//                                     label="Date"
//                                     placeholder="YYYY-MM-DD"
//                                     placeholderTextColor={darkLight}
//                                     onChangeText={(text) => setDate(text)}
//                                     onBlur={handleBlur('date')}
//                                     value={values.date}
//                                 />

//                                 {/* Select Doctor Dropdown */}
//                                 <View style={{ marginBottom: 10,marginTop:10 }}>
//                                     <StyledInputLabel>Select Doctor</StyledInputLabel>
//                                     {doctors.map((doctors, index) => (
//                                         <TouchableOpacity
//                                             key={index}
//                                             style={{
//                                                 paddingHorizontal: 15,
//                                                 paddingVertical: 10,
//                                                 marginBottom: 10,
//                                                 backgroundColor: selectedDoctor === doctors ? primary : 'transparent',
//                                                 borderRadius: 5,
//                                             }}
//                                             onPress={() => {
//                                                 setSelectedDoctor(doctors);
//                                                 setDoctorId(doctors.id);
//                                             }}
//                                         >
//                                             <Text style={{ color: selectedDoctor === doctors ? darkLight : '#124b46' }}>
//                                                 {doctors.firstName} {doctors.lastName}
//                                             </Text>
//                                         </TouchableOpacity>
//                                     ))}
//                                 </View>

//                                 {/* Time Slots */}
//                                 <View style={{ marginBottom: 20 }}>
//                                     <StyledInputLabel>Select Preferred Timing</StyledInputLabel>
//                                     {timeSlots.map((time, index) => (
//                                         <TouchableOpacity
//                                             key={index}
//                                             style={{
//                                                 paddingHorizontal: 15,
//                                                 paddingVertical: 10,
//                                                 marginBottom: 10,
//                                                 backgroundColor: selectedTiming === time ? primary : 'transparent',
//                                                 borderRadius: 5,
//                                             }}
//                                             onPress={() => setSelectedTiming(time)}
//                                         >
//                                             <Text style={{ color: selectedTiming === time ? darkLight : '#124b46' }}>{time}</Text>
//                                         </TouchableOpacity>
//                                     ))}
//                                 </View>

//                                 <StyledButton onPress={bookAppointment}>
//                                     <ButtonText>
//                                         Book Appointment
//                                     </ButtonText>
//                                 </StyledButton>

//                                 <Line />

//                             </StyledFormArea>
//                         )}
//                     </Formik>
//                 </InnerContainer>
//             </StyledContainer>
//         </ScrollView>
//     );
// };

// const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
//     return (
//         <View>
//             <LeftIcon>
//                 <Octicons name={icon} size={30} color={brand} />
//             </LeftIcon>
//             <StyledInputLabel>{label}</StyledInputLabel>
//             <StyledTextInput {...props} />
//             {isPassword && (
//                 <RightIcon onPress={() => setHidePassword(!hidePassword)}>
//                     <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={30} color={darkLight} />
//                 </RightIcon>
//             )}
//         </View>
//     );
// };

// export default Appointment;
