import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, ScrollView, StatusBar, ActivityIndicator, Modal } from 'react-native'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableOpacity } from 'react-native'
import { CommonActions } from '@react-navigation/native'
import { useLoginMutation } from '../Api/Auth'
import { setUserData } from '../store/localStore'
import { setUserInfo } from '../Slices/UserSlice'
import LoginModal from '../Components/LoginModal'
import { setEmail, setPassword } from '../Slices/LoginSlice'
import { validateEmail } from '../utils/authValidation/login/LoginValidation'

const Login = ({ navigation }) => {
  const loginState = useSelector((state) => state.login.login);
  const userState=useSelector((state)=>state.userInfo.userInfo)
  const email = loginState.email
  const password = loginState.password
  const dispatch = useDispatch()
  const buttonDisabled = (!email || !password || loginState.isErrorEmail || loginState.isErrorPassword)
  const [isErrorServer, setIsErrorServer] = useState(false)
  const [errorServer, setErrorServer] = useState("")

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const focusNextField = (nextFieldRef) => {
    if (nextFieldRef.current) {
      nextFieldRef.current.focus();
    }
  };

  const handleEmailSubmit = () => {
    focusNextField(passwordRef);
  };


  // api
  const [login, { data, error, isLoading }] = useLoginMutation();
  const loginfunc = async () => {
  //   const login=(()=>{
  //     fetch(`https://api.addazakat.com/post/detail-post/${slug}`,{method:'GET',
  //         headers:{
  //             'Authorization': `Bearer ${token}`
  //           }
  //       }).then((res)=>{
  //           console.log(res.data.json)
  //       }
  //       )
  // })()
  
    
    await login({ email: loginState.email, password: loginState.password }).then(data => {
      console.log('responsedata',data)
      if (data?.error) {
        if (data.error.data) {
          const { errors } = data.error.data
          // console.log(errors.non_field_errors)
          if (errors.non_field_errors[0] === "You are not Register User") {
            // console.log("register before login")
            setIsErrorServer(true)
            setErrorServer("Wrong Email & Password.")
            // setServerResponse(state=>{return{...state,error:"This email is not registered. Register first",isError:true}})
          }
          if (errors.non_field_errors[0] === "User is not verified. Please check your email for verification link/code.") {
            // console.log("verify email plz..")
            setIsErrorServer(true)
            setErrorServer("Verify email before Loging In.")
          }
        }

      } else {
        const { data: { token: { access, refresh }
          } 
      } = data;

      const { data: {
          user: { username, full_name, date_of_birth, religion, gender, email }
          } 
      } = data;
// setting user credential on login to temporary state
      dispatch(setUserInfo({
        userName: username,
        fullName: full_name,
        dateOfBirth: date_of_birth,
        religion: religion,
        gender: gender,
        email: email,
        accessToken: access,
        refreshToken:refresh
    }))
    // setting user credential on login to local storage
    setUserData( JSON.stringify({
      userName: username,
      fullName: full_name,
      dateOfBirth: date_of_birth,
      religion: religion,
      gender: gender,
      email: email,
      accessToken: access,
      refreshToken:refresh
  }))

    
        if (access && refresh) {
          
          console.warn("Login Successfull")
          // console.log('userstatefrom login screen',userState)

          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'HomeGraph' }],
            })
          );
          // dispatch(setLoginToInitialState())
        } else {
          console.log('One or both tokens are missing.');
        }

      }
    }
    ).catch((error) => { console.log(error) });

  }
  return (




    <ScrollView style={{ flex: 1, marginTop: 20 }}>
      <KeyboardAvoidingView>
        <StatusBar
          translucent={true}
          barStyle={'light-content'}
          backgroundColor={'#03bafc'}
        />

<LoginModal navigation={navigation} errorServer={errorServer} isErrorServer={isErrorServer} setErrorServer={setErrorServer} setIsErrorServer={setIsErrorServer} />
        {/* <Modal transparent={true}
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
            <View style={{ justifyContent: 'flex-start', alignItems: 'center', width: responsiveWidth(85), padding: responsiveWidth(2), borderRadius: responsiveWidth(5), elevation: responsiveHeight(1), shadowColor: 'gray', shadowOffset: responsiveHeight(1), shadowOpacity: responsiveHeight(1), shadowRadius: responsiveWidth(5), backgroundColor: 'white' }}>
              <Text style={{ fontSize: responsiveHeight(3), fontWeight: 'bold', marginTop: responsiveHeight(1) }}>Alert</Text>
              <Text style={{ alignSelf: 'flex-start', fontSize: responsiveHeight(2), fontWeight: 'medium', margin: responsiveWidth(2), marginTop: responsiveWidth(4) }}>{errorServer}</Text>
              <View style={{ flexDirection: 'row', alignContent: 'flex-end' }}>
                <TouchableOpacity onPress={() => {
                  setIsErrorServer(false)
                  setErrorServer("")
                }} style={{ backgroundColor: '#03bafc', alignSelf: 'flex-end', padding: responsiveWidth(3), margin: responsiveWidth(2), borderRadius: responsiveWidth(3) }}>
                  <Text styles={{ fontSize: responsiveHeight(1.5), fontWeight: 'bold', color: '#FFFFFF' }}>Dismiss</Text>
                </TouchableOpacity>
                {
                  (errorServer === "Verify email before Loging In.") ?
                    <TouchableOpacity onPress={() => {
                      setIsErrorServer(false)
                      setErrorServer("")
                      navigation.navigate('EmailVerification')
                    }} style={{ backgroundColor: '#03bafc', alignSelf: 'flex-end', padding: responsiveWidth(3), margin: responsiveWidth(2), borderRadius: responsiveWidth(3) }}>
                      <Text styles={{ fontSize: responsiveHeight(1.5), fontWeight: 'bold', color: '#FFFFFF' }}>Verify Now</Text>
                    </TouchableOpacity>
                    : (errorServer === "Wrong Email & Password.") ?
                      <TouchableOpacity onPress={() => {
                        setIsErrorServer(false)
                        setErrorServer("")
                        navigation.navigate('EmailVerification')
                      }} style={{ backgroundColor: '#03bafc', alignSelf: 'flex-end', padding: responsiveWidth(3), margin: responsiveWidth(2), borderRadius: responsiveWidth(3) }}>
                        <Text styles={{ fontSize: responsiveHeight(1.5), fontWeight: 'bold', color: '#FFFFFF' }}>SignIn</Text>
                      </TouchableOpacity>
                      : null

                }
              </View>
            </View>


          </View>
        </Modal> */}

        <Modal transparent={true}
          visible={isLoading}
        >
      <View backgroundColor={'rgba(50,50,50,.3)'} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator style={{}} size={'medium'} color={'black'} animating={true} />
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
            LOGIN
          </Text>
          <View style={{ marginVertical: responsiveHeight(2) }}>

            <View style={{ marginTop: responsiveHeight(1) }}>
              <TextInput ref={emailRef} onSubmitEditing={handleEmailSubmit} onBlur={() => validateEmail(email, dispatch)} value={email} onChangeText={(text) => dispatch(setEmail(text))} placeholder='Email' style={{ fontSize: responsiveHeight(2.5), height: responsiveHeight(5), padding: responsiveHeight(.5), borderBottomColor: loginState.isErrorEmail ? 'red' : '#03bafc', borderBottomWidth: 2 }} />
              <View style={{ marginVertical: responsiveHeight(1), alignItems: 'flex-start' }}>
                {loginState.isErrorEmail ? (<Text style={{ color: 'red' }}>{loginState.errorEmail}</Text>) : (<Text></Text>)}
              </View>
            </View>

            <View style={{ marginTop: responsiveHeight(1) }}>
              <TextInput secureTextEntry={loginState.passwordHidden} ref={passwordRef} value={password} placeholder='password' onChangeText={(text) => dispatch(setPassword(text))} style={{ fontSize: responsiveHeight(2.5), height: responsiveHeight(5), padding: responsiveHeight(.5), borderBottomColor: loginState.isErrorPassword ? 'red' : '#03bafc', borderBottomWidth: 2 }} />
              <View style={{ marginVertical: responsiveHeight(1), alignItems: 'flex-start' }}>
                {loginState.isErrorPassword ? (<Text style={{ color: 'red' }}>{loginState.errorPassword}</Text>) : (<Text></Text>)}
              </View>
            </View>

            <View style={{ marginTop: responsiveHeight(-2) }}>
              <Text onPress={() => navigation.navigate('ForgetPasswordScreen')} style={{ color: '#03bafc', fontSize: responsiveHeight(2), textAlign: 'right' }}>
                Forgot Password?
              </Text>
            </View>
            <View style={{ marginTop: responsiveHeight(4) }}>
              <TouchableOpacity onPress={loginfunc} disabled={buttonDisabled} >
                <LinearGradient
                  onPress={() => { null }}
                  colors={['#42a1f5', '#03bafc', '#42c5f5']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    borderRadius: 100,
                    width: responsiveWidth(60),
                    alignSelf: 'center',
                    alignItems: 'center',
                    paddingVertical: responsiveHeight(1),
                    opacity: buttonDisabled ? .5 : 1.0
                  }}>
                  <Text style={{ color: 'white', fontSize: 19 }}>LOGIN</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: responsiveHeight(3) }}>
              <Text style={{ color: 'black', fontSize: responsiveHeight(2), textAlign: 'center' }}>
                Dont't have an account?{' '}
                <Text style={{ color: '#03bafc' }} onPress={() => navigation.navigate('Signup')}>Signup</Text>
              </Text>
            </View>
            <View style={{ marginTop: responsiveHeight(3) }}>
              <Text style={{ color: 'black', fontSize: responsiveHeight(2), textAlign: 'center' }}>
                Unverified Emal?{' '}
                <Text style={{ color: '#03bafc' }} onPress={() => navigation.navigate('EmailVerification')}>Verify Now</Text>
              </Text>
            </View>
            {/* <Text style={{color:'red'}}>{serverResponse}</Text> */}
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>


  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Set your desired background color
  },
});

