import { View, Text, FlatList, TouchableOpacity, Animated, useWindowDimensions } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import VideoPager from '../Components/VideoPager'
import AntDesign from 'react-native-vector-icons/AntDesign'

const DetailedPostScreen = () => {


    const scrollX = useRef(new Animated.Value(0)).current;

    const { width: windowWidth } = useWindowDimensions();
    // const screenWidth=Dimensions.get('window').width
 

    // const nav = useNavigation()
    // useLayoutEffect(() => {
    //     // nav.setOptions({ headertitle: "Details", headerShow: true })
    // }, [])

    const { account_number,
        address, admin_message, bank_name, bank_title, blur_face, comment_count,
        created, creator, description, donors_count, downvote_count, iban_number,
        id, is_donated, is_downvoted, is_reported, is_upvoted, need,
        needed_money, paid, phone_number, place, place_vid, post_number, post_type,
        report_count, reported, satisfied, satisfied_vid, seeker, seeker_vid, slug,
        updated, upvote_count, verified, without_house }
        = useRoute().params
    const ref = React.useRef(null)
    const [index, setIndex] = useState(0)
    const videoSection = [{ title: "Seeker Video", url: useRoute().params.seeker_vid }, { title: "Place Video", url: useRoute().params.place_vid }, { title: "Satisfied Video", url: useRoute().params.satisfied_vid }]

    // Animated values for button opacity
    const leftButtonOpacity = scrollX.interpolate({
        inputRange: [0, windowWidth],
        outputRange: [0,1],
        extrapolate: 'clamp',
    });

    const rightButtonOpacity = scrollX.interpolate({
        inputRange: [windowWidth * (videoSection.length - 2), windowWidth * (videoSection.length-1)],
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
    useEffect(() => {
        ref.current.scrollToIndex({ index: index, animated: true })
    }, [index])



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
        <View style={{ width: responsiveWidth(100), height: responsiveHeight(45) ,backgroundColor:'orange'}}>
                <Animated.View style={{opacity:leftButtonOpacity,width: 30,
                    height: 30,
                    borderRadius: 10,
                    position: 'absolute',
                    zIndex: 3,
                    top: responsiveHeight(20), // Adjusted for simplicity
                    left: responsiveWidth(2),
                    transform: [{ translateY: -15 }],}}>
                    <TouchableOpacity onPress={scrollPrevious} style={{
                        width: 30, height: 30, borderRadius: 10
                    }}>
                        <AntDesign name='leftcircle' color='white' size={30} />
                    </TouchableOpacity>
                </Animated.View>
           
            
                <Animated.View style={{opacity:rightButtonOpacity,width: 30,
                    height: 30,
                    borderRadius: 10,
                    position: 'absolute',
                    zIndex: 3,
                    top: responsiveHeight(20), // Adjusted for simplicity
                    right: responsiveWidth(2),
                    transform: [{ translateY: -15 }],}}>
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
                renderItem={(item) => {
                    return (
                        <VideoPager data={item} key={index} paused={index} />
                    )
                }
                }
            />

        </View>
    )
}

export default DetailedPostScreen