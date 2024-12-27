import { useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector } from "react-redux";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { useDownvoteMutation, useUpvoteMutation } from "../Api/Posts";
import Video from "react-native-video";
// import Video from "react-native-video";

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)


const PostCard = (post) => {
  const userState = useSelector((state) => state.userInfo.userInfo)
  // console.log("user state from post card",userState.accessToken)
  // console.log('token prop',post)
  // upvote handling! 
  const screenWidth = Dimensions.get('window')
  // useEffect(()=>{
  //   console.log(screenWidth.width,responsiveWidth(100))
  // })
  // console.log(post.postData.item)
  const [carouselData, setCarouselData] = useState(["https://addazakat.s3.ap-south-1.amazonaws.com/posts/abuubaida01/1.mp4", "https://addazakat.s3.ap-south-1.amazonaws.com/posts/abuubaida01/5.mp4"])
  const [loading, setLoading] = useState(post.isLoading)
  const [upvote, setUpvotes] = useState(post.postData.upvote_count)
  const [downvote, setDownvote] = useState(post.postData.downvote_count)
  const [isUpvoted, setIsUpvoted] = useState(post.postData.is_upvoted);
  const [isDownvoted, setIsDownvoted] = useState(post.postData.is_downvoted);

  const [upvoteMutation] = useUpvoteMutation()
  const [downvoteMutation] = useDownvoteMutation()

  const handleUpvote = (event) => {
    // console.log(event.timestamp).type.target.
    // event.stopPropagation();
    if (!isUpvoted) {
      setUpvotes(upvote + 1)
      setIsUpvoted(true)
      if (isDownvoted) {
        setDownvote(downvote - 1)
        setIsDownvoted(false)
      };
      upvoteMutation({ slug: post.postData.slug, token: userState.accessToken }).then((data) => console.log(data))
    } else {
      setUpvotes(upvote - 1)
      setIsUpvoted(false)
      upvoteMutation({ slug: post.postData.slug, token: userState.accessToken }).then((data) => console.log(data))
    }
  }

  const handleDownvote = (event) => {
    // event.stopPropagation();

    if (!isDownvoted) {
      setDownvote(downvote + 1)
      setIsDownvoted(true)
      if (isUpvoted) {
        setUpvotes(upvote - 1)
        setIsUpvoted(false)
      };
      downvoteMutation({ slug: post.postData.slug, token: userState.accessToken }).then((data) => console.log(data))
    } else {
      setDownvote(downvote - 1)
      setIsDownvoted(false)
      downvoteMutation({ slug: post.postData.slug, token: userState.accessToken }).then((data) => console.log(data))
    }
  }

  // const handleCommentClick = () => {
  //   post.navigation.navigate('CommentsScreen', { slug: post.postData.slug })
  // };

  return (
    <TouchableOpacity onPress={() => { post.navigation.navigate('DetailedPostScreen', { data: post.postData,handleUpvote:handleUpvote,handleDownvote:handleDownvote }) }}>
      <View style={styles.mainPost}>
        <View style={styles.upperPost}>
          {/* postheader */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: responsiveWidth(2) }}>
            {/* avatar+name close */}
            {/* <View style={styles.avatar}></View> */}
            <Text style={styles.name}>{post.postData.creator}</Text>
            <Entypo name="dots-three-vertical" size={24} color="#73788B" />
          </View>
          {/* post description section */}
          <View>
            <Text style={styles.description}>{post.postData.description}</Text>
          </View>
          {/* video section */}
          {/* <View style={styles.postImage}> */}
          {/* <FlatList
          data={carouselData}
          horizontal={true}
          pagingEnabled={true}
          style={{flex:1}}
          renderItem={(item,index)=>{
            // {console.log(item)}
            return(
            <Video
            source={{ uri: item.item }} // Can be a URL or a local file.
            style={{position:'static',top:0,bottom:0,left:0,right:0}}
            key={index}
            paused={true}
            controls={true} // Display default video controls
            resizeMode="contain" // Can be "contain", "cover", "stretch", etc.
            onError={(error) => console.log('Video Error:', error)} // Callback when video cannot be loaded
          />)
          }}
          /> */}
          {/* </View> */}
        </View>
        {/* likes comment section */}
        <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-around', backgroundColor: 'white', marginVertical: responsiveHeight(1) }}>
          <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-around', alignItems: 'center' }}>
            {/* <TouchableOpacity onPress={handleUpvote}> */}
              <View style={styles.commentSectionIconContainer}>
                <MaterialCommunityIcons style={{ padding: responsiveWidth(.5) }} name="arrow-up-bold-outline" size={responsiveWidth(6)} color="gray" />
                <Text style={styles.commentSectionIconSupportingText}>{upvote}</Text>
              </View>
            {/* </TouchableOpacity> */}
            {/* <TouchableOpacity onPress={handleDownvote}> */}
              <View style={styles.commentSectionIconContainer}>
                <MaterialCommunityIcons style={{ padding: responsiveWidth(1) }} name="arrow-down-bold-outline" size={responsiveWidth(6)} color="gray" />
                <Text style={styles.commentSectionIconSupportingText}>{downvote}</Text>
              </View>
            {/* </TouchableOpacity> */}
            {/* <TouchableOpacity onPress={handleCommentClick}>
              <View style={styles.commentSectionIconContainer}>
                <FontAwesome style={{ padding: responsiveWidth(.5) }} name="comments" size={responsiveWidth(6)} color="gray" />
                <Text style={styles.commentSectionIconSupportingText}>{post.postData.item.comment_count}</Text>
              </View>
            </TouchableOpacity> */}

            <View style={styles.commentSectionIconContainer}>
              <Text style={{ fontWeight: 'bold', fontSize: responsiveWidth(3.5), padding: responsiveWidth(1) }}>Donors</Text>
              <Text style={styles.commentSectionIconSupportingText}>{post.postData.donors_count}</Text>
            </View>

            <View style={styles.commentSectionIconContainer}>
              <Text style={{ fontWeight: 'bold', fontSize: responsiveWidth(3.5) }}>Reports</Text>
              <Text style={styles.commentSectionIconSupportingText}>{post.postData.report_count}</Text>
            </View>
          </View>

        </View>
      </View>
    </TouchableOpacity>



    //   <View style={styles.mainPostShimmer}>
    //   <View style={styles.upperPostShimmer}>
    //     {/* postheader */}
    //     <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
    //       {/* avatar+name close */}
    //       <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
    //         <ShimmerPlaceHolder style={styles.avatarShimmer}/>
    //         <ShimmerPlaceHolder style={styles.nameShimmer}/>
    //       </View>
    //       <ShimmerPlaceHolder style={{width:responsiveWidth(2.5),height:responsiveHeight(3)}}/>
    //     </View>
    //     {/* post description section */}
    //     <View>
    //       {/* <Text style={styles.description}>{post.postData.item.description}</Text> */}
    //       <ShimmerPlaceHolder style={styles.descriptionShimmer}/>
    //     </View>
    //     {/* video section */}
    //     <ShimmerPlaceHolder style={styles.postImageShimmer}/>
    //   </View>

    // </View>

  );

}

