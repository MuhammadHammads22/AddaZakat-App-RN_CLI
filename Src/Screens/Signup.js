import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Linking, Modal } from 'react-native';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { setConfirmPassword, setDob, setEmail, setErrorEmail, setErrorUserName, setFullName, setGender, setIsErrorEmail, setIsErrorUserName, setPassword, setPhoneNumber, setReligion, setToInitialState, setUserName } from '../Slices/SignupSlice';
import { useSignUpMutation } from '../Api/Auth';
import { SignupValidation } from '../utils/authValidation/signup/ServerResponseValidationSignup';
import useFieldFocus from '../utils/authValidation/signup/SignupFocusManager';
import { validateConfirmPassword, validateDob, validateEmail, validateFullName, validateGender, validatePassword, validatePhoneNumber, validateReligion, validateUserName } from '../utils/authValidation/signup/SignupValidation';
const SignUpForm = ({navigation}) => {
  useEffect(()=>{
    return () => {
      // Component will unmount logic
      // console.log('Component will unmount');
      // You can call your function here
      dispatch(setToInitialState())
    }; 
  },[])
  const signupState=useSelector((state)=>state.signup.signup);
  const email=signupState.email
  const userName=signupState.userName
  const fullName=signupState.fullName
  const phoneNumber=signupState.phoneNumber
  const dob =signupState.dob
  const religion=signupState.religion
  const gender=signupState.gender
  const password=signupState.password
  const confirmPassword=signupState.confirmPassword
  const dispatch=useDispatch()
  const buttonDisabled=(!email|| !userName ||!fullName ||!phoneNumber ||!dob ||!religion ||!gender || !password ||!confirmPassword||signupState.isErrorEmail || signupState.isErrorUserName  || signupState.isErrorFullName || signupState.isErrorDob || signupState.isErrorReligion || signupState.isErrorPhoneNumber || signupState.isErrorGender ||signupState.isErrorPassword ||signupState.isErrorConfirmPassword )
  const [isErrorServer,setIsErrorServer] = useState(false)
  const [errorServer,setErrorServer] = useState("")
  // const openWebPage = () => {
  //   const url = 'https://example.com'; // Replace with your desired URL
  //   Linking.openURL(url)
  //     .then(() => console.log('Opened web page successfully'))
  //     .catch((err) => console.error('Error opening web page: ', err));
  // };


  const [signup,{isSuccess,error,isLoading}]=useSignUpMutation();
  const performSignup=async()=>{
    await signup({email:email,username:userName,full_name:fullName,phone_number:phoneNumber,religion:religion,gender:gender,date_of_birth:dob,password:password,password2:confirmPassword}).then((data)=>{
      console.warn(data)
      if (data.data && data.data.success === "Register Successfully") {
        // Action for successful registration
        setIsErrorServer(true)
        setErrorServer("Registration successful!. Verify your email.")
        
      } else{
        console.log('signup',data.error.data)
         const errors=SignupValidation(data.error.data)
         errors.error.forEach((Item,index)=>{
             switch(Item){
             case "email":
         dispatch(setErrorEmail("Email already exist"))
         dispatch(setIsErrorEmail(true))
               break;
             case "userName":
         dispatch(setErrorUserName("User name already exist"))
         dispatch(setIsErrorUserName(true))
               break;
             case "dob":
               break;
               case "phoneNumber":
               break;
             }
         })
      }
  
       if(error.status===400){

   

       }
       else{
        console.log(data.data)
       }

     
    }
  )  
}


  const { refs, focusNextField } = useFieldFocus();

  const handleEmailSubmit = () => {
    focusNextField('userName');
  };

  const handleUserNameSubmit = () => {
    focusNextField('fullName');
  };

  const handleFullNameSubmit = () => {
    focusNextField('phoneNumber');
  };
  const handlePhoneNumberSubmit = () => {
    focusNextField('dob');
  };

  const handleDobSubmit = () => {
    focusNextField('religion');
  };

  const handleReligionSubmit = () => {
    focusNextField('gender');
  };
  const handleGenderSubmit = () => {
    focusNextField('password');
  };
  const handlePasswordSubmit = () => {
    focusNextField('confirmPassword');
  }





  return (



    <ScrollView style={{ flex: 1 ,marginTop:20}}>
      <KeyboardAvoidingView>
        <StatusBar
          translucent={true}
          barStyle={'light-content'}
          backgroundColor={'#03bafc'}
        />

<Modal  transparent={true}
  visible={isErrorServer }
  onDismiss={()=>{
    setIsErrorServer(false)
    setErrorServer("")
  }}
  onRequestClose={()=>{
    setIsErrorServer(false)
    setErrorServer("")
  }}  
  >
    <View backgroundColor={'rgba(50,50,50,.3)'} style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <View style={{justifyContent:'flex-start',alignItems:'center',width:responsiveWidth(85),padding:responsiveWidth(2),borderRadius:responsiveWidth(5),elevation:responsiveHeight(1),shadowColor:'gray',shadowOffset:responsiveHeight(1),shadowOpacity:responsiveHeight(1),shadowRadius:responsiveWidth(5),backgroundColor:'white'}}>
        <Text style={{fontSize:responsiveHeight(3),fontWeight:'bold',marginTop:responsiveHeight(1)}}>Alert</Text>
        <Text style={{alignSelf:'flex-start',fontSize:responsiveHeight(2),fontWeight:'medium',margin:responsiveWidth(2),marginTop:responsiveWidth(4)}}>{errorServer}</Text>
        <View style={{flexDirection:'row',alignSelf:'flex-end'}}>
        <TouchableOpacity onPress={()=>{setIsErrorServer(false)
    setErrorServer("")}} style={{backgroundColor:'#03bafc',alignSelf:'flex-end',padding:responsiveWidth(3),margin:responsiveWidth(2),borderRadius:responsiveWidth(3)}}>
        <Text styles={{fontSize:responsiveHeight(1.5),fontWeight:'bold',color:'#FFFFFF'}}>Dismiss</Text>
        </TouchableOpacity>
        {(errorServer==="Registration successful!. Verify your email.") ? 
        <TouchableOpacity onPress={()=>{setIsErrorServer(false)
          setErrorServer("")
          navigation.navigate('EmailVerification')
          dispatch(setToInitialState())
          }} 
          style={{backgroundColor:'#03bafc',alignSelf:'flex-end',padding:responsiveWidth(3),margin:responsiveWidth(2),borderRadius:responsiveWidth(3)}}>
        <Text styles={{fontSize:responsiveHeight(1.5),fontWeight:'bold',color:'#FFFFFF'}}>Verify Email</Text>
        </TouchableOpacity>:null
        }
        </View>
        
      </View>
  
     
    </View>
</Modal>

        <Modal  transparent={true}
        visible={isLoading}
        >
          <View backgroundColor={'rgba(50,50,50,.3)'} style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <ActivityIndicator style={{}} size={'medium'} color={'black'} animating={true}/>
          </View>
        </Modal>

        
        <LinearGradient
          colors={['#42a1f5', '#03bafc', '#42c5f5']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            borderBottomLeftRadius: responsiveHeight(3),
            borderBottomRightRadius: responsiveHeight(3),
            height: responsiveHeight(30),
            width: responsiveWidth(100),
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Text style={{ color: 'white', fontSize: responsiveHeight(4), fontWeight: 'bold' }}>
            AdaZakat
          </Text>
        </LinearGradient>
        <View
          style={{
            elevation: 4,
            backgroundColor: 'white',
            borderRadius: responsiveWidth(5),
            margin: responsiveWidth(3),
            marginTop: responsiveHeight(-2),
            paddingVertical: responsiveHeight(2),
            // alignItems:'center',
            paddingHorizontal: responsiveWidth(5),
          }}>
          <Text
            style={{
              fontSize: responsiveHeight(2.5),
              fontWeight: 'bold',
              color: '#03bafc',
              textAlign: 'center'
            }}>
            SIGNUP
          </Text>
          <View style={{ marginVertical: responsiveHeight(2) }}>
            
            <View style={{ marginTop: responsiveHeight(1) }}>
              <TextInput   onChangeText={(text)=>dispatch(setEmail(text))}
                           onBlur={()=>validateEmail(email,dispatch)}
                           ref={refs.email}
                           onSubmitEditing={handleEmailSubmit} 
                           value={email} 
                           placeholder='Email' 
                           style={{ fontSize: responsiveHeight(2.5), height: responsiveHeight(5), padding: responsiveHeight(.5), borderBottomColor: signupState.isErrorEmail ? 'red' : '#03bafc', borderBottomWidth: 2 }} />
              <View style={{ marginVertical: responsiveHeight(1), alignItems: 'flex-start' }}>
                {signupState.isErrorEmail ? (<Text style={{ color: 'red' }}>{signupState.errorEmail}</Text>) : (<Text></Text>)}
              </View>
            </View>

            <View style={{ marginTop: responsiveHeight(1) }}>
              <TextInput   onChangeText={(text)=>dispatch(setUserName(text))}
                           onBlur={()=>validateUserName(userName,dispatch)}
                           ref={refs.userName}
                           onSubmitEditing={handleUserNameSubmit} 
                           value={userName} 
                           placeholder='User Name' 
                           style={{ fontSize: responsiveHeight(2.5), height: responsiveHeight(5), padding: responsiveHeight(.5), borderBottomColor: signupState.isErrorUserName ? 'red' : '#03bafc', borderBottomWidth: 2 }} />
              <View style={{ marginVertical: responsiveHeight(1), alignItems: 'flex-start' }}>
                {signupState.isErrorUserName ? (<Text style={{ color: 'red' }}>{signupState.errorUserName}</Text>) : (<Text></Text>)}
              </View>
            </View>


            <View style={{ marginTop: responsiveHeight(1) }}>
              <TextInput   onChangeText={(text)=>dispatch(setFullName(text))}
                           onBlur={()=>validateFullName(fullName,dispatch)}
                           ref={refs.fullName}
                           onSubmitEditing={handleFullNameSubmit} 
                           value={fullName} 
                           placeholder='Full Name' 
                           style={{ fontSize: responsiveHeight(2.5), height: responsiveHeight(5), padding: responsiveHeight(.5), borderBottomColor: signupState.isErrorFullName ? 'red' : '#03bafc', borderBottomWidth: 2 }} />
              <View style={{ marginVertical: responsiveHeight(1), alignItems: 'flex-start' }}>
                {signupState.isErrorFullName ? (<Text style={{ color: 'red' }}>{signupState.errorFullName}</Text>) : (<Text></Text>)}
              </View>
            </View>


            <View style={{ marginTop: responsiveHeight(1) }}>
              <TextInput   onChangeText={(text)=>dispatch(setPhoneNumber(text))}
                           onBlur={()=>validatePhoneNumber(phoneNumber,dispatch)}
                           ref={refs.phoneNumber}
                           onSubmitEditing={handlePhoneNumberSubmit} 
                           value={phoneNumber} 
                           placeholder='Phone Number' 
                           style={{ fontSize: responsiveHeight(2.5), height: responsiveHeight(5), padding: responsiveHeight(.5), borderBottomColor: signupState.isErrorFullName ? 'red' : '#03bafc', borderBottomWidth: 2 }} />
              <View style={{ marginVertical: responsiveHeight(1), alignItems: 'flex-start' }}>
                {signupState.isErrorPhoneNumber? (<Text style={{ color: 'red' }}>{signupState.errorPhoneNumber}</Text>) : (<Text></Text>)}
              </View>
            </View>


            <View style={{ marginTop: responsiveHeight(1) }}>
              <TextInput   onChangeText={(text)=>dispatch(setDob(text))}
                           onBlur={()=>validateDob(dob,dispatch)}
                           ref={refs.dob}
                           onSubmitEditing={handleDobSubmit} 
                           value={dob}
                           placeholder='Birth Date' 
                           style={{ fontSize: responsiveHeight(2.5), height: responsiveHeight(5), padding: responsiveHeight(.5), borderBottomColor: signupState.isErrorDob ? 'red' : '#03bafc', borderBottomWidth: 2 }} />
              <View style={{ marginVertical: responsiveHeight(1), alignItems: 'flex-start' }}>
                {signupState.isErrorDob ? (<Text style={{ color: 'red' }}>{signupState.errorDob}(2004-12-28)</Text>) : (<Text>(2004-12-28)</Text>)}
              </View>
            </View>


            <View style={{ marginTop: responsiveHeight(1) }}>
              <TextInput   onChangeText={(text)=>dispatch(setReligion(text))}
                           onBlur={()=>validateReligion(religion,dispatch)}
                           ref={refs.religion}
                           onSubmitEditing={handleReligionSubmit} 
                           value={religion} 
                           placeholder='Religion' 
                           style={{ fontSize: responsiveHeight(2.5), height: responsiveHeight(5), padding: responsiveHeight(.5), borderBottomColor: signupState.isErrorReligion ? 'red' : '#03bafc', borderBottomWidth: 2 }} />
              <View style={{ marginVertical: responsiveHeight(1), alignItems: 'flex-start' }}>
                {signupState.isErrorReligion ? (<Text style={{ color: 'red' }}>{signupState.errorReligion}</Text>) : (<Text></Text>)}
              </View>
            </View>



            <View style={{ marginTop: responsiveHeight(1) }}>
              <TextInput   onChangeText={(text)=>dispatch(setGender(text))}
                           onBlur={()=>validateGender(gender,dispatch)}
                           ref={refs.gender}
                           onSubmitEditing={handleGenderSubmit} 
                           value={gender} 
                           placeholder='Gender' 
                           style={{ fontSize: responsiveHeight(2.5), height: responsiveHeight(5), padding: responsiveHeight(.5), borderBottomColor: signupState.isErrorGender ? 'red' : '#03bafc', borderBottomWidth: 2 }} />
              <View style={{ marginVertical: responsiveHeight(1), alignItems: 'flex-start' }}>
                {signupState.isErrorGender ? (<Text style={{ color: 'red' }}>{signupState.errorGender}</Text>) : (<Text></Text>)}
              </View>
            </View>


            <View style={{ marginTop: responsiveHeight(1) }}>
              <TextInput  secureTextEntry={signupState.passwordHidden}
               ref={refs.password}
               onSubmitEditing={handlePasswordSubmit}
                onBlur={() => validatePassword(password, dispatch)}
                value={password} placeholder='password' 
                onChangeText={(text) =>{ dispatch(setPassword(text))
                    if(text.length>3){
                      validatePassword(text,dispatch)
                    }
                    if(confirmPassword.length>1){
                      validateConfirmPassword(confirmPassword,text,dispatch)
                    }
                 }}
               style={{ fontSize: responsiveHeight(2.5), height: responsiveHeight(5), padding: responsiveHeight(.5), borderBottomColor: signupState.isErrorPassword ? 'red' : '#03bafc', borderBottomWidth: 2 }} />
              <View style={{ marginVertical: responsiveHeight(1), alignItems: 'flex-start' }}>
                {signupState.isErrorPassword ? (<Text style={{ color: 'red' }}>{signupState.errorPassword}</Text>) : (<Text></Text>)}
              </View>
            </View>


            <View style={{ marginTop: responsiveHeight(1) }}>
              <TextInput  secureTextEntry={signupState.confirmPasswordHidden}
               ref={refs.confirmPassword}
                onBlur={() => validateConfirmPassword(confirmPassword,password, dispatch)}
                value={confirmPassword} placeholder='Confirm Password' 
                onChangeText={(text) => { dispatch(setConfirmPassword(text))
                  if(text.length>3){validateConfirmPassword(text,password,dispatch)}

                }}
               style={{ fontSize: responsiveHeight(2.5), height: responsiveHeight(5), padding: responsiveHeight(.5), borderBottomColor: signupState.isErrorConfirmPassword ? 'red' : '#03bafc', borderBottomWidth: 2 }} />
              <View style={{ marginVertical: responsiveHeight(1), alignItems: 'flex-start' }}>
                {signupState.isErrorConfirmPassword ? (<Text style={{ color: 'red' }}>{signupState.errorConfirmPassword}</Text>) : (<Text></Text>)}
              </View>
            </View>

          
            <View style={{ marginTop: responsiveHeight(4) }}>
              <TouchableOpacity disabled={buttonDisabled} onPress={performSignup} >
                <LinearGradient
                  colors={['#42a1f5', '#03bafc', '#42c5f5']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    borderRadius: 100,
                    width: responsiveWidth(60),
                    alignSelf: 'center',
                    alignItems: 'center',
                    paddingVertical: responsiveHeight(1),
                    opacity:buttonDisabled?.5:1.0
                  }}>
                  <Text style={{ color: 'white', fontSize: 19 }}>SIGNUP</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: responsiveHeight(3) }}>
              <Text style={{ color: 'black', fontSize: responsiveHeight(2), textAlign: 'center' }}>
                Already have an account?{' '}
                <Text style={{color:'#03bafc'}} onPress={() =>{ navigation.popToTop()
dispatch(setToInitialState())

                }}>Login</Text>
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
});

