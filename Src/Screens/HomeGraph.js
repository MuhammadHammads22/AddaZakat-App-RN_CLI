import { Platform, Image, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Home from './Home';
import Saved from './Saved';
import Profile from './Profile';
import Satisfied from './Satisfied';
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
        backgroundColor:'#03bafc'
      },
      headerTitle:(props)=>{
       return( <Text style={{color:"white",fontSize:responsiveWidth(6),fontWeight:'bold'}}>AddaZakat</Text>)
      },
      tabBarStyle: {
      // borderTopLeftRadius: responsiveHeight(6),
      // borderTopRightRadius: responsiveHeight(6),
      width: responsiveWidth(100),
      backgroundColor: 'white',
      height:
        Platform.OS === 'ios' ? responsiveHeight(13) : responsiveHeight(8),
      elevation: 4,
      bottom: Platform.OS === 'ios' ? responsiveHeight(-2) : 0,
    }}}
    >
      <Tab.Screen options={{
            // gestureEnabled:true,
            // animationTypeForReplace:'pop',
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor:'gray',
            tabBarIcon: ({focused}) => (
              <IonIcons name={focused?'home':'home-outline'} color={focused ? '#03bafc' : 'gray'} size={responsiveWidth(7)} />
            )}}
            name="Home"
            component={Home}  />
      {/* <Tab.Screen options={{
            // gestureEnabled:true,
            // animationTypeForReplace:'pop',
            headerTitle:'Satisfied',
            tabBarActiveTintColor: 'white',
            tabBarIcon: ({focused}) => (
              <Image
                source={require('C:\\Users\\hammad\\Desktop\\ReactNative\\practice\\adazakat\\Src\\Assets\\group.png')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? 'white' : 'gray',
                }}
              />
            )}} name="Satisfied" component={Satisfied} /> */}
      <Tab.Screen options={{
            // gestureEnabled:true,
            // animationTypeForReplace:'pop',
            headerTitle:'Saved',
            tabBarActiveTintColor: 'gray',
            tabBarIcon: ({focused}) => (
              <Entypo name={focused?'heart':'heart-outlined'} color={focused ? '#03bafc' : 'gray'} size={responsiveWidth(7)} />            
            )}}
            name="Saved"
            component={Saved} />
      <Tab.Screen options={{
            // gestureEnabled:true,
            // animationTypeForReplace:'pop',
            headerTitle:'Settings',
            tabBarActiveTintColor: 'black',
            tabBarIcon: ({focused}) => (
              <IonIcons name={focused?'settings':'settings-outline'} color={focused ? '#03bafc' : 'gray'} size={responsiveWidth(7)}/>
            )}}  name="Setting" component={Profile} />
    </Tab.Navigator>
  )
}

export default HomeGraph