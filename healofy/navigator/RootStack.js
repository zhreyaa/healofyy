import React, { Profiler } from 'react'
import { Colors } from '../components/styles';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Welcome from './../screens/Welcome';
import Homescreen from '../screens/Homescreen';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Notifications  from '../screens/Notifications';
import Forumscreen from '../screens/Forumscreen';
import Profile from '../screens/Profile';
import Chat from '../components/Chat';
import Quizscreen from '../screens/Quizscreen';
import Editprofile from '../screens/Viewprofile';
import Createscreen from '../screens/Createscreen';
import Appointment from '../screens/Appointment';
import Viewappointments from '../screens/Viewappointments';
import ChatListScreen from '../components/ChatList';
import ChatScreen from '../components/Chat';
import ViewProfile from '../screens/Viewprofile';
import QandA from '../screens/QandA';
import Askquestion from '../screens/Askquestion';

const Tab = createBottomTabNavigator();
function BottomTabs(){
  return (
    <Tab.Navigator>

      <Tab.Screen 
      name='Home' 
      component={Homescreen}
        options={{
          toBarLabel: 'Home',
          tabBarLabelStyle: {color: "#124b46"},
          headerShown: false,
          tabBarIcon: ({focused}) =>
          focused ? (
            <Entypo name="home" size={24} color={"#124b46"}/>
          ):(
            <AntDesign name="home" size={24} color="#124b46" />
          ),
        }}
      />

 <Tab.Screen 
      name="Forum" 
      component={Forumscreen}
        options={{
          tabBarLabel: "Forum",
          tabBarLabelStyle: {color: "#124b46"},
          headerShown: false,
          tabBarIcon: ({focused}) =>
          focused ? (
            <MaterialCommunityIcons name="forum" size={24} color="#124b46" />
          ):(
            <MaterialCommunityIcons name="forum-outline" size={24} color="#124b46" />
          ),
        }}
      />

<Tab.Screen 
      name="Quiz"
      component={Quizscreen}
        options={{
          tabBarLabel: "Quiz",
          tabBarLabelStyle: {color: "#124b46"},
          headerShown: false,
          tabBarIcon: ({focused}) =>
          focused ? (
            <MaterialIcons name="quiz" size={24} color="#124b46" />
                      ):(
            <MaterialIcons name="quiz" size={24} color="#124b46" />     
                 ),
        }}
      />

<Tab.Screen 
      name="QandA"
      component={QandA}
        options={{
          tabBarLabel: "Q&A",
          tabBarLabelStyle: {color: "#124b46"},
          headerShown: false,
          tabBarIcon: ({focused}) =>
          focused ? (
            <MaterialIcons name="psychology" size={24} color="#124b46" />
                      ):(
            <MaterialIcons name="psychology" size={24} color="#124b46" />     
                 ),
        }}
      />     

<Tab.Screen 
      name="Profile" 
      component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarLabelStyle: {color: "#124b46"},
          headerShown: false,
          tabBarIcon: ({focused}) =>
          focused ? (
            <MaterialCommunityIcons name="account" size={24} color="#124b46" />
          ):(
            <MaterialCommunityIcons name="account-outline" size={24} color="#124b46" />
          ),
        }}
      />

<Tab.Screen 
      name="Chatlist"
      component={ChatListScreen}
        options={{
          tabBarLabel: "Chat",
          tabBarLabelStyle: {color: "#124b46"},
          headerShown: false,
          tabBarIcon: ({focused}) =>
          focused ? (
            <Ionicons name="chatbox" size={24} color="#124b46" />   
             ):(
              <Ionicons name="chatbox-outline" size={24} color="#124b46" />
          ),
        }}
      />

    </Tab.Navigator>
  )
}

const Stack = createNativeStackNavigator();
const {primary, tertiary} = Colors;
const RootStack = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
            headerStyle:{
                backgroundColor: 'transparent'
            },
            headerTintColor: tertiary,
            headerTransparent: true,
            headerTitle: '',
            headerLeftContainerStyle: {
                paddingLeft: 20
            }
        }}
        initialRouteName='QandA'
        >
           <Stack.Screen name="Login" component={Login} />
           <Stack.Screen name="Signup" component={Signup} />
           <Stack.Screen options={{headerTintColor: primary}} name="Welcome" component={Welcome} />
           <Stack.Screen name="Home" component={BottomTabs} />
           <Stack.Screen name="Chat" component={ChatScreen} />
           <Stack.Screen name="Chatlist" component={ChatListScreen} />
           <Stack.Screen name="Viewprofile" component={ViewProfile} />
           <Stack.Screen name="Forumscreen" component={Forumscreen} />
           <Stack.Screen name="Createscreen" component={Createscreen} />
           {/* <Stack.Screen name="Notifications" component={Notifications} /> */}
           <Stack.Screen name="Appointment" component={Appointment} />
           <Stack.Screen name="Quizscreen" component={Quizscreen} />
           <Stack.Screen name="Profile" component={Profile} />
           <Stack.Screen name="QandA" component={QandA} />
           <Stack.Screen name="Question" component={Askquestion} />
           <Stack.Screen name="Viewappointments" component={Viewappointments} />
          </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootStack
