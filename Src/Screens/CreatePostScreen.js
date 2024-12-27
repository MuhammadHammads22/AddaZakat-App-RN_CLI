import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { View, Text, KeyboardAvoidingView, ScrollView, TextInput, StatusBar, Modal, ActivityIndicator, TouchableOpacity, Button, StyleSheet, Image, FlatList, SafeAreaView, Alert, ToastAndroid } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useCreatePostMutation } from '../Api/Posts'
import { useDispatch, useSelector } from 'react-redux'
import { setAccountNumber, setAccountTitle, setErrorPhoneNumber, setIsErrorPhoneNumber, setAddress, setAmountNeeded, setBankName, setDescription, setElectricBillUri, setElectricBillUrl, setErrorDescription, setErrorSeeker, setIsErrorDescription, setIsErrorSeeker, setPhoneNumber, setPurpose, setSeeker, setSeekerName, setSeekerResidenceVideo, setSeekerResidenceVideoUri, setSeekerResidenceVideoUrl, setSeekerVideo, setSeekerVideoUri, setSeekerVideoUrl, setTypeOfDonation, setErrorAddress, setIsErrorAddress, setIsErrorAccountTitle, setErrorAccountTitle, setErrorBankName, setIsErrorBankName, setIsErrorAccountNumber, setErrorAccountNumber, setIsErrorAmountNeeded, setErrorAmountNeeded, setIsErrorTypeOfDonation, setErrorTypeOfDonation, setIsErrorPurpose, setErrorPurpose, setToInitial, setIsErrorSeekerResidenceVideoUri } from '../Slices/CreatePostSlice'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import LinearGradient from 'react-native-linear-gradient'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Video from 'react-native-video'
import Ant from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import DropDownMenu from '../Components/DropDownPicker';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { requestCameraPermission } from '../utils/permissions';
import  RenderSeekerVideoContainer  from '../Components/RenderSeekerVideoContainer';
import VideoSelectModal from '../Components/VideoSelectModal';
import {BillSelectModal} from '../Components/BillSelectModal';
import { RenderElectricBillContainer } from '../Components/RenderElectriBillContainer';
import { validateAccountNumber, validateAccountTitle, validateAddress, validateAmountNeeded, validateBankName, validateDescription, validateDonationPurpose, validateDonationType, validateName, validatePakistaniPhoneNumber } from '../utils/createPostValidation';