export default Login







{/* <Image
source={require("..\\Src\\Assets\\AuthLogo.png")}
resizeMode="cover"
style={{
  marginTop: responsiveWidth(15),
  // top:responsiveWidth(20),
  borderRadius: responsiveHeight(100),
  marginBottom: responsiveWidth(15),
  width: responsiveWidth(40),
  height: responsiveWidth(40),
  alignSelf: 'center',
}}
/> */}

// <View style={{alignContent:'center',marginHorizontal:10}}>
// <TextInput ref={emailRef} onSubmitEditing={handleEmailSubmit} onBlur={()=>validateEmail(email,dispatch)} value={email} onChangeText={(text)=>dispatch(setEmail(text))} placeholder='email' style={{borderColor:loginState.isErrorEmail?'red':'black',borderWidth:2}} />
// <View style={{height:30,padding:5}}>
//   { loginState.isErrorEmail? (<Text style={{color:'red'}}>{loginState.errorEmail}</Text>):(<Text></Text>)}
// </View>
// <TextInput ref={passwordRef} onBlur={()=>validatePassword(password,dispatch)} value={password} placeholder='password'  onChangeText={(text)=>dispatch(setPassword(text))} style={{borderColor:'black',borderWidth:2}} />
// <View style={{height:30,padding:5}}>
//   { loginState.isErrorPassword? (<Text style={{color:'red'}}>{loginState.errorPassword}</Text>):(<Text></Text>)}
// </View>
// <Button disabled={ loginState.isErrorEmail || loginState.isErrorPassword } title="login" onPress={ ()=>  loginfunc() }/>
// </View>




// <LinearGradient
// onPress={() => {}}
// colors={['#42a1f5', '#03bafc', '#42c5f5']}
// start={{x: 0, y: 0}}
// end={{x: 1, y: 0}}
// style={{
//   borderRadius: 100,
//   width: 150,
//   alignSelf: 'center',
//   alignItems: 'center',
//   paddingVertical: 5,
//   marginTop: 100,
//   marginBottom: 10,
// }}>
// <Text style={{color: 'white', fontSize: 19}}>LOGIN</Text>
// </LinearGradient>
// <Text style={{color: '#03bafc', fontSize: 16, textAlign: 'center'}}>
// Dont't have an account?{' '}
// <Text onPress={() => navigation.navigate('Signup')}>Signup</Text>
// </Text>