export default SignUpForm;


// const validateEmail=()=>{
// // Simple email validation regex pattern
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if(!email.trim()){
//       dispatch(setIsErrorEmail(true));
//       dispatch(setErrorEmail("*email required"));
//     }
//     else if(!emailRegex.test(email)){
//       dispatch(setIsErrorEmail(true));
//       dispatch(setErrorEmail("*invalid email"));
//     }
//     else{
//       dispatch(setIsErrorEmail(false));
//       dispatch(setErrorEmail(""));
//     }
//   }

// // Username validation   
// const validateUserName=()=>{
//     if (!userName.trim()) {
//       dispatch(setErrorUserName('Username is required'));
//       dispatch(setIsErrorUserName(true));
//     }
//     else{
//       dispatch(setErrorUserName(''));
//       dispatch(setIsErrorUserName(false));
//   }
// }

// // Full name validation
// const validateFullName=()=>{
//     if (!fullName.trim()) {
//       dispatch(setErrorFullName('Full name is required'))
//       dispatch(setIsErrorFullName(true))
//     }
//     else{
//       dispatch(setErrorFullName(''));
//       dispatch(setIsErrorFullName(false));
// }
// }


// // Date of Birth validation
// const validateDob=()=>{
//     if (!dob) {
//       dispatch(setErrorDob('Date of Birth is required')) ;
//       dispatch(setIsErrorDate(true));
//     }
//     else{
//       dispatch(setErrorDob(''));
//       dispatch(setIsErrorDate(false));
//   }
// }
// // Religion validation
//     const validateReligion=()=>{
//     if (!religion.trim()) {
//       dispatch(setErrorReligion('Religion is required'));
//       dispatch(setIsErrorReligion(true));
//     }
//     else{
//       dispatch(setErrorReligion(''));
//       dispatch(setIsErrorReligion(false));
//     }
//   }
// // Gender validation
//     const validateGender=()=>{
//     if (!gender.trim()) {
//       dispatch(setErrorGender('Gender is required'));
//       dispatch(setIsErrorGender(true));
//     }
//     else if (gender) {
//       switch(gender.trim().toLowerCase()){
//         case 'male':
//           dispatch(setErrorGender(''));
//           dispatch(setIsErrorGender(false));
//           break;
      
//         case 'female':
//           dispatch(setErrorGender(''));
//           dispatch(setIsErrorGender(false));
//           break;
//         case 'other':
//           dispatch(setErrorGender(''));
//           dispatch(setIsErrorGender(false));
//           break;
//         default:
//           dispatch(setErrorGender('invalid gender'));
//           dispatch(setIsErrorGender(true));
//       }
//     }
//     else{
//       dispatch(setErrorGender(''));
//       dispatch(setIsErrorGender(false));
//     }
//   }

// // Password validation
//     const validatePassword=()=>{
//       if(!password){
//         dispatch(setIsErrorPassword(true));
//         dispatch(setErrorPassword("*password required"));
//       }
//       else if(password.length<8){
//         dispatch(setIsErrorPassword(true));
//         dispatch(setErrorPassword("*short password"));
//       }
//       else if(!/[A-Z]/.test(password) && !/[!@#$%^&*(),.?":{}|<>]/.test(password)){
//         dispatch(setIsErrorPassword(true));
//         dispatch(setErrorPassword("*uppercase and special character missing"));
//       } 
//       else if(!/[A-Z]/.test(password)){
//         dispatch(setIsErrorPassword(true));
//         dispatch(setErrorPassword("*uppercase letter missing"));
//       } 
//       else if(!/[!@#$%^&*(),.?":{}|<>]/.test(password)){
//         dispatch(setIsErrorPassword(true));
//         dispatch(setErrorPassword("*special character missing"));
//       }
    
//       else{
//         dispatch(setIsErrorPassword(false));
//         dispatch(setErrorPassword(""));
//       }
      
//   }

// // Confirm Password validation
//     const validateConfirmPassword=()=>{
//     if (!confirmPassword.trim()) {
//       dispatch(setErrorConfirmPassword('Confirm password is required'));
//       dispatch(setIsErrorConfirmPassword(true));
//     } else if (password !== confirmPassword) {
//       dispatch(setErrorConfirmPassword('Passwords do not match'));
//       dispatch(setIsErrorConfirmPassword(true));
//     }else{
//       dispatch(setErrorConfirmPassword(''));
//       dispatch(setIsErrorConfirmPassword(false));
//     }
//   }