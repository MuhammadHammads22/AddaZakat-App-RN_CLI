import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import { handleVideoSelect } from '../utils/permissions'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Ant from 'react-native-vector-icons/AntDesign';

const VideoSelectModal = ({visible,index,closeModal,dispatch}) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
          <View backgroundColor={'rgba(50,50,50,.3)'} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ alignItems: 'center', width: responsiveWidth(85), padding: responsiveWidth(2.5), borderRadius: responsiveWidth(5), elevation: responsiveHeight(1), shadowColor: 'gray', shadowOffset: responsiveHeight(1), shadowOpacity: responsiveHeight(1), shadowRadius: responsiveWidth(5), backgroundColor: 'white' }}>
              <Text style={{ marginBottom: responsiveHeight(2), fontSize: responsiveHeight(3), fontWeight: 'bold', marginTop: responsiveHeight(1) }}>Select Video Source</Text>
              <View style={{ flexDirection: 'row', alignSelf: 'flex-end', justifyContent: 'flex-end' }}>
                <TouchableOpacity onPress={() => { handleVideoSelect('gallery',index,closeModal,dispatch) }} style={{ backgroundColor: '#03bafc', padding: responsiveWidth(2.2), margin: responsiveWidth(2), borderRadius: responsiveWidth(3) }}>
                  <Text style={{ fontSize: responsiveHeight(1.5), fontWeight: 'bold', color: '#FFFFFF' }}>Choose From Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { handleVideoSelect('camera',index,closeModal,dispatch) }} style={{ backgroundColor: '#03bafc', padding: responsiveWidth(2.2), margin: responsiveWidth(2), borderRadius: responsiveWidth(3) }}>
                  <Text style={{ fontSize: responsiveHeight(1.5), fontWeight: 'bold', color: '#FFFFFF' }}> 'Record With Camera'</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={{ position: 'absolute', top: responsiveHeight(1), right: responsiveWidth(2) }} onPress={() => { closeModal() }}>
                <Ant name='close' size={responsiveWidth(6)} color='black' />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
  )
}

export default VideoSelectModal