export default PostCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBECF4"
  },
  upperPost: {
    flex: 1,
    backgroundColor: "#FFF",
    // borderTopStartRadius: responsiveWidth(3),
    // borderTopEndRadius: responsiveWidth(3),
    flexDirection: "column"
  },
  mainPost: {
    flex: 1,
    borderTopColor: '#C0C1C4',
    borderTopWidth: responsiveHeight(.5),
    padding: responsiveWidth(1)
    // marginVertical:responsiveHeight(1.5),
    // elevation:responsiveHeight(1),
    // shadowColor:'black',
    // shadowOffset:responsiveHeight(1),
    // shadowOpacity:responsiveHeight(1),
    // shadowRadius:responsiveWidth(5)
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
    color: "black"
  },
  description: {
    padding: responsiveWidth(2),
    fontSize: responsiveWidth(5),
    color: "black"
  },
  postImage: {
    backgroundColor: 'black',
    flex: 1,
    height: responsiveHeight(30),
    // borderRadius: responsiveWidth(3),
    marginVertical: 10
  },
  containerShimmer: {
    flex: 1,
    backgroundColor: "#EBECF4"
  },
  upperPostShimmer: {
    flex: 1,
    backgroundColor: "#FFF",
    borderTopStartRadius: responsiveWidth(3),
    borderTopEndRadius: responsiveWidth(3),
    padding: responsiveWidth(4),
    paddingBottom: responsiveWidth(2),
    flexDirection: "column"
  },
  mainPostShimmer: {
    marginVertical: responsiveHeight(1.5),
    elevation: 10,
    shadowColor: 'gray',
    shadowOffset: 5,
    shadowOpacity: 20
  },
  avatarShimmer: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    borderRadius: responsiveWidth(5),
    marginRight: responsiveWidth(5),
    backgroundColor: 'gray'
  },
  nameShimmer: {
    fontSize: responsiveWidth(5),
    color: "gray"
  },
  descriptionShimmer: {
    marginTop: responsiveHeight(2.5),
  },
  postImageShimmer: {
    width: undefined,
    height: responsiveHeight(25),
    borderRadius: responsiveWidth(3),
    marginVertical: responsiveHeight(2),
    backgroundColor: 'green'
  },
  postImageShimmer: {
    width: undefined,
    height: responsiveHeight(25),
    borderRadius: responsiveWidth(3),
    marginVertical: responsiveHeight(2),
  },
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
});