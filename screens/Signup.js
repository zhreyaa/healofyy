import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';
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

import {Formik} from 'formik';
import KeyboardAvoidWrap from '../components/KeyboardAvoidWrap';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import DateTime from '@react-native-community/datetime';

const {brand, darkLight, primary} = Colors;

const Signup = ({navigation}) => {
    
    const [hidePassword, setHidePassword] = useState(true);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(2000,0,1));
    const [dob, setDob] = useState();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setfirstName] = useState('');
    const [lastname, setlastName] = useState('');
    const [username, setUsername] = useState('');
    const [age, setAge] = useState('');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setDob(currentDate);
    };

    const onPressSignup = () => {
        const signupUrl = "http://localhost:9090/api/auth/register";
        const method='POST';
        const data={
            firstname: firstname,
            lastname: lastname,
            username: username,
            email: email,
            password: password,
            age:age
        }
    
        axios({
            url: signupUrl,
            method: method,
            headers: {
                'Content-Type': 'application/json', // Add content type header
            },
            data: data,
        })
        .then((res) => {
            console.log("Signup successful");
            navigation.navigate('Login');
        })
        .catch((err) => {
            console.log("Some error occurred:", err);
        });
    }
    

    const showDate = () => {
        setShow(true);
    };

  return (
    // <KeyboardAvoidWrap>
    <ScrollView style={{backgroundColor:"white"}}>
     <StyledContainer>
     <StatusBar style='dark'/>
        <InnerContainer>
             <PageTitle>HEALOFY</PageTitle>
             <SubTitle>Sign Up</SubTitle>

             {show && (
                        <DateTime
                            testID='dateTime'
                            value={date}
                            mode='date'
                            is24Hour={true}
                            display='default'
                            onChange={onChange}
                        />
                    )}


             <Formik
             initialValues={{fullName:'', email: '', dateOfBirth: '', password: '', confirmPassword: ''}}
             onSubmit={(values) =>{
                console.log(values);
                navigation.navigate("Login");
             }}
             >
               {({handleChange, handleBlur, handleSubmit, values})=>(
                <StyledFormArea>
               
                <MyTextInput
                    label="First Name"
                    icon="person"
                    placeholder="John"
                    placeholderTextColor={darkLight}
                    onChangeText={(text)=> setfirstName(text)}
                    onBlur={handleBlur('firstname')}
                    values={values.firstname}
                />

<MyTextInput
                    label="Last Name"
                    icon="person"
                    placeholder="Doe"
                    placeholderTextColor={darkLight}
                    onChangeText={(text)=> setlastName(text)}
                    onBlur={handleBlur('lastname')}
                    values={values.lastname}
                />

<MyTextInput
                    label="Username"
                    icon="person"
                    placeholder="Johndoe"
                    placeholderTextColor={darkLight}
                    onChangeText={(text)=> setUsername(text)}
                    onBlur={handleBlur('username')}
                    values={values.username}
                />

                <MyTextInput
                    label="Email Address"
                    icon="mail"
                    placeholder="Johndoe.gmail.com"
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

                <MyTextInput
                    label="Password"
                    icon="lock" 
                    placeholder="* * * * * *"
                    placeholderTextColor={darkLight}
                    onChangeText={(text)=> setPassword(text)}
                    onBlur={handleBlur('password')}
                    values={values.password}
                    secureTextEntry={hidePassword}
                    isPassword={true}
                    hidePassword={hidePassword}
                    setHidePassword={setHidePassword}
                />

                <MyTextInput
                    label="Confirm Password"
                    icon="lock"
                    placeholder="* * * * * *"
                    placeholderTextColor={darkLight}
                    // onChangeText={(text)=> setPassword(text)}
                    onBlur={handleBlur('confirmPassword')}
                    values={values.confirmPassword}
                    secureTextEntry={hidePassword}
                    isPassword={true}
                    hidePassword={hidePassword}
                    setHidePassword={setHidePassword}
                />

                <Msgbox>
                    ...
                </Msgbox>

                <StyledButton onPress={onPressSignup}>
                    <ButtonText>
                       Signup
                    </ButtonText>
                </StyledButton>

                <Line/>

                {/* <StyledButton google={true} onPress={handleSubmit}>
                <Fontisto name="google" color={primary} size={25} />
                    <ButtonText google={true}>
                       Sign in with Google
                    </ButtonText>
                </StyledButton> */}

                <ExtraView>
                <ExtraText> Already have an account? </ExtraText>
                <TextLink onPress={()=> navigation.navigate("Login")}>
                    <TextLinkContent>Login</TextLinkContent>
                </TextLink>
                </ExtraView>

               </StyledFormArea>)}
             </Formik>
        </InnerContainer>
     </StyledContainer>
     </ScrollView>
    //  </KeyboardAvoidWrap>
  );
};

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, isDate, showDate, ...props}) => {
return(
    <View>
     <LeftIcon>
        <Octicons name={icon} size={30} color={brand}/>
     </LeftIcon>
     <StyledInputLabel>{label}</StyledInputLabel>
            {!isDate && <StyledTextInput {...props} />}
            {isDate && (
                <TouchableOpacity onPress={showDate}>
                    <StyledTextInput {...props} />
                </TouchableOpacity>
            )}
    {isPassword && (
        <RightIcon onPress={()=> setHidePassword(!hidePassword)}>
         <Ionicons name={hidePassword ? 'eye-off' : 'eye' } size={30} color={darkLight}/>
        </RightIcon>
    )}
    </View>
);
};

export default Signup;