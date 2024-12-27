import { Alert, PermissionsAndroid } from "react-native";
import { setElectricBillUri, setSeekerResidenceVideoUri, setSeekerVideoUri } from "../Slices/CreatePostSlice";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import React from "react";

export const checkAndRequestCameraPermission = async () => {
  try {
    const currentStatus = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );
    if (currentStatus) {
      console.log("permission: "+currentStatus); // Permission already granted
    } else {
      console.log(currentStatus); // Permission already granted
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};


export const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        // {
        //   title: 'Cool Photo App Camera Permission',
        //   message:
        //     'Allow Addazakat app to take pictures and record video',
        //   buttonNeutral: 'Ask Me Later',
        //   buttonNegative: 'Cancel',
        //   buttonPositive: 'OK',
        // },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true
      } else {
        return false
      }
    } catch (err) {
      console.warn(err);
    }
  };


  const videoOptions = {
    mediaType: 'video',
    videoQuality: 'high',
  };
  const imageOptions = {
    mediaType: 'photo',
    quality: 1,
    includeBase64: false,
    saveToPhotos: true,
  };

export  const handleVideoSelect = async (source,selectedIndex,setShowModal,dispatch) => {
  // const pickerMethod = source === 'camera' ? launchCamera : launchImageLibrary;
  if (source == 'camera') {
    setShowModal();  {/*closemodal*/}
    const value = await requestCameraPermission()
    if (value) {
      console.log("granted")
      launchCamera(videoOptions, (response) => {
        if (response.didCancel || response.errorCode) return;

        const uri = response.assets[0]?.uri; 
        if (uri) {
          console.log('uri:'+uri)
          selectedIndex == 0 ? dispatch(setSeekerVideoUri(uri)) : dispatch(setSeekerResidenceVideoUri(uri))
        }
      })
    } else {
      console.log('denied')
      Alert.alert('', 'Camera access denied goto app settings to give access.')
      // setShowModal(true);
    }

  } else {
    launchImageLibrary( videoOptions, (response) => {
      setShowModal(); // Close modal after selection
      if (response.didCancel || response.errorCode) return;

      const uri = response.assets[0]?.uri;
      if (uri) {
        selectedIndex == 0 ? dispatch(setSeekerVideoUri(uri)) : dispatch(setSeekerResidenceVideoUri(uri))
      }
    })
  }

};

export const handleBillSelect =  async (source,setShowModal,dispatch) => {
  // const pickerMethod = source === 'camera' ? launchCamera : launchImageLibrary;
  if (source == 'camera') {
    setShowModal();
    const value = await requestCameraPermission()
    if (value) {
      console.log("granted")
      launchCamera(imageOptions , (response) => {
        if (response.didCancel || response.errorCode) return;

        const uri = response.assets[0]?.uri;
        uri&&dispatch(setElectricBillUri(uri)) 
      })
    } else {
      console.log('denied')
      Alert.alert('', 'Camera access denied goto app settings to give access.')
      // setShowModal(true);
    }

  } else {
    setShowModal(); // Close modal after selection
    launchImageLibrary( imageOptions , (response) => {
      if (response.didCancel || response.errorCode) return;

      const uri = response.assets[0]?.uri;
      uri&&dispatch(setElectricBillUri(uri)) 

    })
  }

};