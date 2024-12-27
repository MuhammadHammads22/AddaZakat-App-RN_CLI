import { Image, Text, TouchableOpacity, View } from "react-native"
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Ant from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from "react-redux";
import { setElectricBillUri, setSeekerResidenceVideoUri, setSeekerVideoUri } from "../Slices/CreatePostSlice";
import Feather from 'react-native-vector-icons/Feather';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import React from "react";
const RenderSeekerVideoContainer = ({enable, index,openVideoModal, ref_ ,uri,removeVideo}) => {
   


    return (
      <View ref={ref_}>
        {
          uri ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: responsiveHeight(15),
                margin: responsiveWidth(1),
                borderRadius: responsiveWidth(4),
                width: responsiveWidth(45),
                height: responsiveHeight(18)
              }}
            >
              <Image source={{uri}} style={{
                borderRadius: responsiveWidth(4),
                width: responsiveWidth(45),
                height: responsiveHeight(18),
              }} />
              <TouchableOpacity onPress={removeVideo} style={{ position: 'absolute', top: responsiveHeight(1), right: responsiveWidth(2) }}>
                <Ant name="close" size={responsiveWidth(6)} color="white" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              disabled={enable}
              onPress={() => {
                openVideoModal(index)
              }}
              style={{
                backgroundColor: '#F7F8FA',
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: '#03bafc',
                borderRadius: responsiveWidth(4),
                borderWidth: 2,
                width: responsiveWidth(45),
                height: responsiveHeight(18),
                margin: responsiveWidth(1.5)
              }}
            >
              <Feather name="upload" color="black" size={responsiveWidth(6)} />
              <Text>Upload Video</Text>
            </TouchableOpacity>
          )
        }
      </View>
    );
  }
  export default React.memo(RenderSeekerVideoContainer)
