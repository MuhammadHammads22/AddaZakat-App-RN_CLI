import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CommonActions } from '@react-navigation/native'
import { removeUserData } from '../store/localStore'
import { setUserInfoToInitialState } from '../Slices/UserSlice'

async function Logout(navigation,dispatch){
  try{
  await removeUserData()
  dispatch(setUserInfoToInitialState())
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    })
  );
  
}catch(error){
    console.log(error,"error logging out")
}
  }


const Profile = ({navigation}) => {

  const dispatch= useDispatch()

  const settings=[{name:'update profile',subSettings:[]},{name:'update user',subSettings:[]},{name:'logout',subSettings:[]}]
  
  const handleClick=(action)=>{
    switch(action){
      case 'update profile':
        break;
      case 'update user':
        break
      case 'logout':
        Logout(navigation,dispatch)
        break;
      default:
        break;
    }
  }
  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView style={{flex:1,marginTop:responsiveHeight(1)}}>
      {
        settings.map((item,index)=>(
          <TouchableOpacity key={index} onPress={()=>handleClick(item.name)}>
          <View  style={{alignItems:'center',margin:responsiveWidth(1),padding:responsiveHeight(2),borderBottomColor:'gray',borderBottomWidth:responsiveWidth(.5)}}>
            <Text style={{textAlign:'center',color:'black',fontSize:responsiveWidth(4)}}>{item.name}</Text>
          </View>
          </TouchableOpacity>
        ))
      }
      </ScrollView>
     {/* onPress={()=>{Logout(navigation,dispatch)}}  */}
               
            
    </SafeAreaView>
  )
}

export default Profile