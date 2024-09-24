import { View, Text, Button, TextInput, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useCommentMutation, useGetCommentsQuery } from '../Api/Posts';
import { useRoute } from '@react-navigation/native';
// import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Comment from '../Components/Comment';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export default function CommentScreen() {
  const userState = useSelector((state) => state.userInfo.userInfo)
  // console.log("user state from home",userState)
  // const [accessToken, setAccessToken] = useState('');
  // const [refreshToken, setRefreshToken] = useState('');
  const { slug } = useRoute().params
  const [commentList, setCommentList] = useState([]);
  const dispatch = useDispatch()
  const [comment,setComment]=useState("")


  const [doComment, { dataComment, isLoadingComment, errorComment }]=useCommentMutation()
  const makeComment=async()=>{
    await doComment({slug:slug,comment:comment,token:userState.accessToken}).then(data=>console.log("doComment response",data))
  }

  const { data: listdata } = useGetCommentsQuery({slug:slug, token: userState.accessToken });
  
  useEffect(() => {
    if (listdata) {
      setCommentList(listdata);
    }
  }, [listdata]);
  // const data = [{ name: 'hammad', comment: "may Allah fulfil your needs" }, { name: "abuUbaida", comment: "i will donate you half amount" }, { name: 'sufiyan', comment: 'mehnat kro ye kye paisy mangrahy ho' }, { name: 'mohsin', comment: 'mashaAllah' },{ name: 'hammad', comment: "may Allah fulfil your needs" }, { name: "abuUbaida", comment: "i will donate you half amount" }, { name: 'sufiyan', comment: 'mehnat kro ye kye paisy mangrahy ho' }, { name: 'mohsin', comment: 'mashaAllah' }]
  


  // const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);
  return (
    


    // <View style={styles.container}>
    //   <BottomSheet
    //     ref={bottomSheetRef}
    //     onChange={handleSheetChanges}
    //   >
    //     <BottomSheetView style={styles.contentContainer}>
    //       <Text>Awesome 🎉</Text>
    //     </BottomSheetView>
    //   </BottomSheet>
    // </View>


    
    
    <SafeAreaView style={{flex:1}}>
      {/* {console.log(commentList)} */}
      <ScrollView>
    <View style={{ flex: 1, padding: 5 ,paddingBottom:8}}>
      <View style={{flexDirection:'row',backgroundColor:'white',alignItems:'center',padding:8,borderRadius:10}}>
        <TextInput placeholder='comment' value={comment} onChangeText={(text)=>{setComment(text)}} style={{ flex: 1, backgroundColor: 'white' ,fontSize:20}} />
        <TouchableOpacity onPress={makeComment}>
          <MaterialIcons name='send' size={responsiveWidth(7.5)} color="gray" />
        </TouchableOpacity>
      </View>
      {[...commentList].reverse().map((item) => {
        return (
          <Comment key={item.id} name={item.user} comment={item.body} />
        )
      })}
      {/* <Text>comments{data}</Text> */}
      {/* <Button onPress={makeComment} title='make comment' /> */}
    </View>
    </ScrollView>
    </SafeAreaView>
  
  )
}