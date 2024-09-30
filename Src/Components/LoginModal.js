import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

const LoginModal = ({ navigation, isErrorServer, errorServer, setIsErrorServer, setErrorServer }) => {
  return (
    <Modal transparent={true}
      visible={isErrorServer}
      onDismiss={() => {
        setIsErrorServer(false)
        setErrorServer("")
      }}
      onRequestClose={() => {
        setIsErrorServer(false)
        setErrorServer("")
      }}
    >
      <View backgroundColor={'rgba(50,50,50,.3)'} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{  alignItems: 'center', width: responsiveWidth(85), padding: responsiveWidth(2.5), borderRadius: responsiveWidth(5), elevation: responsiveHeight(1), shadowColor: 'gray', shadowOffset: responsiveHeight(1), shadowOpacity: responsiveHeight(1), shadowRadius: responsiveWidth(5), backgroundColor: 'white' }}>
          <Text style={{ fontSize: responsiveHeight(3), fontWeight: 'bold', marginTop: responsiveHeight(1) }}>Alert</Text>
          <Text style={{ alignSelf: 'flex-start', fontSize: responsiveHeight(2), fontWeight: 'medium', margin: responsiveWidth(2), marginTop: responsiveWidth(4) }}>{errorServer}</Text>
          <View style={{ flexDirection: 'row',alignSelf:'flex-end',justifyContent:'flex-end' }}>
            <TouchableOpacity onPress={() => {
              setIsErrorServer(false)
              setErrorServer("")
            }} style={{ backgroundColor: '#03bafc', padding:responsiveWidth(2.2),  margin: responsiveWidth(2), borderRadius: responsiveWidth(3) }}>
              <Text styles={{ fontSize: responsiveHeight(1.5), fontWeight: 'bold', color: '#FFFFFF' }}>Dismiss</Text>
            </TouchableOpacity>
            {
              (errorServer === "Verify email before Loging In.") ?
                <TouchableOpacity onPress={() => {
                  setIsErrorServer(false)
                  setErrorServer("")
                  navigation.navigate('EmailVerification')
                }} style={{ backgroundColor: '#03bafc', margin: responsiveWidth(2), padding:responsiveWidth(2.2), borderRadius: responsiveWidth(3) }}>
                  <Text styles={{ fontSize: responsiveHeight(1.5), fontWeight: 'bold', color: '#FFFFFF' }}>Verify Now</Text>
                </TouchableOpacity>
                : (errorServer === "Wrong Email & Password.") ?
                  <TouchableOpacity onPress={() => {
                    setIsErrorServer(false)
                    setErrorServer("")
                    navigation.navigate('Signup')
                  }} style={{ backgroundColor: '#03bafc',   margin: responsiveWidth(2), padding:responsiveWidth(2.2), borderRadius: responsiveWidth(3) }}>
                    <Text styles={{ fontSize: responsiveHeight(1.5), fontWeight: 'bold', color: '#FFFFFF' }}>SignIn</Text>
                  </TouchableOpacity>
                  : null

            }
          </View>
        </View>


      </View>
    </Modal>

  )
}

export default LoginModal