function CreatePostScreen() {
  const [createPost, { error, isLoading }] = useCreatePostMutation()
  const dispatch = useDispatch()
  const state = useSelector(state => state.createPost.post)
  const userState = useSelector((state) => state.userInfo.userInfo)


console.log(state.seekerResidenceVideoUri,state.seekerVideoUri)

  const token = userState.accessToken
  //   console.log(userState)
  const navigation = useNavigation()
  const [isErrorServer, setIsErrorServer] = useState(false)
  const [errorServer, setErrorServer] = useState("")
  // const [videoUris, setVideoUris] = useState([null, null]); // Array to store URIs for two videos
  const [showBillSelectModal, setShowBillSelectModal] = useState(false);
  const [showVideoSelectModal, setShowVideoSelectModal] = useState(false);
  const [openDonationType, setOpenDonationType] = useState(false);
  const [valueDonationPurpose, setValueDonationPurpose] = useState(null);
  const [itemsDonationPurpose, setItemsDonationPurpose] = useState([
    { label: 'Asking for Family', value: 'family' },
    { label: 'Asking for Madarsa', value: 'madarsa' },
    { label: 'Asking for Masjid', value: 'masjid' },
    { label: 'Asking for NGO', value: 'ngo' },
    { label: 'Asking for Myself', value: 'myself' }
  ]);
  const [valueDonationType, setValueDonationType] = useState(null);
  const [itemsDonationType, setItemsDonationType] = useState([
    { label: 'Zakat', value: 'zakat' },
    { label: 'Donation', value: 'donation' },
    { label: 'Help', value: 'help' }
  ]);
  const [openDonationPurpose, setOpenDonationPurpose] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const buttonDisabled=state.isErrorDescription||state.isErrorAddress||state.isErrorPhoneNumber||state.isErrorAccountTitle||state.isErrorBankName||state.isErrorDonationPurpose||state.isErrorAccountNumber||state.isErrorTypeOfDonation||!state.description||!state.seeker||!state.phoneNumber||!state.address||!state.accountTitle||!state.bankName||!state.accountNumber||!state.amountNeeded||!state.seekerResidenceVideoUrl||!state.seekerVideoUrl||!state.electricBillUrl
const [selectedIndex, setSelectedIndex] = useState(null);
  const [text, setText] = useState('');




  const seekerVideoRef = useRef(null)
  const seekerBillRef = useRef(null)
  const seekerResidenceVideoRef = useRef(null)
  const seekerDescriptionRef = useRef(null)
  const seekerNameRef = useRef(null)
  const seekerPhoneNumberRef = useRef(null)
  const seekerAddressRef = useRef(null)
  const seekerBankTitleRef = useRef(null)
  const seekerBankNameRef = useRef(null)
  const seekerAccountNumberRef = useRef(null)
  const seekerAmountNeededRef = useRef(null)
  const seekerDonationTypeRef = useRef(null)
  const seekerPurposeRef = useRef(null)

  const showToastWithGravity = (content) => {
    ToastAndroid.showWithGravity(
      content,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };


  const focusNextField = (nextFieldRef) => {
    if (nextFieldRef.current) {
      nextFieldRef.current.focus();
    }
  };

  // const handleSeekerVideoSubmit = () => {
  //   seekerResidenceVideoRef.current.focus()
  // }
  // const handleSeekerBillSubmit = () => {
  //   seekerDescriptionRef.current.focus()
  // }
  // const handleSeekerResidenceVideoSubmit = () => {
  //   seekerBillRef.current.focus()
  // }
  const handleSeekerDescriptionSubmit = () => {
    const {valid,error} = validateDescription(state.description)
    // console.log(valid, error)
    if(valid){ 
      seekerNameRef.current.focus()
      // dispatch(setErrorDescription(error))
      dispatch(setIsErrorDescription(false))
    }
    else{
      dispatch(setErrorDescription(error))
      dispatch(setIsErrorDescription(true))
    }    
  }
  const handleSeekerNameSubmit = () => {
    const {valid,error} = validateName(state.seeker)
    console.log(valid, error)
    if(valid){ 
      seekerPhoneNumberRef.current.focus()
      // dispatch(setErrorDescription(error))
      dispatch(setIsErrorSeeker(false))
    }
    else{
      dispatch(setErrorSeeker(error))
      dispatch(setIsErrorSeeker(true))
    }
  }
  const handleSeekerPhoneNumberSubmit = () => {
    const {valid,error} = validatePakistaniPhoneNumber(state.phoneNumber)
    if(valid){ 
      seekerAddressRef.current.focus()
      // dispatch(setErrorDescription(error))
      dispatch(setIsErrorPhoneNumber(false))
    }
    else{
      dispatch(setErrorPhoneNumber(error))
      dispatch(setIsErrorPhoneNumber(true))
    }  
    seekerAddressRef.current.focus()
  }

  const handleSeekerAddressSubmit = () => {
    const {valid,error} = validateAddress(state.address)
    if(valid){ 
      seekerBankTitleRef.current.focus()
      // dispatch(setErrorDescription(error))
      dispatch(setIsErrorAddress(false))
    }
    else{
      dispatch(setErrorAddress(error))
      dispatch(setIsErrorAddress(true))
    }
  }
  const handleSeekerBankTitleSubmit = () => {
    const {valid,error} = validateAccountTitle(state.accountTitle)
    if(valid){ 
      seekerBankNameRef.current.focus()
      // dispatch(setErrorDescription(error))
      dispatch(setIsErrorAccountTitle(false))
    }
    else{
      dispatch(setErrorAccountTitle(error))
      dispatch(setIsErrorAccountTitle(true))
    }
  }
  const handleSeekerBankNameSubmit = () => {
    const {valid,error} = validateBankName(state.bankName)
    if(valid){ 
      seekerAccountNumberRef.current.focus()
      // dispatch(setErrorDescription(error))
      dispatch(setIsErrorBankName(false))
    }
    else{
      dispatch(setErrorBankName(error))
      dispatch(setIsErrorBankName(true))
    }
  }
  const handleSeekerAccountNumberSubmit = () => {
    const {valid,error} = validateAccountNumber(state.accountNumber)
    // console.log(valid, error)
    if(valid){ 
      seekerAmountNeededRef.current.focus()
      // dispatch(setErrorDescription(error))
      dispatch(setIsErrorAccountNumber(false))
    }
    else{
      dispatch(setErrorAccountNumber(error))
      dispatch(setIsErrorAccountNumber(true))
    }
  }
  const handleSeekerAmountNeededSubmit = () => {
    const {valid,error} = validateAmountNeeded(state.amountNeeded)
    // console.log(valid, error)
    if(valid){ 
      seekerDonationTypeRef.current.focus()
      // dispatch(setErrorDescription(error))
      dispatch(setIsErrorAmountNeeded(false))
    }
    else{
      dispatch(setErrorAmountNeeded(error))
      dispatch(setIsErrorAmountNeeded(true))
    }
  }
  const handleSeekerDonationTypeSubmit = () => {
    const {valid,error} = validateDonationType(valueDonationType)
    // console.log(valid, error)
    if(valid){ 
      seekerPurposeRef.current.focus()
      // dispatch(setErrorDescription(error))
      dispatch(setIsErrorTypeOfDonation(false))
    }
    else{
      dispatch(setErrorTypeOfDonation(error))
      dispatch(setIsErrorTypeOfDonation(true))
    }
  }

  const handleSeekerDonationPurposeSubmit = () => {
    const {valid,error} = validateDonationPurpose(valueDonationPurpose)
    // console.log(valid, error)
    if(valid){ 
      seekerPurposeRef.current.focus()
      // dispatch(setErrorDescription(error))
      dispatch(setIsErrorPurpose(false))
    }
    else{
      dispatch(setErrorPurpose(error))
      dispatch(setIsErrorPurpose(true))
    }
  }




  async function createPostFun() {
    await !valueDonationPurpose&&(()=>{
      dispatch(setIsErrorPurpose(true))
      dispatch(setErrorPurpose('Purpose cannot be empty.'))
    })()
   await !valueDonationType&&(()=>{
      dispatch(setIsErrorTypeOfDonation(true))
      dispatch(setErrorTypeOfDonation('Type of Donation cannot be empty.'))
    }
    )()
    !buttonDisabled&&
    createPost({
      data:{
        seeker: state.seeker,
        creator: userState.userName,
        phone_number: state.phoneNumber,
        address: state.address,
        description: state.description,
        need: valueDonationType,
        needed_money: state.amountNeeded || 0,
        post_type:valueDonationPurpose,
        verified: 0,

        seeker_video:state.seekerVideoUrl,
        place_video:state.seekerResidenceVideoUrl,
        // electric_bill:state.electricBillUrl,
        electric_bill:state.electricBillUrl,


        bank_name: state.bankName,
        bank_title: state.accountTitle,
        account_number: state.accountNumber}
        // { "account_number": "4245643423", "address": "Mosamyat", "bank_name": "ezan", "bank_title": "Junaid", "creator": "demouser", "description": "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhj", "electric_bill": "https://addazakat-storage.s3.us-west-2.amazonaws", "need": "donation", "needed_money": "60000", "phone_number": "04050506955", "place_video": "https://addazakat-storage.s3.us-west-2.amazonaws.com/posts/demouser/videos/place/c4aaf05063994589922cebc0e99956c6_video.mp4", "post_type": "donation", "seeker": "Junaid", "seeker_video": "https://addazakat-storage.s3.us-west-2.amazonaws.com/posts/demouser/videos/place/e851f087104249bf8863b7bc18d881ac_video.mp4", "verified": 0 }

      , token: token
    }).then(data => {
      console.log(data)
      if (data.data) {
        showToastWithGravity('Post Created Successfully!')
        // dispatch(setToInitial())
        navigation.goBack()
      }
      else {
        console.log(data)
      }
    })
  }

  const handleSeekerPurposeSubmit = () => {
    createPostFun()
  }





  useEffect(() => {
    // console.log(state)
    if (state.seekerVideoUri && !state.seekerVideoUrl && !isUploadingVideo){
      setIsUploadingVideo(true)
      uploadVideo(state.seekerVideoUri, 0)
    }
      else if (state.seekerResidenceVideoUri && !state.seekerResidenceVideoUrl && !isUploadingVideo)
    {
      setIsUploadingVideo(true)
      uploadVideo(state.seekerResidenceVideoUri, 1)
    }
    else if(state.electricBillUri && !state.electricBillUrl && !isUploadingVideo){
      console.log('bill uploading')
      setIsUploadingVideo(true)
      uploadBill(state.electricBillUri)
    }
  }
    , [state.seekerVideoUri, state.seekerResidenceVideoUri,state.electricBillUri])
  
  
  
    const openVideoModal = (index) => {
    setSelectedIndex(index);
    setShowVideoSelectModal(true);
  };



  // useFocusEffect(React.useCallback(()=>{

  //   return ()=>{
  //     console.log("to initial")
  //     dispatch(setToInitial())
  //   }
  // },[]))









  const uploadBill=async(file)=>{
  
    if (file) {
      // console.log(file)
      const formData = new FormData();
      formData.append('file', {
        uri: file,
        name: file.fileName || 'image.jpg', // Default name if none provided
        type: file.type || 'image/jpeg'
      });
      // if video upload success
      if (file.fileSize > 500 * 1024 * 1024) {
        Alert.alert('failure', 'file size exceed')
        // setSeekerVideoMessage('File size exceeds the 100MB limit.\nOr it should be less than 2 minutes.');
        return;
      }
      else {
        // setUploadingVideo(true)
        try {
          const response = await axios.post('https://api.addazakat.com/post/upload-post-docs/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`,
            },
          });
          console.log(response)
          // Check if the response status is OK
          if (response.status == 200) {
            console.log("bill"+response.data.url)
            setIsUploadingVideo(false)
            // setUploadingVideo(false)
              dispatch(setElectricBillUrl(response.data.url));
              // handleSeekerBillSubmit()
          }
          else {
            setIsUploadingVideo(false)
            console.log(response)
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } catch (error) {
          setIsUploadingVideo(false)
          console.log( error);
        }
      }
  }
}

  const uploadVideo = async (file, i) => {
    if (file ) {
      console.log("start",file)
      const formData = new FormData();
      formData.append('file', {
        uri: file,
        name: file.fileName || 'video.mp4', // Default name if none provided
        type: file.type || 'video/mp4'
      });
      // if video upload success
      if (file.fileSize > 500 * 1024 * 1024) {
        Alert.alert('failure', 'file size exceed')
        // setSeekerVideoMessage('File size exceeds the 100MB limit.\nOr it should be less than 2 minutes.');
        return;
      }
      else {
        // setUploadingVideo(true)
        try {
          const response = await axios.post('https://api.addazakat.com/post/upload-place-videos/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`,
            },
          });
          setIsUploadingVideo(false)
          // Check if the response status is OK
          if (response.status == 200) {
            console.log("video"+i+"  :" ,response.data.url)
            if (i == 0) {
              dispatch(setSeekerVideoUrl(response.data.url));
              // handleSeekerVideoSubmit()
            }
            else {
              dispatch(setSeekerResidenceVideoUrl(response.data.url));
              // handleSeekerResidenceVideoSubmit();
            }

          }
          else {
            setIsUploadingVideo(false)
            console.log(response)
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } catch (error) {
          setIsUploadingVideo(false)
          // dispatch(setIsErrorSeekerResidenceVideoUrl)
          console.error("Error uploading videos:", error);
        }
      }
    }
  };




  const renderContent = () => {

    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        {/* header */}
        <View style={{ flexDirection: 'row', width: responsiveWidth(100), height: responsiveHeight(8), backgroundColor: '#E4E6EB', paddingHorizontal: responsiveWidth(1), alignItems: 'center' }}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Ant name='close' size={responsiveWidth(6)} color='black' style={{ marginHorizontal: responsiveWidth(2) }} />
          </TouchableOpacity>
        </View>
        {/* body */}
        <View style={{ margin: responsiveWidth(3), marginBottom: openDonationPurpose ? responsiveHeight(20) : responsiveHeight(10) }}>
          {/* upload video section */}
          <Text style={{ color: 'black', fontSize: responsiveWidth(8), fontWeight: 'bold' }}>Video Selection</Text>
          <View style={{ flexDirection: 'row', marginBottom: responsiveWidth(2), borderColor: '#', borderWidth: responsiveWidth(0), borderRadius: responsiveWidth(4), padding: responsiveWidth(1), alignItems: 'center', justifyContent: 'center' }}>
            <RenderSeekerVideoContainer enable={isUploadingVideo} index={0} openVideoModal={openVideoModal} uri={state.seekerVideoUri} ref_={seekerVideoRef}  
            removeVideo={()=>{
              dispatch(setSeekerVideoUri(""))
              dispatch(setSeekerVideoUrl(''))
               } } />
            <RenderSeekerVideoContainer enable={isUploadingVideo} index={1} openVideoModal={openVideoModal} uri={state.seekerResidenceVideoUri} ref_={seekerResidenceVideoRef}  removeVideo={()=>{dispatch(setSeekerResidenceVideoUri(""))
              dispatch(setSeekerResidenceVideoUrl(''))
            } } />
          </View>
          {/* electric bill submit */}
          <Text style={{ color: 'black', fontSize: responsiveWidth(8), fontWeight: 'bold' }}>Electric Bill</Text>
          <View style={{ marginBottom: responsiveWidth(2), borderColor: '#', borderWidth: responsiveWidth(0), borderRadius: responsiveWidth(4), padding: responsiveWidth(1), alignItems: 'flex-start', justifyContent: 'center' }}>
            <RenderElectricBillContainer enable={isUploadingVideo}  openBillModal={()=>{setShowBillSelectModal(true)}} uri={state.electricBillUri} removeVideo={()=>{dispatch(setElectricBillUri(""))
              dispatch(setElectricBillUrl(''))
            } } ref_={seekerBillRef} />
            {/* <RenderVideoContainer uri={state.seekerResidenceVideoUri} index={1} ref_={seekerResidenceVideoRef} /> */}
          </View>

          {/* description */}
          <View>
            <Text style={{ color: 'black', fontSize: responsiveWidth(8), fontWeight: 'bold' }}>Description</Text>
            <ScrollView style={{ marginTop: responsiveHeight(1), borderColor: state.isErrorDescription?'red':'#03bafc', borderWidth: 2, borderRadius: responsiveWidth(4), height: responsiveHeight(25) }}>
              <TextInput blurOnSubmit={true} onSubmitEditing={()=>{handleSeekerDescriptionSubmit()}} ref={seekerDescriptionRef} onChangeText={(text) => dispatch(setDescription(text))}
                multiline={true} style={{ fontSize: text.length > 100 ? responsiveWidth(4) : responsiveWidth(6), width: responsiveWidth(93), flex: 1, alignSelf: 'flex-start' }} placeholder='write your hardships..' />
            </ScrollView>
            <View style={{ marginVertical: responsiveHeight(1),marginLeft:responsiveWidth(2), alignItems: 'flex-start' }}>
                {state.isErrorDescription ? (<Text style={{ color: 'red' }}>{state.errorDescription}</Text>) : (<Text></Text>)}
              </View>
          </View>

          {/* userinfo section */}
          <View style={{ marginVertical: responsiveHeight(2) }}>
            <Text style={{ color: 'black', fontSize: responsiveWidth(8), fontWeight: 'bold' }}>Seeker Detail</Text>
            <View style={{ marginTop: responsiveHeight(1) }}>
              <TextInput ref={seekerNameRef} onSubmitEditing={handleSeekerNameSubmit} onBlur={null} value={state.seeker} onChangeText={(text) => dispatch(setSeeker(text))} placeholder='Seeker Name' style={{ fontSize: responsiveHeight(3), padding: responsiveWidth(3), borderRadius: responsiveWidth(4), borderColor: state.isErrorSeeker ? 'red' : '#03bafc', borderWidth: 2 }} />
              <View style={{marginLeft:responsiveWidth(2), marginVertical: responsiveHeight(1), alignItems: 'flex-start' }}>
                {state.isErrorSeeker ? (<Text style={{ color: 'red' }}>{state.errorSeeker}</Text>) : (<Text></Text>)}
              </View>
            </View>
            <View style={{ marginTop: responsiveHeight(0) }}>
              <TextInput ref={seekerPhoneNumberRef} onSubmitEditing={handleSeekerPhoneNumberSubmit} onBlur={null} value={state.phoneNumber} onChangeText={(text) => dispatch(setPhoneNumber(text))} placeholder='Phone Number' style={{ fontSize: responsiveHeight(3), padding: responsiveWidth(3), borderRadius: responsiveWidth(4), borderColor: state.isErrorPhoneNumber ? 'red' : '#03bafc', borderWidth: 2 }} />
              <View style={{marginLeft:responsiveWidth(2), marginVertical: responsiveHeight(1), alignItems: 'flex-start' }}>
                {state.isErrorPhoneNumber ? (<Text style={{ color: 'red' }}>{state.errorPhoneNumber}</Text>) : (<Text></Text>)}
              </View>
            </View>

            <View style={{ marginTop: responsiveHeight(0) }}>
              <TextInput ref={seekerAddressRef} onSubmitEditing={handleSeekerAddressSubmit} onBlur={null} value={state.address} onChangeText={(text) => dispatch(setAddress(text))} placeholder='Address' style={{ fontSize: responsiveHeight(3), padding: responsiveWidth(3), borderRadius: responsiveWidth(4), borderColor: state.isErrorAddress ? 'red' : '#03bafc', borderWidth: 2 }} />
              <View style={{ marginLeft:responsiveWidth(2),marginVertical: responsiveHeight(1), alignItems: 'flex-start' }}>
                {state.isErrorAddress ? (<Text style={{ color: 'red' }}>{state.errorAddress}</Text>) : (<Text></Text>)}
              </View>
            </View>
          </View>


          {/* BankDetail section */}
          <View style={{ marginVertical: responsiveHeight(0) }}>
            <Text style={{ color: 'black', fontSize: responsiveWidth(8), fontWeight: 'bold' }}>Bank Detail</Text>
            <View style={{ marginTop: responsiveHeight(1) }}>
              <TextInput ref={seekerBankTitleRef} onSubmitEditing={handleSeekerBankTitleSubmit} onBlur={null} value={state.accountTitle} onChangeText={(text) => dispatch(setAccountTitle(text))} placeholder='Account Title' style={{ fontSize: responsiveHeight(3), padding: responsiveWidth(3), borderRadius: responsiveWidth(4), borderColor: state.isErrorAccountTitle ? 'red' : '#03bafc', borderWidth: 2 }} />
              <View style={{marginLeft:responsiveWidth(2),marginVertical: responsiveHeight(1), alignItems: 'flex-start' }}>
                {state.isErrorAccountTitle ? (<Text style={{ color: 'red' }}>{state.errorAccountTitle}</Text>) : (<Text></Text>)}
              </View>
            </View>
            <View style={{ marginTop: responsiveHeight(0) }}>
              <TextInput ref={seekerBankNameRef} onSubmitEditing={handleSeekerBankNameSubmit} onBlur={null} value={state.bankName} onChangeText={(text) => dispatch(setBankName(text))} placeholder='Bank Name' style={{ fontSize: responsiveHeight(3), padding: responsiveWidth(3), borderRadius: responsiveWidth(4), borderColor: state.isErrorBankName ? 'red' : '#03bafc', borderWidth: 2 }} />
              <View style={{marginLeft:responsiveWidth(2), marginVertical: responsiveHeight(1), alignItems: 'flex-start' }}>
                {state.isErrorBankName ? (<Text style={{ color: 'red' }}>{state.errorBankName}</Text>) : (<Text></Text>)}
              </View>
            </View>

            <View style={{ marginTop: responsiveHeight(0) }}>
              <TextInput ref={seekerAccountNumberRef} onSubmitEditing={handleSeekerAccountNumberSubmit} onBlur={null} value={state.accountNumber} onChangeText={(text) => dispatch(setAccountNumber(text))} placeholder='Account Number' style={{ fontSize: responsiveHeight(3), padding: responsiveWidth(3), borderRadius: responsiveWidth(4), borderColor: state.isErrorAccountNumber ? 'red' : '#03bafc', borderWidth: 2 }} />
              <View style={{marginLeft:responsiveWidth(2), marginVertical: responsiveHeight(1), alignItems: 'flex-start' }}>
                {state.isErrorAccountNumber ? (<Text style={{ color: 'red' }}>{state.errorAccountNumber}</Text>) : (<Text></Text>)}
              </View>
            </View>
          </View>



          {/* Dontaion detail section */}
          <View style={{ marginVertical: responsiveHeight(0) }}>
            <Text style={{ color: 'black', fontSize: responsiveWidth(8), fontWeight: 'bold' }}>Donation Detail</Text>
            <View style={{ marginTop: responsiveHeight(1) }}>
              <TextInput keyboardType='numeric' ref={seekerAmountNeededRef} onSubmitEditing={handleSeekerAmountNeededSubmit} onBlur={null} value={state.amountNeeded} onChangeText={(text) => dispatch(setAmountNeeded(text))} placeholder='Amount Needed' style={{ fontSize: responsiveHeight(3), padding: responsiveWidth(3), borderRadius: responsiveWidth(4), borderColor: state.isErrorAmountNeeded ? 'red' : '#03bafc', borderWidth: 2 }} />
              <View style={{marginLeft:responsiveWidth(2), marginVertical: responsiveHeight(1), alignItems: 'flex-start' }}>
                {state.isErrorAmountNeeded ? (<Text style={{ color: 'red' }}>{state.errorAmountNeeded}</Text>) : (<Text></Text>)}
              </View>
            </View>


            {/* <DropDownMenu/> */}
            <View ref={seekerDonationTypeRef} on onSubmitEditing={handleSeekerDonationTypeSubmit} style={{ marginBottom: responsiveHeight(0) }}>
              <DropDownMenu open={openDonationType} setOpen={setOpenDonationType} placeHolder='Select Need' items={itemsDonationType} setItems={setItemsDonationType} value={valueDonationType} setValue={setValueDonationType} error={state.errorTypeOfDonation} isError={state.isErrorTypeOfDonation} dispatchError={dispatch} />
              <View style={{marginLeft:responsiveWidth(2), marginVertical: responsiveHeight(1), alignItems: 'flex-start' }}>
                {state.isErrorTypeOfDonation ? (<Text style={{ color: 'red' }}>{state.errorTypeOfDonation}</Text>) : (<Text></Text>)}
              </View>
            </View>

            <View ref={seekerPurposeRef} onSubmitEditing={handleSeekerPurposeSubmit} style={{ marginTop: responsiveHeight(0) }}>
              <DropDownMenu open={openDonationPurpose} setOpen={setOpenDonationPurpose} placeHolder='Select Purpose' items={itemsDonationPurpose} setItems={setItemsDonationPurpose} value={valueDonationPurpose} setValue={setValueDonationPurpose} error={state.errorPurpose} isError={state.isErrorPurpose} dispatchError={dispatch}/>
              <View style={{ marginLeft:responsiveWidth(2),marginVertical: responsiveHeight(1), alignItems: 'flex-start' }}>
                {state.isErrorPurpose ? (<Text style={{ color: 'red' }}>{state.errorPurpose}</Text>) : (<Text></Text>)}
              </View>
            </View>
          </View>

          <TouchableOpacity onPress={createPostFun} disabled={buttonDisabled} >
            <LinearGradient
              onPress={() => { null }}
              colors={['#42a1f5', '#03bafc', '#42c5f5']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                opacity:buttonDisabled?.5:1,
                borderRadius: 100,
                width: responsiveWidth(60),
                alignSelf: 'center',
                alignItems: 'center',
                paddingVertical: responsiveHeight(1),
                //  opacity: buttonDisabled ? .5 : 1.0
              }}>
              <Text style={{ color: 'white', fontSize: 19 }}>Create Post</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    )
  }


  return (
    //         {/* <View style={{ marginTop: responsiveHeight(4) }}>
    //           <TouchableOpacity onPress={loginfunc} disabled={buttonDisabled} >
    //             <LinearGradient
    //               onPress={() => { null }}
    //               colors={['#42a1f5', '#03bafc', '#42c5f5']}
    //               start={{ x: 0, y: 0 }}
    //               end={{ x: 1, y: 0 }}
    //               style={{
    //                 borderRadius: 100,
    //                 width: responsiveWidth(60),
    //                 alignSelf: 'center',
    //                 alignItems: 'center',
    //                 paddingVertical: responsiveHeight(1),
    //                 opacity: buttonDisabled ? .5 : 1.0
    //               }}>
    //               <Text style={{ color: 'white', fontSize: 19 }}>LOGIN</Text>
    //             </LinearGradient>
    //           </TouchableOpacity>



    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
      <Modal transparent={true}
          visible={isUploadingVideo}
        >
      <View backgroundColor={'rgba(50,50,50,.3)'} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator style={{}} size={'medium'} color={'black'} animating={true} />
          </View>
        </Modal>
        <FlatList
          data={[{ key: 'content' }]}
          renderItem={renderContent}
          keyExtractor={(item) => item.key}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ backgroundColor: 'white' }}
        />

      <VideoSelectModal visible={showVideoSelectModal} index={selectedIndex} closeModal={()=>{setShowVideoSelectModal(false)}} dispatch={dispatch}/>
      <BillSelectModal visible={showBillSelectModal} closeModal={()=>{setShowBillSelectModal(false)}} dispatch={dispatch}/>
      

      </KeyboardAvoidingView>
    </SafeAreaView>

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBECF4"
  },
  upperPost: {
    height: 400,
    backgroundColor: "#FFF",
    borderTopStartRadius: responsiveWidth(3),
    borderTopEndRadius: responsiveWidth(3),
    flexDirection: "column"
  },
  mainPost: {
    padding: 10,
    marginVertical: responsiveHeight(1.5),
    elevation: responsiveHeight(1),
    shadowColor: 'black',
    shadowOffset: responsiveHeight(1),
    shadowOpacity: responsiveHeight(1),
    shadowRadius: responsiveWidth(5)
  },
  avatar: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    borderRadius: responsiveWidth(5),
    marginRight: responsiveWidth(5),
    backgroundColor: 'gray'
  },
  name: {
    flex: 1,
    fontSize: responsiveWidth(5),
    fontWeight: "500",
    color: "#454D65"
  },
  description: {
    padding: responsiveWidth(2),
    fontSize: responsiveWidth(4),
    color: "#838899"
  },
  postImage: {
    backgroundColor: 'black',
    flex: 1,
    height: responsiveHeight(30),
    // borderRadius: responsiveWidth(3),
    marginVertical: 10
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 250,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
})

