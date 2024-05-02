// import React, { useState } from 'react';
// import { StatusBar } from 'expo-status-bar';
// import axios from 'axios';
// import { Octicons, Ionicons } from '@expo/vector-icons';
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
// import { Formik } from 'formik';
// import { ScrollView, View } from 'react-native';

// const { brand, darkLight } = Colors;

// const Login = ({ navigation }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [hidePassword, setHidePassword] = useState(true); // State for hiding/showing password

//     const onPressLogin = () => {
//         const loginUrl = "http://localhost:9090/api/auth/login";
//         const method = 'POST';
//         const data = {
//             usernameOrEmail: email,
//             password: password
//         }

//         axios({
//             url: loginUrl,
//             method: method,
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             data: data,
//         })
//         .then((res) => {
//             if (res.status === 200) {
//                 console.log("Login successful");
//                 const token = res.data.accessToken;
//                 localStorage.setItem('token', token); // Store token in local storage
//                 navigation.navigate('Home');
//             } else {
//                 console.log("Login not successful");
//             }
//         })
//         .catch((err) => {
//             console.log("Some error occurred:", err);
//         });
//     }

//     return (
//         <ScrollView style={{ backgroundColor: "white" }}>
//             <StyledContainer>
//                 <StatusBar style='dark' />
//                 <InnerContainer>
//                     <PageLogo resizeMode="cover" source={require('./../assets/healofy.png')} />
//                     <PageTitle>HEALOFY</PageTitle>
//                     <SubTitle>Account Login</SubTitle>

//                     <Formik
//                         initialValues={{ email: '', password: "" }}
//                         onSubmit={(values) => {
//                             console.log(values);
//                             navigation.navigate("Home");
//                         }}
//                     >
//                         {({ handleChange, handleBlur, values }) => (
//                             <StyledFormArea>
//                                 <MyTextInput
//                                     label="Email Address or Username"
//                                     icon="mail"
//                                     placeholder="xyz.gmail.com"
//                                     placeholderTextColor={darkLight}
//                                     onChangeText={(text) => setEmail(text)}
//                                     value={email} // Connect value to state
//                                 />

//                                 <MyTextInput
//                                     label="Password"
//                                     icon="lock"
//                                     placeholder="* * * * * *"
//                                     placeholderTextColor={darkLight}
//                                     onChangeText={(text) => setPassword(text)}
//                                     value={password} // Connect value to state
//                                     secureTextEntry={hidePassword}
//                                     isPassword={true}
//                                     hidePassword={hidePassword}
//                                     setHidePassword={setHidePassword}
//                                 />

//                                 <Msgbox>
//                                     ...
//                                 </Msgbox>

//                                 <StyledButton onPress={onPressLogin}>
//                                     <ButtonText>
//                                         Login
//                                     </ButtonText>
//                                 </StyledButton>

//                                 <Line />

//                                 <ExtraView>
//                                     <ExtraText> Don't have an account? </ExtraText>
//                                     <TextLink onPress={() => navigation.navigate("Signup")}>
//                                         <TextLinkContent>Signup</TextLinkContent>
//                                     </TextLink>
//                                 </ExtraView>
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

// export default Login;


import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Octicons, Ionicons } from '@expo/vector-icons';
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
import { Formik } from 'formik';
import { ScrollView, View } from 'react-native';
import axios from 'axios';
// import { axiosWithAuth } from './../services/axiosWithAuth';

const { brand, darkLight } = Colors;

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true); // State for hiding/showing password

    const onPressLogin = async () => {
        const loginUrl = 'http://localhost:9090/api/auth/login';
        const method = 'POST';
        const data = {
            usernameOrEmail: email,
            password: password,
        };

        try {
            const res = await axios({
                url: loginUrl,
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: data,
            });

            if (res.status === 200) {
                console.log('Login successful');
                const token = res.data.accessToken;
                localStorage.setItem('token', token); // Store token in local storage

                // Store the username in local storage
                localStorage.setItem('username', email);

                navigation.navigate('Home');
            } else {
                console.log('Login not successful');
            }
        } catch (err) {
            console.log('Some error occurred:', err);
        }
    };

    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>
                    <PageLogo resizeMode="cover" source={require('./../assets/healofy.png')} />
                    <PageTitle>HEALOFY</PageTitle>
                    <SubTitle>Account Login</SubTitle>

                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={(values) => {
                            console.log(values);
                            navigation.navigate('Home');
                        }}
                    >
                        {({ handleChange, handleBlur, values }) => (
                            <StyledFormArea>
                                <MyTextInput
                                    label="Username"
                                    icon="mail"
                                    placeholder="xyz@gmail.com"
                                    placeholderTextColor={darkLight}
                                    onChangeText={(text) => setEmail(text)}
                                    value={email}
                                />

                                <MyTextInput
                                    label="Password"
                                    icon="lock"
                                    placeholder="* * * * * *"
                                    placeholderTextColor={darkLight}
                                    onChangeText={(text) => setPassword(text)}
                                    value={password}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                />

                                <Msgbox>...</Msgbox>

                                <StyledButton onPress={onPressLogin}>
                                    <ButtonText>Login</ButtonText>
                                </StyledButton>

                                <Line />

                                <ExtraView>
                                    <ExtraText>Don't have an account?</ExtraText>
                                    <TextLink onPress={() => navigation.navigate('Signup')}>
                                        <TextLinkContent>Signup</TextLinkContent>
                                    </TextLink>
                                </ExtraView>
                            </StyledFormArea>
                        )}
                    </Formik>
                </InnerContainer>
            </StyledContainer>
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

export default Login;
