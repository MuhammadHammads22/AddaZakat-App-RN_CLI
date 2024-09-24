import { View, Text, FlatList, TouchableOpacity, Animated, useWindowDimensions, KeyboardAvoidingView, ScrollView, TextInput, Button, StyleSheet } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import VideoPager from '../Components/VideoPager'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import { useDownvoteMutation, useGetCommentsQuery, useGetPostDetailQuery, useUpvoteMutation } from '../Api/Posts'
import { useSelector } from 'react-redux'
import DetailPostShimmer from '../Components/DetailPostShimmer'

const DetailedPostScreen = () => {

    const userState = useSelector((state) => state.userInfo.userInfo)
    const params=useRoute().params.data
    const slug = params.slug
    const token = userState.accessToken
    // console.log({slug,token})
    const { data, error, isLoading } = useGetPostDetailQuery({ slug, token })
    // isLoading ? console.log('waiting') : console.log(data)
    
    const {data:dataComment,errorComment,isLoadingComment} = useGetCommentsQuery({slug,token})
    console.log(dataComment)
    const [upvote, setUpvotes] = useState(params.upvote_count)
    const [downvote, setDownvote] = useState(params.downvote_count)
    const [isUpvoted, setIsUpvoted] = useState(params.is_upvoted);
    const [isDownvoted, setIsDownvoted] = useState(params.is_downvoted);
  
    const [upvoteMutation] = useUpvoteMutation()
    const [downvoteMutation] = useDownvoteMutation()
  
    const handleUpvote = (event) => {
      // console.log(event.timestamp).type.target.
      event.stopPropagation();
      if (!isUpvoted) {
        setUpvotes(upvote + 1)
        setIsUpvoted(true)
        if (isDownvoted) {
          setDownvote(downvote - 1)
          setIsDownvoted(false)
        };
        upvoteMutation({ slug, token }).then((data) => console.log(data))
      } else {
        setUpvotes(upvote - 1)
        setIsUpvoted(false)
        upvoteMutation({ slug, token }).then((data) => console.log(data))
      }
    }
  
    const handleDownvote = (event) => {
      event.stopPropagation();
  
      if (!isDownvoted) {
        setDownvote(downvote + 1)
        setIsDownvoted(true)
        if (isUpvoted) {
          setUpvotes(upvote - 1)
          setIsUpvoted(false)
        };
        downvoteMutation({ slug, token })
      } else {
        setDownvote(downvote - 1)
        setIsDownvoted(false)
        downvoteMutation({ slug, token })
      }
    }
   

    const commentData = [{ name: 'demo', comment: 'nice', timeStamp: '2 minutes ago' }, { name: 'faraz', comment: 'hahaha', timeStamp: '20 minutes ago' }]

    const scrollX = useRef(new Animated.Value(0)).current;

    const { width: windowWidth } = useWindowDimensions();
    // const screenWidth=Dimensions.get('window').width


    // const nav = useNavigation()
    // useLayoutEffect(() => {
    //     // nav.setOptions({ headertitle: "Details", headerShow: true })
    // }, [])



    const ref = React.useRef(null)
    const [index, setIndex] = useState(0)
    const videoSection = [{ title: "Seeker Video", url: data?.post_videos.videos.seeker_video }, { title: "Place Video", url: data?.post_videos.videos.place_video }]

    // Animated values for button opacity
    const leftButtonOpacity = scrollX.interpolate({
        inputRange: [0, windowWidth],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    const rightButtonOpacity = scrollX.interpolate({
        inputRange: [windowWidth * (videoSection.length - 2), windowWidth * (videoSection.length - 1)],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    const scrollNext = () => {
        if (index == videoSection.length - 1) { return }
        else {
            setIndex(index + 1)
        }
    }
    const scrollPrevious = () => {
        if (index == 0) { return }
        else {
            setIndex(index - 1)
        }
    }
    // useEffect(() => {
    //     ref.current.scrollToIndex({ index: index, animated: true })
    // }, [index])



    // const [rightButtonOpacity] = useState(new Animated.Value(1));
    // useEffect(() => {
    //     // Trigger animation based on index
    //     Animated.timing(rightButtonOpacity, {
    //         toValue: index < videoSection.length - 1 ? 1 : 0,
    //         duration: 300,
    //         useNativeDriver: true,
    //     }).start();
    // }, [index, rightButtonOpacity]);


    return (
        data ?
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <KeyboardAvoidingView >
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <View style={{ width: responsiveWidth(100), height: responsiveHeight(42) }}>
                            <Animated.View style={{
                                opacity: leftButtonOpacity, width: 30,
                                height: 30,
                                borderRadius: 10,
                                position: 'absolute',
                                zIndex: 3,
                                top: responsiveHeight(20), // Adjusted for simplicity
                                left: responsiveWidth(2),
                                transform: [{ translateY: -15 }],
                            }}>
                                <TouchableOpacity onPress={scrollPrevious} style={{
                                    width: 30, height: 30, borderRadius: 10
                                }}>
                                    <AntDesign name='leftcircle' color='white' size={30} />
                                </TouchableOpacity>
                            </Animated.View>


                            <Animated.View style={{
                                opacity: rightButtonOpacity, width: 30,
                                height: 30,
                                borderRadius: 10,
                                position: 'absolute',
                                zIndex: 3,
                                top: responsiveHeight(20), // Adjusted for simplicity
                                right: responsiveWidth(2),
                                transform: [{ translateY: -15 }],
                            }}>
                                <TouchableOpacity
                                    onPress={scrollNext}
                                    style={{
                                        width: 30, height: 30, borderRadius: 10
                                    }}>
                                    <AntDesign name='rightcircle' color='white' size={30} />
                                </TouchableOpacity>
                            </Animated.View>



                            <FlatList style={{ width: responsiveWidth(100), height: responsiveHeight(40) }}
                                horizontal={true}
                                ref={ref}
                                initialScrollIndex={index}
                                pagingEnabled={true}
                                data={videoSection}
                                showsHorizontalScrollIndicator={false}
                                scrollEventThrottle={1000}
                                onScroll={
                                    Animated.event([
                                        {
                                            nativeEvent: {
                                                contentOffset: {
                                                    x: scrollX,
                                                },
                                            },
                                        },
                                    ],
                                        { useNativeDriver: false }
                                    )
                                }
                                onMomentumScrollEnd={(event) => {
                                    const contentOffsetX = event.nativeEvent.contentOffset.x;
                                    const newIndex = Math.round(contentOffsetX / windowWidth);
                                    setIndex(newIndex);
                                }}
                                renderItem={(item,index) => {
                                    return (
                                        <VideoPager data={item} key={index} paused={index} />
                                    )
                                }
                                }
                            />
                        </View>
                        <View style={{ paddingBottom: responsiveHeight(10) }}>
                            {/* title */}
                            <View style={{ alignItems: 'center', flexDirection: 'row', marginHorizontal: responsiveWidth(1), justifyContent: 'space-between', padding: responsiveWidth(2.5) }}>
                                <Text style={{ fontSize: responsiveWidth(5), fontWeight: "500", color: "#454D65" }}>{data.creator}</Text>
                                <TouchableOpacity onPress={null}>
                                    <Feather name="bookmark" size={responsiveWidth(7.5)} color="gray" />
                                </TouchableOpacity>
                            </View>
                            {/* title and voting row */}
                            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={handleUpvote}>
                                        <View style={styles.commentSectionIconContainer}>
                                            <MaterialCommunityIcons style={{ padding: responsiveWidth(.5) }} name="arrow-up-bold-outline" size={responsiveWidth(6)} color="gray" />
                                            <Text style={styles.commentSectionIconSupportingText}>{upvote}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={handleDownvote}>
                                        <View style={styles.commentSectionIconContainer}>
                                            <MaterialCommunityIcons style={{ padding: responsiveWidth(1) }} name="arrow-down-bold-outline" size={responsiveWidth(6)} color="gray" />
                                            <Text style={styles.commentSectionIconSupportingText}>{downvote}</Text>
                                        </View>
                                    </TouchableOpacity>

                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', margin: responsiveWidth(1), justifyContent: 'space-around' }}>
                                    <TouchableOpacity style={{ justifyContent: 'center', backgroundColor: '#22C55E', borderRadius: responsiveWidth(4), width: responsiveWidth(15), height: responsiveHeight(6) }}>
                                        <Text style={{ textAlign: 'center', color: 'white' }}>Donate</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ justifyContent: 'center', backgroundColor: '#14B8A6', borderRadius: responsiveWidth(4), width: responsiveWidth(15), height: responsiveHeight(6) }}>
                                        <Text style={{ textAlign: 'center', color: 'white' }}>Report</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {/* Seeker Details */}
                            <View style={{ padding: responsiveWidth(2), borderRadius: responsiveWidth(10) }}>
                                <Text style={{ fontSize: responsiveWidth(6), padding: responsiveWidth(1), fontWeight: 'bold' }}>Seeker Details</Text>
                                <View style={{ padding: responsiveWidth(2) }}>
                                    <Text style={{ fontWeight: 'heavy', fontSize: responsiveWidth(5), color: 'black' }}>Seeker :  {data.seeker}</Text>
                                    <Text style={{ fontWeight: 'heavy', fontSize: responsiveWidth(5), color: 'black' }}>Need :  {data.need}</Text>
                                    <Text style={{ fontWeight: 'heavy', fontSize: responsiveWidth(5), color: 'black' }}>From :  {data.address}</Text>
                                    <Text style={{ fontWeight: 'heavy', fontSize: responsiveWidth(5), color: 'black' }}>Verified :  {data.verified}</Text>
                                    <Text style={{ fontWeight: 'heavy', fontSize: responsiveWidth(5), color: 'black' }}>Phone :  {data.phone_number}</Text>
                                    <Text style={{ fontWeight: 'heavy', fontSize: responsiveWidth(5), color: 'black' }}>Created at :  {data.created}</Text>
                                </View>
                            </View>
                            {/* Seeker Bank Detail */}
                            <View style={{ padding: responsiveWidth(2), borderRadius: responsiveWidth(10) }}>
                                <Text style={{ fontSize: responsiveWidth(6), padding: responsiveWidth(1), fontWeight: 'bold' }}>Seeker Bank Details</Text>
                                <View style={{ padding: responsiveWidth(2) }}>
                                    <Text style={{ fontWeight: 'heavy', fontSize: responsiveWidth(5), color: 'black' }}>Account Holder :  {data.bank_detail.account_holder}</Text>
                                    <Text style={{ fontWeight: 'heavy', fontSize: responsiveWidth(5), color: 'black' }}>Bank Name :  {data.bank_detail.bank_name}</Text>
                                    <Text style={{ fontWeight: 'heavy', fontSize: responsiveWidth(5), color: 'black' }}>Account Number :  {data.bank_detail.account_number}</Text>
                                </View>
                            </View>
                            {/* Documents */}
                            <View style={{ padding: responsiveWidth(2) }}>
                                <Text style={{ fontSize: responsiveWidth(6), padding: responsiveWidth(1), fontWeight: 'bold' }}>Documents</Text>
                                <Text style={{ fontWeight: 'heavy', fontSize: responsiveWidth(5), color: 'black', padding: responsiveWidth(1), paddingLeft: responsiveWidth(2) }}>electricity bill</Text>
                            </View>
                            {/* Description */}
                            <View style={{ padding: responsiveWidth(2), borderRadius: responsiveWidth(10) }}>
                                <Text style={{ fontSize: responsiveWidth(6), padding: responsiveWidth(1), fontWeight: 'bold' }}>Description</Text>
                                <View style={{ padding: responsiveWidth(2) }}>
                                    <Text style={{ fontWeight: 'heavy', fontSize: responsiveWidth(5), color: 'black' }}>{data.description}</Text>
                                </View>
                            </View>
                            {/* Comments Section */}
                            <View style={{ padding: responsiveWidth(2), marginBottom: responsiveHeight(1) }}>
                                <Text style={{ fontSize: responsiveWidth(6), padding: responsiveWidth(1), fontWeight: 'bold' }}>Comments</Text>
                                <View style={{ padding: responsiveWidth(1), flexDirection: 'row' }}>
                                    <TextInput placeholder='Add a comment...' style={{ backgroundColor: '#DCEFFF', width: responsiveWidth(75), height: responsiveHeight(6) }}></TextInput>
                                    <TouchableOpacity style={{ marginLeft: responsiveWidth(.5), backgroundColor: '#1684E4', justifyContent: 'center', width: responsiveWidth(20), height: responsiveHeight(6) }}>
                                        <Text style={{ textAlign: 'center' }}>Comment</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ padding: responsiveWidth(1) }}>
                                    {
                                        dataComment.map((item, index) => {
                                            return (
                                                <View style={{ flexDirection: 'row', alignItems: 'center', padding: responsiveWidth(1), marginBottom: responsiveHeight(1) }}>
                                                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                        <Text style={{ fontWeight: 'bold', fontSize: responsiveWidth(5), color: 'black', backgroundColor: 'white', marginBottom: responsiveWidth(1) }}>{item.user}</Text>
                                                        <Text style={{ fontWeight: 'heavy', fontSize: responsiveWidth(5), color: 'black', backgroundColor: 'white', marginBottom: responsiveWidth(1) }}>{item.body}</Text>
                                                    </View>
                                                    {/* <Text>{item.created}</Text> */}
                                                </View>
                                            )
                                        })
                                    }
                                </View>

                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>


            :
            <DetailPostShimmer />


    )
}
const styles=StyleSheet.create({
    commentSectionIconContainer: {
        height: responsiveHeight(6),
        backgroundColor: '#F0F2F5',
        borderRadius: responsiveWidth(4),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: responsiveWidth(2)
      },
      commentSectionIconSupportingText: {
        padding: responsiveWidth(1), fontWeight: 'semi-bold', fontSize: responsiveWidth(4)
      }
})

export default DetailedPostScreen