// import React, { useState, useEffect, useRef } from 'react';
// import { Alert, Button, StyleSheet, Text, View } from 'react-native';

// const useTimer = (initialDuration, onExpireCallback) => {
//     const [remainingTime, setRemainingTime] = useState(initialDuration);
//     const [isRunning, setIsRunning] = useState(false);
//     const intervalRef = useRef(null);

//     useEffect(() => {
//         if (isRunning) {
//             intervalRef.current = setInterval(() => {
//                 setRemainingTime((prevTime) => {
//                     if (prevTime <= 1) {
//                         clearInterval(intervalRef.current);
//                         setIsRunning(false);
//                         onExpireCallback();
//                         return 0;
//                     }
//                     return prevTime - 1;
//                 });
//             }, 1000);
//         } else {
//             clearInterval(intervalRef.current);
//         }

//         // Cleanup interval on unmount
//         return () => clearInterval(intervalRef.current);
//     }, [isRunning, onExpireCallback]);

//     const startTimer = () =>{ setIsRunning(true);
//       setRemainingTime(initialDuration)
//     }
//     const stopTimer = () => {
//         setIsRunning(false);
//         clearInterval(intervalRef.current);
//     };
//     const resumeTimer = () => {
//         if (remainingTime > 0) {
//             setIsRunning(true);
//         }
//     };

//     return { remainingTime, startTimer, stopTimer, resumeTimer };
// };

// const CreatePostScreen = () => {
//   const onExpireCallback = () => {
//     Alert.alert('Time’s up!', 'The timer has expired.');
// };

// const { remainingTime, startTimer, stopTimer, resumeTimer } = useTimer(20, onExpireCallback);

// return (
//     <View style={styles.container}>
//         <Text style={styles.timerText}>Time Remaining: {remainingTime}s</Text>
//         <View style={styles.buttonContainer}>
//             <Button title="Start Timer" onPress={startTimer} />
//             <Button title="Stop Timer" onPress={stopTimer} />
//             <Button title="Resume Timer" onPress={resumeTimer} />
//         </View>
//     </View>
// );
// };

// const styles = StyleSheet.create({
// container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
// },
// timerText: {
//     fontSize: 30,
//     marginBottom: 20,
// },
// buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '80%',
// },
// });


export default CreatePostScreen;
