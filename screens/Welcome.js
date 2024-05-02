import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native';
import {
    InnerContainer,
    PageTitle,
    StyledFormArea,
    SubTitle,
    ButtonText,
    StyledButton,
    Line,
    WelcomeContainer,
    WelcomeImage,
    Avatar
} from './../components/styles';

const Welcome = ({navigation}) => {
  return (
     <>
     <StatusBar style='light'/>
        <InnerContainer>
            <WelcomeImage resizeMode="cover" source={require('./../assets/doc.png')} />
             <WelcomeContainer>
             <PageTitle welcome={true}>Welcome to the journey of self help!</PageTitle>
             <SubTitle welcome={true}>HEALOFY</SubTitle>
                <StyledFormArea>
                <Avatar
                 resizeMode="cover" source={require('./../assets/healofy.png')} 
                />
                <Line/>

                <StyledButton onPress={()=> navigation.navigate("Login")}>
                    <ButtonText>
                       Logout
                    </ButtonText>
                </StyledButton>

               </StyledFormArea>
             </WelcomeContainer>
        </InnerContainer>
     </>
  );
};


export default Welcome;
