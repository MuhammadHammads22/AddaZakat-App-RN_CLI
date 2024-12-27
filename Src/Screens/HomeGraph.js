import { Platform, Image, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Home from './Home';
import Saved from './Saved';
import Profile from './Profile';
// import Satisfied from './Satisfied';
import Entypo from 'react-native-vector-icons/Entypo';
import IonIcons from 'react-native-vector-icons/Ionicons';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';



// const Tab = createMaterialBottomTabNavigator();


const Tab = createBottomTabNavigator();
// color:"#03bafc",fontSize:responsiveWidth(5),fontWeight:'bold'
const HomeGraph = ({navigation}) => {
  return (
    <Tab.Navigator initialRouteName='Home'screenOptions={{
      // headerTitleAlign:'center',
      headerStyle:{
        backgroundColor:'white',
        height:responsiveHeight(9),
        borderBottomColor:'gray',
        borderBottomWidth:1
      },
      headerTitle:(props)=>{
       return( <Text style={{color:"#03bafc",fontSize:responsiveWidth(6),fontWeight:'bold'}}>AddaZakat</Text>)
      },
      tabBarShowLabel:false,
      tabBarStyle: {
        paddingTop:responsiveHeight(.5),
      width: responsiveWidth(100),
      backgroundColor: 'white',
      height:
        Platform.OS === 'ios' ? responsiveHeight(13) : responsiveHeight(9),
      elevation: 4,
      bottom: Platform.OS === 'ios' ? responsiveHeight(-2) : 0,
    }}}
    >
      <Tab.Screen options={{ 
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor:'gray',
            tabBarShowLabel:false,
            tabBarStyle:{
              paddingTop:responsiveHeight(.5),
            },
            tabBarIcon: ({focused}) => (
              <IonIcons name={focused?'home':'home-outline'} color={focused ? '#03bafc' : 'gray'} size={responsiveWidth(7)} />
            )}}
            name="Home"
            component={Home}  />
      <Tab.Screen options={{
              tabBarStyle:{
              paddingTop:responsiveHeight(.5),
            },
            // headerTitle:'Saved',
            tabBarActiveTintColor: 'gray',
            tabBarIcon: ({focused}) => (
              <Entypo name={focused?'heart':'heart-outlined'} color={focused ? '#03bafc' : 'gray'} size={responsiveWidth(7)} />            
            )}}
            name="Saved"
            component={Saved} />
      <Tab.Screen options={{
          tabBarStyle:{
            paddingTop:responsiveHeight(.5),
          },
            // headerTitle:'Settings',
            tabBarShowLabel:false,
            tabBarActiveTintColor: 'black',
            tabBarIcon: ({focused}) => (
              <IonIcons name={focused?'settings':'settings-outline'} color={focused ? '#03bafc' : 'gray'} size={responsiveWidth(7)}/>
            )}}  name="Setting" component={Profile} />
    </Tab.Navigator>
  )
}

export default HomeGraph