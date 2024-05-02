import styled from 'styled-components/native';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import React from 'react';

const StatusBarheight = Constants.statusBarHeight;
// Container for the dropdown

export const Colors = {
    primary: "#ffffff",
    secondary: "#E5E7EB",
    tertiary: "#1F2937",
    darkLight: "#9CA3AF",
    brand: "#124b46",
    green: "#10B981",
    red: "#EF4444",
};

const {primary,secondary,tertiary,darkLight,brand,green,red} = Colors;

export const StyledContainer = styled.View`
       flex: 1;
       margin-top: 30px;
       background-color: ${primary}; 
`
  // padding-top: ${StatusBarheight +10}px;  padding: 25px;
export const InnerContainer = styled.View`
       flex: 1;
       width: 100%;
       align-items: center;
       background-color: ${primary}; 
`;

export const WelcomeContainer = styled(InnerContainer)`
       padding: 25px;
       padding-top: 10px;
       justify-content: center;
`;

export const PageLogo = styled.Image`
       width: 250px;
       height: 200px
`;

export const Avatar = styled.Image`
      border-radius: 50px;
      height: 100px;
      margin: auto;
      margin-bottom: 10px;
      margin-top: 10px;
      border-width: 2px;
      border-color: ${secondary};
      width: 100px;
`;

export const WelcomeImage = styled.Image`
       height: 50%;
       ${'' /* flex: 20%; */}
       width: 100%;
`;

export const PageTitle = styled.Text`
       font-size: 30px;
       font-weight: bold;
       text-align: center;
       color: ${brand};
       padding: 10px;  

       ${(props)=> props.welcome && `
         font-size: 35px;
       `}
`;



export const SubTitle = styled.Text`
       font-size: 18px;
       font-weight: bold;
       margin-bottom: 20px;
       letter-spacing: 1px;
       color: ${tertiary};

       ${(props)=> props.welcome && `
         margin-bottom: 5px;
         font-weight: normal;
       `}
`;

export const StyledFormArea = styled.View`
      width: 90%; 
`;

export const StyledTextInput = styled.TextInput`
      background-color: ${secondary};
      padding: 15px;
      padding-left: 55px;
      padding-right: 55px;
      border-radius: 5px;
      font-size: 16px;
      height: 60px;
      margin-vertical: 3px;
      margin-bottom: 10px;
      color: ${tertiary};
`;

export const StyledInputLabel = styled.Text`
     text-align: left;
      font-size: 13px;
      color: ${tertiary};
`;

export const LeftIcon = styled.View`
    left: 15px;
    top: 38px;
    position: absolute;
    z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
    right: 15px;
    top: 38px;
    position: absolute;
    z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
   padding: 15px;
   background-color: ${brand};
   justify-content: center;
   align-items: center;
   border-radius: 5px;
   margin-vertical: 5px;
   height: 60px;

   ${(props) => props.google == true && `
      background-color: ${green};
      flex-direction: row;
      justify-content: center;
   `}
`;

export const ButtonText = styled.Text`
    color: ${primary};
    font-size: 16px;

    ${(props) => props.google == true && `
    padding-left: 25px;
   `}
`;

export const Msgbox = styled.Text`
    text-align: center;
    font-size: 13px;
`;

export const Line = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${darkLight};
    margin-vertical: 10px;
`;

export const ExtraView = styled.View`
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 10px;
`;

export const ExtraText = styled.Text`
    justify-content: center;
    align-content: center;
    color: ${tertiary};
    font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
   justify-content: center;
   align-items: center;
`;

export const TextLinkContent = styled.Text`
   color: purple;
   font-size: 15px;
`;
